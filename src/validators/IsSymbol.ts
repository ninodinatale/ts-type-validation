import { DecoratorFunction, DecoratorWrapper, ErrorFunction } from './core/types';
import { decorate } from './core';

export function IsSymbol(target: any, key: string): void;
export function IsSymbol(errorFn: ErrorFunction): DecoratorFunction

export function IsSymbol(targetOrErrorFn: ErrorFunction, key?: string): DecoratorWrapper {
  return decorate('symbol', targetOrErrorFn, key);
}
