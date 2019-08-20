import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HighOrderType } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsLiteralOf(literals: ExpectedType): any;
export function IsLiteralOf(literals: ExpectedType, errorFunction: ErrorFunction): any;

export function IsLiteralOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HighOrderType.Literal, args[0], args[1], _isValidLiteral);
}

function _isValidLiteral(value: any, literals: ExpectedType): boolean {
  // @ts-ignore: literals has been checked to be of type ExpectedType in decoratorFactory already
  return literals.some(literal => literal === value);
}
