import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HigherOrderType } from './core/types';
import { decoratorFactory, ordinaryIsValidFn } from './core/logic';

export function IsUnionOf(unions: ExpectedType): any;
export function IsUnionOf(unions: ExpectedType, errorFunction: ErrorFunction): any;

export function IsUnionOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Union, args[0], args[1], _isValidUnion);
}

function _isValidUnion(value: any, unionTypes: ExpectedType): boolean {
  if (value == null) {
    return true;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  return unionTypes.some((type: ExpectedType) => {
    return ordinaryIsValidFn(value, type);
  });
}
