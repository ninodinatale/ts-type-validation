import { decorate } from './core';
import { DecoratorFunction, DecoratorWrapper, ErrorFunction } from './core/types';

export function IsFunction(target: any, key: string): void;
export function IsFunction(errorFn: ErrorFunction): DecoratorFunction

export function IsFunction(targetOrErrorFn: ErrorFunction, key?: string): DecoratorWrapper {
  return decorate('function', targetOrErrorFn, key);
}
