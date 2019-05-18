import { DecoratorFunction, ErrorFunction } from './core/types';
import { defineProperty, ordinaryIsValidFnCaller } from './core';

export function IsObject(objectType: Object, errorFn?: ErrorFunction): DecoratorFunction {
  return (target: any, key: string) => {
    defineProperty.bind({expectedType: objectType, errorFn: errorFn, isValidFn: ordinaryIsValidFnCaller.call(null, objectType)})(target, key);
  };
}
