import {
  DecoratorFunction,
  ErrorFunction, OrdinaryDecoratorFactoryArgs, PrimitiveType, OrdinaryValidatorArgs
} from './core/types';
import { decoratorFactory } from './core';

export function IsBoolean(): any;
export function IsBoolean(errorFunction: ErrorFunction): any;

export function IsBoolean(...args: OrdinaryValidatorArgs): DecoratorFunction {
  return decoratorFactory(PrimitiveType.Boolean, PrimitiveType.Boolean, ...args);
}
