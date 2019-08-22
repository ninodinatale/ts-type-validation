import { DecoratorFactory, ErrorFunction, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsNumber(): any;
export function IsNumber(errorFunction: ErrorFunction): any;

export function IsNumber(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory('number', 'number', ...args);
}
