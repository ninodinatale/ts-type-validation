import { DecoratorFunction, ErrorFunction, ValidatedType } from './core/types';
import { defineProperty, ordinaryIsValidFn } from './core';

export function IsEnumOf<Enum>(_enum: Enum, errorFn?: ErrorFunction): DecoratorFunction {
  return (target: any, key: string) => {
    defineProperty.bind({
      expectedType: {enum: _enum}, errorFn: errorFn, isValidFn: (value: any) => _isValidEnum.call(null, value, _enum)
    })(target, key);
  };
}

function _isValidEnum<Enum>(value: any, _enum: Enum): boolean {
  // number based (default)
  if (value in _enum) {
    return true;
  } else {
    // string based
    return Object.values(_enum).includes(value);
  }
}
