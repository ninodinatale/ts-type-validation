import {
  DecoratorFactoryArgs,
  DecoratorFunction,
} from './core/types';
import { decoratorFactory } from './core';

export function IsEnumOf<Enum>(_enum: Enum, ...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: _enum, isValidFn: (value: any) => _isValidEnum(value, _enum)}, ...args);
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
