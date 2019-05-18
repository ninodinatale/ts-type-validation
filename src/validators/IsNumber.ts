import { ErrorFunction, DecoratorWrapper, DecoratorFunction } from './core/types';
import { decorate } from './core';

export function IsNumber(target: any, key: string): void;
export function IsNumber(errorFn: ErrorFunction): DecoratorFunction;

export function IsNumber(targetOrErrorFn: ErrorFunction, key?: string): DecoratorWrapper {
  return decorate('number', targetOrErrorFn, key);
}
