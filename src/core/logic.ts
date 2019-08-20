import 'reflect-metadata';
import { throwTypeErrorFor } from './errors';
import {
  DecoratorFactory,
  ErrorFunction,
  ExpectedType,
  OrdinaryDecoratorFactoryArgs,
  OrdinaryDecoratorFactoryThisContext,
  PrimitiveType,
  ValidationFunction,
  ValidationType
} from './types';
import { isMethodDecorator, isParameterDecoratorArgs, isPropertyDecorator, isValidExpectedType } from './type-guards';
import { removeTrailingUndefined } from './utils';

export function decoratorFactory(validationType: ValidationType, expectedType?: ExpectedType, errorFn?: ErrorFunction, isValidFn?: ValidationFunction): DecoratorFactory {
  if (isValidExpectedType(validationType, expectedType)) {
    return _ordinaryDecoratorFactory.bind({
      validationType,
      expectedType,
      errorFn: errorFn ? errorFn : throwTypeErrorFor,
      isValidFn: isValidFn ? isValidFn : getOrdinaryIsValidFn(expectedType)
    });
  } else {
    throw new Error('Not a valid decorator');
  }
}

function _ordinaryDecoratorFactory<T>(this: OrdinaryDecoratorFactoryThisContext, ...args: OrdinaryDecoratorFactoryArgs<T>): DecoratorFactory {
  removeTrailingUndefined(args); // TODO why are there trailing undefineds itfp
  if (isParameterDecoratorArgs(args)) {
    // @ts-ignore
    return _installValidatorForParameter.apply(this, args);
  } else if (isMethodDecorator<Function>(args)) {
    // @ts-ignore
    return installValidatorForMethod(...args);
  } else if (isPropertyDecorator(args)) {
    // @ts-ignore
    return installValidatorForProperty.apply(this, args);
  } else {
    throw new Error('Not a valid decorator');
  }
}

const validateMetadataKey = Symbol();

function _installValidatorForParameter(this: OrdinaryDecoratorFactoryThisContext, target: Object, propertyKey: string | symbol, parameterIndex: number): void {
  let validatedParameters: (OrdinaryDecoratorFactoryThisContext & { parameterIndex: number })[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyKey) || [];
  validatedParameters.push(Object.assign({}, {parameterIndex}, this));
  Reflect.defineMetadata(validateMetadataKey, validatedParameters, target, propertyKey);
}

export function installValidatorForMethod<T>(target: Object, propertyName: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
  if (typeof descriptor.value === PrimitiveType.Function) {
    let method = descriptor.value;
    // @ts-ignore
    descriptor.value = function () {
      let isValid = true;
      let validatedParameters: (OrdinaryDecoratorFactoryThisContext & { parameterIndex: number })[] = Reflect.getOwnMetadata(validateMetadataKey, target, propertyName);
      if (validatedParameters) {
        for (let validatedParameter of validatedParameters) {
          const {expectedType, errorFn, isValidFn, parameterIndex} = validatedParameter;
          // TODO #1 export this to function
          if (arguments[parameterIndex] != null && !isValidFn(arguments[parameterIndex], expectedType)) {
            _callErrorFn(target, propertyName.toString(), expectedType, arguments[parameterIndex], errorFn);
            isValid = false;
          }
        }
      }

      if (isValid && method) {
        // @ts-ignore
        return method.apply(this, arguments);
      } else {
        return null;
      }
    };
  } else {
    throw new Error('Not a valid decorator');
  }
}

export function installValidatorForProperty(this: OrdinaryDecoratorFactoryThisContext, target: Object, propertyKey: string): void {
  const sym = Symbol();
  Object.defineProperty(target, propertyKey, {
    get: () => {
      // @ts-ignore
      return target[sym];
    },
    set: (value: any) =>  {
      // TODO #1 export this to function
      if (value == null || this.isValidFn(value, this.expectedType)) {
        // @ts-ignore
        target[sym] = value;
      } else {
        // @ts-ignore
        _callErrorFn(target, propertyKey, this.expectedType, value, this.errorFn);
      }
    }
  });
}

// TODO: may be unwrapped by using .bind(), problem is here wo do not know `value` yet
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

function _callErrorFn(target: any, key: string, expectedType: ExpectedType, value: any, errorCb?: ErrorFunction) {
  if (errorCb) {
    errorCb(value);
  } else {
    throwTypeErrorFor();
  }
}