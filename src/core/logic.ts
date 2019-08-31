import 'reflect-metadata';
import { throwTypeErrorFor } from './errors';
import {
  DecoratorFactory,
  DecoratorFactoryArgs,
  ErrorFunction,
  ExpectedType,
  MetadataValidationFunction,
  OrdinaryDecoratorFactoryThisContext,
  OrdinaryValidatedParameter,
  OrdinaryValidationFunction,
  Target,
  ValidateByMetadataDecoratorFactory,
  ValidatedByMetadataParameter,
  ValidationType, ValidatorOptions
} from './types';
import {
  isMethodDecorator,
  isOrdinaryValidatedParameter,
  isParameterDecoratorArgs,
  isPropertyDecorator,
  isValidatedByMetadataParameter,
  isValidExpectedType
} from './type-guards';
import { removeTrailingUndefined } from './utils';

export function decoratorFactory(validationType?: ValidationType, expectedType?: ExpectedType, options?: ValidatorOptions, isValidFn?: OrdinaryValidationFunction): DecoratorFactory {
  if (validationType != null) {
    if (isValidExpectedType(validationType, expectedType)) {
      return _ordinaryDecoratorFactory.bind({
        validationType,
        expectedType,
        errorFn: options != null ? options.errorCb : undefined,
        isValidFn: isValidFn ? isValidFn : getOrdinaryIsValidFn(expectedType)
      });
    } else {
      throw new Error('Not a valid decorator');
    }
  } else {
    return _validateByMetadataDecoratorFactory.bind({
      errorFn: options != null ? options.errorCb : undefined,
    });
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
    installValidatorForMethod(target, propertyKey, argumentIndex);
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
  } else if (isMethodDecorator<Function>(args)) {
    const [target, propertyKey, argumentIndex] = args;
    installValidatorForMethod(target, propertyKey, argumentIndex);
  } else if (isPropertyDecorator(args)) {
    const [target, propertyKey] = args;
    _installValidatorByMetadataForProperty.call(this, target, propertyKey);
  } else {
    throw new Error('Not a valid decorator');
  }
}

const ordinaryValidateMetadataKey = Symbol();

function _installOrdinaryValidatorForParameter(this: OrdinaryDecoratorFactoryThisContext, target: Target, propertyKey: string | symbol, parameterIndex: number): void {
  let validatedParameters: OrdinaryValidatedParameter[] = Reflect.getOwnMetadata(ordinaryValidateMetadataKey, target, propertyKey) || [];
  validatedParameters.push(Object.assign({}, {parameterIndex}, this));
  Reflect.defineMetadata(ordinaryValidateMetadataKey, validatedParameters, target, propertyKey);
}

const validateByMetadataMetadataKey = Symbol();

function _installValidatorByMetadataForParameter(this: ValidateByMetadataDecoratorFactory, target: Target, propertyKey: string | symbol, parameterIndex: number): void {
  let validatedParameters: ValidatedByMetadataParameter[] = Reflect.getOwnMetadata(validateByMetadataMetadataKey, target, propertyKey) || [];
  validatedParameters.push(Object.assign({}, {
    parameterIndex,
    expectedTypes: Reflect.getMetadata('design:paramtypes', target, propertyKey)
  }, this));
  Reflect.defineMetadata(validateByMetadataMetadataKey, validatedParameters, target, propertyKey);
}

export function installValidatorForMethod<T extends Function>(target: Target, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
  if (typeof descriptor.value === 'function') {
    let method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let isValid = true;
      let validatedParameters: (OrdinaryValidatedParameter | ValidatedByMetadataParameter)[] = Reflect.getOwnMetadata(ordinaryValidateMetadataKey, target, propertyKey) || Reflect.getOwnMetadata(validateByMetadataMetadataKey, target, propertyKey);
      if (validatedParameters) {

        for (let validatedParameter of validatedParameters) {

          let validationType: ValidationType, expectedType: ExpectedType | Function, errorFn: ErrorFunction,
              isValidFn: MetadataValidationFunction | OrdinaryValidationFunction, parameterIndex: number;
          if (isOrdinaryValidatedParameter(validatedParameter)) {
            validationType = validatedParameter.validationType;
            expectedType = validatedParameter.expectedType;
            errorFn = validatedParameter.errorFn;
            isValidFn = validatedParameter.isValidFn;
            parameterIndex = validatedParameter.parameterIndex;

          } else if (isValidatedByMetadataParameter(validatedParameter)) {
            validationType = null as any;
            errorFn = validatedParameter.errorFn;
            isValidFn = _isValidByMetadata;
            parameterIndex = validatedParameter.parameterIndex;
            expectedType = validatedParameter.expectedTypes[parameterIndex];

          } else {
            throw new Error('Getting parameter metadata failed.');
          }

          if (!isValidFn(args[parameterIndex],
              // @ts-ignore with the above if-blocks we made sure that expectedType is the correct type to the corresponding isValidFn
              expectedType)
          ) {
            _callErrorFn({target, propertyKey, validationType, expectedType, value: args[parameterIndex]}, errorFn);
            isValid = false;
          }
        }
      }

      if (isValid && method) {
        return method.apply(this, args);
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
      if (this.isValidFn(value, this.expectedType)) {
        target[sym] = value;
      } else {
        _callErrorFn({target, propertyKey, validationType: this.validationType, expectedType: this.expectedType, value}, this.errorFn);
      }
    }
  });
}

function _installValidatorByMetadataForProperty(this: ValidateByMetadataDecoratorFactory, target: Target, propertyKey: string | symbol): void {
  const type: Function = Reflect.getMetadata('design:type', target, propertyKey);
  const sym = Symbol(typeof propertyKey === 'string' ? propertyKey : propertyKey.toString()) as any;
  Object.defineProperty(target, propertyKey, {
    get: () => {
      return target[sym];
    },
    set: (value: any) => {
      if (_isValidByMetadata(value, type)) {
        target[sym] = value;
      } else {
        _callErrorFn({target, propertyKey, expectedType: type.name.toLowerCase(), value}, this.errorFn);
      }
    }
  });

}

function _isValidByMetadata(value: any, expectedType: Function): boolean {
  return value == null || value instanceof expectedType || typeof value === expectedType.name.toLowerCase();
}

export function getOrdinaryIsValidFn(expectedType: ExpectedType) {
  return (value: any) => ordinaryIsValidFn(value, expectedType);
}

export function ordinaryIsValidFn(value: any, expectedType: ExpectedType): boolean {
  if (value == null) {
    return true;
  }
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

function _callErrorFn<T>(validationInfo: { target: Target, propertyKey: string | symbol, parameterIndex?: number, validationType?: ValidationType, expectedType: ExpectedType, value: any }, errorCb?: ErrorFunction) {
  if (errorCb) {
    errorCb(validationInfo.value);
  } else {
    const {validationType, expectedType, value, target, propertyKey, parameterIndex} = validationInfo;
    throwTypeErrorFor(validationType, expectedType, value, target, propertyKey, parameterIndex);
  }
}