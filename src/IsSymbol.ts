import { DecoratorFactory, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsSymbol(): any;
export function IsSymbol(errorFunction: ErrorFunction): any;

export function IsSymbol(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(PrimitiveType.Symbol, PrimitiveType.Symbol, ...args);
}
