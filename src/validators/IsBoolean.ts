import { ErrorFunction, DecoratorWrapper, DecoratorFunction } from './core/types';
import { decorate } from './core';

export function IsBoolean(target: any, key: string): void;
export function IsBoolean(errorFn: ErrorFunction): DecoratorFunction;

export function IsBoolean(targetOrErrorFn: ErrorFunction, key?: string): DecoratorWrapper {
  return decorate('boolean', targetOrErrorFn, key);
}
