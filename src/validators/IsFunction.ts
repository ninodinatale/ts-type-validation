import { DecoratorFunction, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core';

export function IsFunction(): any;
export function IsFunction(errorFunction: ErrorFunction): any;

export function IsFunction(...args: OrdinaryValidatorArgs): DecoratorFunction {
  return decoratorFactory(PrimitiveType.Function, PrimitiveType.Function, ...args);
}
