import { AdvancedValidatorArgs, DecoratorFactory, ExpectedType, HigherOrderType, ValidatorOptions } from './core/types';
import { decoratorFactory, ordinaryIsValidFn } from './core/logic';

export function IsTupleOf(tuples: ExpectedType): any;
export function IsTupleOf(tuples: ExpectedType, options: ValidatorOptions): any;

export function IsTupleOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Tuple, args[0], args[1], _isValidTuple);
}

function _isValidTuple(value: any, tuples: ExpectedType, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  if (value.length !== tuples.length) {
    return false;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  return tuples.every((type, index) => {
    return ordinaryIsValidFn(value[index], type, notNull);
  });
}
