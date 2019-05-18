import { decorate } from './core';
import { DecoratorFunction, DecoratorWrapper, ErrorFunction } from './core/types';

export function IsString(target: any, key: string): void;
export function IsString(errorFn: ErrorFunction): DecoratorFunction

export function IsString(targetOrErrorFn: ErrorFunction, key?: string): DecoratorWrapper {
  return decorate('string', targetOrErrorFn, key);
}
