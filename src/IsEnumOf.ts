import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HighOrderType } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsEnumOf(enumType: ExpectedType): any;
export function IsEnumOf(enumType: ExpectedType, errorFunction: ErrorFunction): any;

export function IsEnumOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HighOrderType.Enum, args[0], args[1], _isValidEnum);
}

function _isValidEnum<T extends ExpectedType>(value: any, _enum: T): boolean {
  // number based (default)
  if (value in _enum) {
    return true;
  } else {
    // string based
    return Object.values(_enum).includes(value);
  }
}
