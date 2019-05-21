import {
  DecoratorFactoryArgs,
  DecoratorFunction,
} from './core/types';
import { decoratorFactory } from './core';

export function IsLiteralOf(literals: Array<string | number>, ...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: literals, isValidFn: (value: any) => _isValidLiteral(value, literals)}, ...args);
}

function _isValidLiteral(value: any, literals: Array<string | number>): boolean {
  return literals.some(literal => literal === value);
}
