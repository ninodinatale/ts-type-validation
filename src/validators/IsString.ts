import {
  DecoratorFunction,
  ErrorFunction,
  ParameterDecoratorArgs, PropertyDecoratorArgs,
  DecoratorFactoryArgs, Types
} from './core/types';
import { decoratorFactory } from './core';

export function IsString(...args: PropertyDecoratorArgs): DecoratorFunction;
export function IsString(...args: ParameterDecoratorArgs): DecoratorFunction;
export function IsString(errorFunction: ErrorFunction): DecoratorFunction;

export function IsString(...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: Types.String}, ...args);
}
