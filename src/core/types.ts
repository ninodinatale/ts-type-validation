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
  isValidFn: OrdinaryValidationFunction
}

export interface ValidateByMetadataDecoratorFactory {
  errorFn: ErrorFunction,
}

export interface OrdinaryValidatedParameter extends OrdinaryDecoratorFactoryThisContext {
  parameterIndex: number
}

export interface ValidatedByMetadataParameter extends ValidateByMetadataDecoratorFactory {
  parameterIndex: number;
  expectedTypes: Function[];
}

export type ErrorFunction = (...value: any[]) => void
export type OrdinaryValidationFunction = (value: any, expectedType: ExpectedType) => boolean
export type MetadataValidationFunction = (value: any, expectedType: Function) => boolean

export enum HigherOrderType {
  Object,
  Enum,
  Literal,
  Tuple,
  Union,
  NotNull
}

export type ExpectedType = PrimitiveType | Object | HigherOrderType.NotNull
export type ValidationType = PrimitiveType | HigherOrderType

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'object' | 'symbol' | 'function';
