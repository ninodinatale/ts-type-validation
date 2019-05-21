import {
  DecoratorFunction,
  ErrorFunction,
  ParameterDecoratorArgs, PropertyDecoratorArgs,
  DecoratorFactoryArgs, Types
} from './core/types';
import { decoratorFactory } from './core';

export function IsSymbol(...args: PropertyDecoratorArgs): DecoratorFunction;
export function IsSymbol(...args: ParameterDecoratorArgs): DecoratorFunction;
export function IsSymbol(errorFunction: ErrorFunction): DecoratorFunction;

export function IsSymbol(...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: Types.Symbol}, ...args);
}
