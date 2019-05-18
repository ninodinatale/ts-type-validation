import { DecoratorFunction, ErrorFunction, ValidatedType } from './core/types';
import { defineProperty, ordinaryIsValidFn } from './core';

export function IsUnionOf(unionTypes: ValidatedType[], errorFn?: ErrorFunction): DecoratorFunction {
  return (target: any, key: string) => {
    defineProperty.bind({
      expectedType: {union: unionTypes}, errorFn: errorFn, isValidFn: (value: any) => _isValidUnion.call(null, value, unionTypes)
    })(target, key);
  };
}

function _isValidUnion(value: any, unionTypes: ValidatedType[]): boolean {
  return unionTypes.some((type: ValidatedType) => {
    return ordinaryIsValidFn(value, type);
  });
}
