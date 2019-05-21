import {
  DecoratorFactoryArgs,
  DecoratorFunction, ValidatedType
} from './core/types';
import { decoratorFactory, ordinaryIsValidFn } from './core';

export function IsUnionOf(unionTypes: ValidatedType[], ...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: unionTypes, isValidFn: (value: any) => _isValidUnion(value, unionTypes)}, ...args);
}

function _isValidUnion(value: any, unionTypes: ValidatedType[]): boolean {
  return unionTypes.some((type: ValidatedType) => {
    return ordinaryIsValidFn(value, type);
  });
}
