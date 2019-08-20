import { DecoratorFactory, ErrorFunction, OrdinaryValidatorArgs, PrimitiveType } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsBoolean(): any;
export function IsBoolean(errorFunction: ErrorFunction): any;

export function IsBoolean(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(PrimitiveType.Boolean, PrimitiveType.Boolean, ...args);
}
