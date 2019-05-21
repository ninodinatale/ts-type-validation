import {
  DecoratorFactoryArgs,
  DecoratorFunction,
  ErrorFunction,
  ValidatedType
} from './core/types';
import { decoratorFactory } from './core';

export function IsObject(objectType: ValidatedType, errorFunction: ErrorFunction): DecoratorFunction;
export function IsObject(objectType: ValidatedType): DecoratorFunction;

export function IsObject(objectType: ValidatedType, ...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: objectType}, ...args);
}
