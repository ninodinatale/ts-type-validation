import { DecoratorFunction, ErrorFunction, ValidatedType } from './core/types';
import { defineProperty, ordinaryIsValidFn } from './core';

export function IsLiteralOf(literals: Array<string | number>, errorFn?: ErrorFunction): DecoratorFunction {
  return (target: any, key: string) => {
    defineProperty.bind({
      expectedType: {literal: literals}, errorFn: errorFn, isValidFn: (value: any) => _isValidLiteral.call(null, value, literals)
    })(target, key);
  };
}

function _isValidLiteral(value: any, literals: Array<string | number>): boolean {
  return literals.some(literal => literal === value);
}
