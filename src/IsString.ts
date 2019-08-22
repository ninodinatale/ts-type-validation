import { DecoratorFactory, ErrorFunction, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsString(): any;
export function IsString(errorFunction: ErrorFunction): any;

export function IsString(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory('string', 'string', ...args);
}
