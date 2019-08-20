import { DecoratorFactory, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsFunction(): any;
export function IsFunction(errorFunction: ErrorFunction): any;

export function IsFunction(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(PrimitiveType.Function, PrimitiveType.Function, ...args);
}