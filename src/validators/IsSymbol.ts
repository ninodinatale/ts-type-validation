import { DecoratorFunction, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core';

export function IsSymbol(): any;
export function IsSymbol(errorFunction: ErrorFunction): any;

export function IsSymbol(...args: OrdinaryValidatorArgs): DecoratorFunction {
  return decoratorFactory(PrimitiveType.Symbol, PrimitiveType.Symbol, ...args);
}
