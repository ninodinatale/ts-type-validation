import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HigherOrderType } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsObject(objectType: ExpectedType): any;
export function IsObject(objectType: ExpectedType, errorFunction: ErrorFunction): any;

export function IsObject(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Object, ...args);
}
