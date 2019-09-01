import { AdvancedValidatorArgs, DecoratorFactory, ExpectedType, HigherOrderType, ValidatorOptions } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsLiteralOf(literals: ExpectedType): any;
export function IsLiteralOf(literals: ExpectedType, options: ValidatorOptions): any;

export function IsLiteralOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Literal, args[0], args[1], _isValidLiteral);
}

function _isValidLiteral(value: any, literals: ExpectedType, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // @ts-ignore: literals has been checked to be of type ExpectedType in decoratorFactory already
  return literals.some(literal => literal === value);
}
