import {
  DecoratorFunction,
  ErrorFunction,
  ParameterDecoratorArgs, PropertyDecoratorArgs,
  DecoratorFactoryArgs, Types
} from './core/types';
import { decoratorFactory } from './core';

export function IsBoolean(...args: PropertyDecoratorArgs): DecoratorFunction;
export function IsBoolean(...args: ParameterDecoratorArgs): DecoratorFunction;
export function IsBoolean(errorFunction: ErrorFunction): DecoratorFunction;

export function IsBoolean(...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: Types.Boolean}, ...args);
}
