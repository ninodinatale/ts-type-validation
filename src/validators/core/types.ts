type DecoratorFunction = (target: any, key: string) => void;
type ValidatedType = 'string' | 'number' | 'object' | 'symbol' | 'function' | Object;
type ComposedType = {union: ValidatedType[], tuple: ValidatedType[], intersection: ValidatedType[], enum: any};
type DecoratorWrapper = DecoratorFunction | void;
type ErrorFunction = (...value: any[]) => void
type ValidationFunction = (expectedValue: ValidatedType) => boolean

export {
  ErrorFunction,
  DecoratorWrapper,
  DecoratorFunction,
  ValidatedType,
  ValidationFunction,
  ComposedType
};