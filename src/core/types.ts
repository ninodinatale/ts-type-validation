export type OrdinaryValidatorArgs = [] | [ErrorFunction];
export type AdvancedValidatorArgs = [ExpectedType] | [ExpectedType, ErrorFunction];

export type PropertyDecoratorArgs = [Target, string | symbol]
export type ParameterDecoratorArgs = [Target, string | symbol, number]
export type MethodDecoratorArgs<T> = [Target, string | symbol, TypedPropertyDescriptor<T>];
export type DecoratorFactoryArgs<T> = PropertyDecoratorArgs | ParameterDecoratorArgs | MethodDecoratorArgs<T>

export type DecoratorFactory = PropertyDecorator | ParameterDecorator | MethodDecorator

export type Target = {[key: string]: any};

export interface OrdinaryDecoratorFactoryThisContext {
  validationType: ValidationType,
  expectedType: ExpectedType,
  errorFn: ErrorFunction,
  isValidFn: ValidationFunction
}

export type ErrorFunction = (...value: any[]) => void
export type ValidationFunction = (value: any, expectedType: ExpectedType) => boolean

export enum HigherOrderType {
  Object,
  Enum,
  Literal,
  Tuple,
  Union
}

export type ExpectedType = PrimitiveType | Object
export type ValidationType = PrimitiveType | HigherOrderType

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'object' | 'symbol' | 'function';
