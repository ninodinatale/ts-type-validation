import { throwTypeErrorFor } from './errors';
import {
  DecoratorWrapper,
  ErrorFunction,
  ValidatedType,
  ValidationFunction,
  ComposedType
} from './types';

function decorate(expectedType: ValidatedType, targetOrErrorFn: ErrorFunction | any, key?: string): DecoratorWrapper {
  const isValidFn = ordinaryIsValidFnCaller.call(null, expectedType);
  if (typeof targetOrErrorFn === 'function' && key == null) {
    return defineProperty.bind({expectedType, errorFn: targetOrErrorFn, isValidFn});
  } else if (key) {
    defineProperty.bind({
      expectedType,
      errorFn: throwTypeErrorFor.bind(null, targetOrErrorFn, key, typeof expectedType),
      isValidFn
    })(targetOrErrorFn, key);
  }
}

function defineProperty(this: { expectedType: ValidatedType | ComposedType, errorFn?: ErrorFunction, isValidFn: ValidationFunction }, target: any, key: string): void {
  const sym = Symbol();
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

function ordinaryIsValidFnCaller(expectedType: ValidatedType) {
  return (value: any) => ordinaryIsValidFn.call(null, value, expectedType);
}

function ordinaryIsValidFn(value: any, expectedType: ValidatedType): boolean {
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

function _callErrorFn(target: any, key: string, expectedType: ValidatedType | ComposedType, value: any, errorCb?: ErrorFunction) {
  if (errorCb) {
    errorCb(value);
  } else {
    throwTypeErrorFor(target, key, expectedType, value);
  }
}

export { decorate, defineProperty, ordinaryIsValidFnCaller, ordinaryIsValidFn };