import { DecoratorFactory, HigherOrderType, OrdinaryValidatorArgs, ValidatorOptions } from './core/types';
import { decoratorFactory } from './core/logic';

export function NotNull(): any;
export function NotNull(options: ValidatorOptions): any;

export function NotNull(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.NotNull, HigherOrderType.NotNull, args[0], _isNotNull);
}

function _isNotNull(value: any): boolean {
  return value != null;
}