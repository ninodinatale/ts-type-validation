import {
  DecoratorFunction,
  ErrorFunction,
  ParameterDecoratorArgs, PropertyDecoratorArgs,
  DecoratorFactoryArgs, Types
} from './core/types';
import { decoratorFactory } from './core';

export function IsFunction(...args: PropertyDecoratorArgs): DecoratorFunction;
export function IsFunction(...args: ParameterDecoratorArgs): DecoratorFunction;
export function IsFunction(errorFunction: ErrorFunction): DecoratorFunction;

export function IsFunction(...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: Types.Function}, ...args);
}
