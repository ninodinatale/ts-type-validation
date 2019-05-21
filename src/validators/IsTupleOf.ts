import {
  DecoratorFactoryArgs,
  DecoratorFunction, ValidatedType
} from './core/types';
import { decoratorFactory, ordinaryIsValidFn } from './core';

export function IsTupleOf(tupleTypes: ValidatedType[], ...args: DecoratorFactoryArgs): DecoratorFunction {
  return decoratorFactory.call({expectedType: tupleTypes, isValidFn: (value: any) => _isValidTuple(value, tupleTypes)}, ...args);
}

function _isValidTuple(value: any, tupleTypes: ValidatedType[]): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.length !== tupleTypes.length) {
    return false;
  }

  return tupleTypes.every((type, index) => {
    return ordinaryIsValidFn(value[index], type);
  });
}
