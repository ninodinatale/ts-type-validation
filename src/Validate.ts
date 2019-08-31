import { DecoratorFactory, OrdinaryValidatorArgs, ValidatorOptions } from './core/types';
import { decoratorFactory } from './core/logic';

export function Validate(): any;
export function Validate(options: ValidatorOptions): any;

export function Validate(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(undefined, undefined, ...args);
}
