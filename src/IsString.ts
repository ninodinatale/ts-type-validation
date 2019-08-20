import { DecoratorFactory, ErrorFunction, PrimitiveType, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsString(): any;
export function IsString(errorFunction: ErrorFunction): any;

export function IsString(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(PrimitiveType.String, PrimitiveType.String, ...args);
}
