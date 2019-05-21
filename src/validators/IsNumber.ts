import {
  DecoratorFunction,
  ErrorFunction,
  ParameterDecoratorArgs, PropertyDecoratorArgs,
  DecoratorFactoryArgs, Types
} from './core/types';
import { decoratorFactory } from './core';

export function IsNumber(...args: PropertyDecoratorArgs): DecoratorFunction;
export function IsNumber(...args: ParameterDecoratorArgs): DecoratorFunction;
export function IsNumber(errorFunction: ErrorFunction): DecoratorFunction;

export function IsNumber(...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: Types.Number}, ...args);
}
