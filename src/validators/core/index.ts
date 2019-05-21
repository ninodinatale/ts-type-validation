import { throwTypeErrorFor } from './errors';
import {
  DecoratorFunction,
  ErrorFunction,
  ValidatedType,
  DecoratorTarget,
  OrdinaryDecoratorFactoryArgs,
  OrdinaryDecoratorFactoryThisContext,
  DecoratorFactoryArgs, DecoratorFactoryThisContext
} from './types';
import { isDecoratorFactoryArgs, isExtendedDecoratorFactoryArgs, isParameterDecorator, isPropertyDecorator } from './type-guards';
import { removeTrailingUndefined } from './utils';

export function decoratorFactory(this: DecoratorFactoryThisContext, ...args: DecoratorFactoryArgs): DecoratorFunction {
  if (!this.isValidFn) {
    this.isValidFn = getOrdinaryIsValidFn(this.expectedType);
  }
  removeTrailingUndefined(args); // TODO why are there trailing undefineds itfp
  if (isExtendedDecoratorFactoryArgs(args)) {
    return _ordinaryDecoratorFactory.bind(Object.assign(this, {errorFn: args.length ? args[0] : throwTypeErrorFor}));
  } else if (isDecoratorFactoryArgs(args)) {
    _ordinaryDecoratorFactory.call(Object.assign(this, {
      errorFn: throwTypeErrorFor,
      isValidFn: getOrdinaryIsValidFn(this.expectedType)
    }), ...args);
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
      if (value == null || this.isValidFn(value)) {
        target[sym] = value;
      } else {
        _callErrorFn(target, key, this.expectedType, value, this.errorFn);
      }
    }
  });
}

// TODO: may be unwrapped by using .bind(), problem is here wo do not know `value` yet
export function getOrdinaryIsValidFn(expectedType: ValidatedType) {
  return (value: any) => ordinaryIsValidFn(value, expectedType);
}

export function ordinaryIsValidFn(value: any, expectedType: ValidatedType): boolean {
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

function _callErrorFn(target: any, key: string, expectedType: ValidatedType, value: any, errorCb?: ErrorFunction) {
  if (errorCb) {
    errorCb(value);
  } else {
    throwTypeErrorFor();
  }
}