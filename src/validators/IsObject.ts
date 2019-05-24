import { AdvancedValidatorArgs, DecoratorFunction, ErrorFunction, ExpectedType, HighOrderType } from './core/types';
import { decoratorFactory } from './core';

export function IsObject(objectType: ExpectedType): any;
export function IsObject(objectType: ExpectedType, errorFunction: ErrorFunction): any;

export function IsObject(...args: AdvancedValidatorArgs): DecoratorFunction {
  return decoratorFactory(HighOrderType.Object, ...args);
}
