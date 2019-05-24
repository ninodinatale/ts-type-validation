import { DecoratorFunction, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core';

export function IsNumber(): any;
export function IsNumber(errorFunction: ErrorFunction): any;

export function IsNumber(...args: OrdinaryValidatorArgs): DecoratorFunction {
  return decoratorFactory(PrimitiveType.Number, PrimitiveType.Number, ...args);
}
