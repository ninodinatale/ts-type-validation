import { DecoratorFunction, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core';

export function IsString(): any;
export function IsString(errorFunction: ErrorFunction): any;

export function IsString(...args: OrdinaryValidatorArgs): DecoratorFunction {
  return decoratorFactory(PrimitiveType.String, PrimitiveType.String, ...args);
}
