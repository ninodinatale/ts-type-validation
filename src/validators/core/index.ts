import { throwTypeErrorFor } from './errors';
import {
  DecoratorFunction,
  ErrorFunction,
  ExpectedType,
  DecoratorTarget,
  OrdinaryDecoratorFactoryArgs,
  OrdinaryDecoratorFactoryThisContext,
  ValidationFunction, ValidationType
} from './types';
import { isParameterDecorator, isPropertyDecorator, isValidExpectedType } from './type-guards';
import { removeTrailingUndefined } from './utils';

export function decoratorFactory(validationType: ValidationType, expectedType?: ExpectedType, errorFn?: ErrorFunction, isValidFn?: ValidationFunction): DecoratorFunction {
  if (isValidExpectedType(validationType, expectedType)) {
    return _ordinaryDecoratorFactory.bind({
      expectedType,
      errorFn: errorFn ? errorFn : throwTypeErrorFor,
      isValidFn: isValidFn ? isValidFn : getOrdinaryIsValidFn(expectedType)
    });
  } else {
    throw new Error('Not a valid decorator');
  }
}

function _ordinaryDecoratorFactory(this: OrdinaryDecoratorFactoryThisContext, ...args: OrdinaryDecoratorFactoryArgs) {
  removeTrailingUndefined(args); // TODO why are there trailing undefineds itfp
  if (isParameterDecorator(args)) {
    return _installValidatorForParameter.apply(this, args);
  } else if (isPropertyDecorator(args)) {
    return installValidatorForProperty.apply(this, args);
  } else {
    throw new Error('Not a valid decorator');
  }
}

function _installValidatorForParameter(this: OrdinaryDecoratorFactoryThisContext, target: DecoratorTarget, key: string, parameterIndex: number): void {
  // TODO
}

export function installValidatorForProperty(this: OrdinaryDecoratorFactoryThisContext, target: DecoratorTarget, key: string): void {
  const sym: any = Symbol();
  target[sym] = null;
  Object.defineProperty(target, key, {
    get: () => target[sym],
    set: (value: any) => {
      if (value == null || this.isValidFn(value, this.expectedType)) {
        target[sym] = value;
      } else {
        _callErrorFn(target, key, this.expectedType, value, this.errorFn);
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