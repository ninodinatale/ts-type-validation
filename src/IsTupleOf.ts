import { AdvancedValidatorArgs, DecoratorFactory, ErrorFunction, ExpectedType, HigherOrderType } from './core/types';
import { decoratorFactory, ordinaryIsValidFn } from './core/logic';

export function IsTupleOf(tuples: ExpectedType): any;
export function IsTupleOf(tuples: ExpectedType, errorFunction: ErrorFunction): any;

export function IsTupleOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Tuple, args[0], args[1], _isValidTuple);
}

function _isValidTuple(value: any, tuples: ExpectedType): boolean {
  if (value == null) {
    return true;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  if (value.length !== tuples.length) {
    return false;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  return tuples.every((type, index) => {
    return ordinaryIsValidFn(value[index], type);
  });
}
