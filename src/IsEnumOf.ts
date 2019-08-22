import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HigherOrderType } from './core/types';
import { decoratorFactory } from './core/logic';

export function IsEnumOf(enumType: ExpectedType): any;
export function IsEnumOf(enumType: ExpectedType, errorFunction: ErrorFunction): any;

export function IsEnumOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Enum, args[0], args[1], _isValidEnum);
}

function _isValidEnum<T extends ExpectedType>(value: any, _enum: T): boolean {
  // number based (default)
  // Number() is an object, but will be unboxed by JS, which will return
  // true if the index exists in _enum. Therefore we check explicitly that value is not an object. This
  // may be reconsidered at a later time in order to behave Number(), String() etc. like primitive values.
  if (typeof value !== 'object' && value in _enum) {
    return true;
  } else {
    // string based
    return Object.values(_enum).includes(value);
  }
}
