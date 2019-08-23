import 'reflect-metadata';
import { throwTypeErrorFor } from './errors';
import {
  DecoratorFactory,
  DecoratorFactoryArgs,
  ErrorFunction,
  ExpectedType,
  OrdinaryDecoratorFactoryThisContext,
  Target, ValidateByMetadataDecoratorFactory,
  ValidationFunction,
  ValidationType
} from './types';
import { isMethodDecorator, isParameterDecoratorArgs, isPropertyDecorator, isValidExpectedType } from './type-guards';
import { removeTrailingUndefined } from './utils';

export function decoratorFactory(validationType?: ValidationType, expectedType?: ExpectedType, errorFn?: ErrorFunction, isValidFn?: ValidationFunction): DecoratorFactory {
  if (validationType != null) {
    if (isValidExpectedType(validationType, expectedType)) {
      return _ordinaryDecoratorFactory.bind({
        validationType,
        expectedType,
        errorFn,
        isValidFn: isValidFn ? isValidFn : getOrdinaryIsValidFn(expectedType)
      });
    } else {
      throw new Error('Not a valid decorator');
    }
  } else {
    return _validateByMetadataDecoratorFactory.bind({
      errorFn
    })
  }
}

function _ordinaryDecoratorFactory<T>(this: OrdinaryDecoratorFactoryThisContext, ...args: DecoratorFactoryArgs<T>): void {
  // TODO why are there trailing undefineds
  removeTrailingUndefined(args);
  if (isParameterDecoratorArgs(args)) {
    const [target, propertyKey, argumentIndex] = args;
    _installOrdinaryValidatorForParameter.call(this, target, propertyKey, argumentIndex);
  } else if (isMethodDecorator<Function>(args)) {
    const [target, propertyKey, argumentIndex] = args;
    installOrdinaryValidatorForMethod(target, propertyKey, argumentIndex);
  } else if (isPropertyDecorator(args)) {
    const [target, propertyKey] = args;
    installOrdinaryValidatorForProperty.call(this, target, propertyKey);
  } else {
    throw new Error('Not a valid decorator');
  }
}

function _validateByMetadataDecoratorFactory<T>(this: ValidateByMetadataDecoratorFactory, ...args: DecoratorFactoryArgs<T>): void {
  // TODO why are there trailing undefineds
  removeTrailingUndefined(args);
  if (isParameterDecoratorArgs(args)) {
    const [target, propertyKey, argumentIndex] = args;
    _installValidatorByMetadataForParameter.call(this, target, propertyKey, argumentIndex);
  } else if (isPropertyDecorator(args)) {
    const [target, propertyKey] = args;
    _installValidatorByMetadataForProperty.call(this, target, propertyKey);
  } else {
    throw new Error('Not a valid decorator');
  }
}

const validateMetadataKey = Symbol();

function _installOrdinaryValidatorForParameter(this: OrdinaryDecoratorFactoryThisContext, target: Target, propertyKey: string | symbol, parameterIndex: number): void {
  let validatedParameters: (OrdinaryDecoratorFactoryThisContext & { parameterIndex: number })[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey) || [];
  validatedParameters.push(Object.assign({}, {parameterIndex}, this));
  Reflect.defineMetadata(validateMetadataKey, validatedParameters, target, propertyKey);
}

function _installValidatorByMetadataForParameter(this: ValidateByMetadataDecoratorFactory, target: Target, propertyKey: string | symbol, parameterIndex: number): void {
  // TODO
  // let validatedParameters: (OrdinaryDecoratorFactoryThisContext & { parameterIndex: number })[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey) || [];
  // validatedParameters.push(Object.assign({}, {parameterIndex}, this));
  // Reflect.defineMetadata(validateMetadataKey, validatedParameters, target, propertyKey);
}

export function installOrdinaryValidatorForMethod<T extends Function>(target: Target, propertyName: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
  if (typeof descriptor.value === 'function') {
    let method = descriptor.value;
    descriptor.value = function () {
      let isValid = true;
      let validatedParameters: (OrdinaryDecoratorFactoryThisContext & { parameterIndex: number })[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyName);
      if (validatedParameters) {
        for (let validatedParameter of validatedParameters) {
          const {validationType, expectedType, errorFn, isValidFn, parameterIndex} = validatedParameter;
          if (arguments[parameterIndex] != null && !isValidFn(arguments[parameterIndex], expectedType)) {
            _callErrorFn(target, typeof propertyName === 'symbol' ? propertyName.toString() : propertyName, validationType, expectedType, arguments[parameterIndex], errorFn);
            isValid = false;
          }
        }
      }

      if (isValid && method) {
        return method.apply(this, arguments);
      } else {
        return null;
      }
    };
  } else {
    throw new Error('Not a valid decorator');
  }
}

export function installOrdinaryValidatorForProperty(this: OrdinaryDecoratorFactoryThisContext, target: Target, propertyKey: string | symbol): void {
  const sym = Symbol(typeof propertyKey === 'string' ? propertyKey : propertyKey.toString()) as any;
  Object.defineProperty(target, propertyKey, {
    get: () => {
      return target[sym];
    },
    set: (value: any) => {
      if (value == null || this.isValidFn(value, this.expectedType)) {
        target[sym] = value;
      } else {
        _callErrorFn(target, propertyKey, this.validationType, this.expectedType, value, this.errorFn);
      }
    }
  });
}

function _installValidatorByMetadataForProperty(this: ValidateByMetadataDecoratorFactory, target: Target, propertyKey: string | symbol): void {
  const type: Function = Reflect.getMetadata("design:type", target, propertyKey);
  const sym = Symbol(typeof propertyKey === 'string' ? propertyKey : propertyKey.toString()) as any;
  Object.defineProperty(target, propertyKey, {
    get: () => {
      return target[sym];
    },
    set: (value: any) => {
      if (value == null || _isValidByMetadata(value, type)) {
        target[sym] = value;
      } else {
        _callErrorFn(target, propertyKey, null, type.name.toLowerCase(), value, this.errorFn);
      }
    }
  });

}

function _isValidByMetadata(value: any, expectedType: Function): boolean {
  return value instanceof expectedType || typeof value === expectedType.name.toLowerCase();
}

export function getOrdinaryIsValidFn(expectedType: ExpectedType) {
  return (value: any) => ordinaryIsValidFn(value, expectedType);
}

export function ordinaryIsValidFn(value: any, expectedType: ExpectedType): boolean {
  if (typeof value !== expectedType) {
    if (typeof value === 'object' && typeof expectedType === 'function') {
      if (!(value instanceof expectedType)) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

function _callErrorFn<T>(target: Target, propertyKey: string | symbol, validationType: ValidationType | null, expectedType: ExpectedType, value: any, errorCb?: ErrorFunction) {
  if (errorCb) {
    errorCb(value);
  } else {
    throwTypeErrorFor(target, propertyKey, validationType, expectedType, value);
  }
}