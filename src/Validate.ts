import { DecoratorFactory, ErrorFunction, OrdinaryValidatorArgs } from './core/types';
import { decoratorFactory } from './core/logic';

export function Validate(): any;
export function Validate(errorFunction: ErrorFunction): any;

export function Validate(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(undefined, undefined, ...args);
}
