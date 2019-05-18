import { DecoratorFunction, ErrorFunction, ValidatedType } from './core/types';
import { defineProperty, ordinaryIsValidFn } from './core';

export function IsTupleOf(tupleTypes: ValidatedType[], errorFn?: ErrorFunction): DecoratorFunction {
  return (target: any, key: string) => {
    defineProperty.bind({
      expectedType: {tuple: tupleTypes}, errorFn: errorFn, isValidFn: (value: any) => _isValidTuple.call(null, value, tupleTypes)
    })(target, key);
  };
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
