export type OrdinaryValidatorArgs = [] | [ValidatorOptions];
export type AdvancedValidatorArgs = [ExpectedType] | [ExpectedType, ValidatorOptions];

export interface ValidatorOptions {
  notNull?: boolean,
  errorCb?: ErrorFunction
}

export type ClassDecoratorArgs = [{new(...args:any[]):{}}];
export type PropertyDecoratorArgs = [Target, string | symbol]
export type ParameterDecoratorArgs = [Target, string | symbol, number]
export type MethodDecoratorArgs<T> = [Target, string | symbol, TypedPropertyDescriptor<T>];
export type DecoratorFactoryArgs<T> = PropertyDecoratorArgs | ParameterDecoratorArgs | MethodDecoratorArgs<T> | ClassDecoratorArgs

export type DecoratorFactory = PropertyDecorator | ParameterDecorator | MethodDecorator | ClassDecorator

export type Target = {[key: string]: any};

export interface OrdinaryDecoratorFactoryThisContext {
  validationType: ValidationType,
  expectedType: ExpectedType,
  isValidFn: OrdinaryValidationFunction,
  options: ValidatorOptions
}

export interface ValidateByMetadataDecoratorFactory {
  options: ValidatorOptions
}

export interface OrdinaryValidatedParameter extends OrdinaryDecoratorFactoryThisContext {
  parameterIndex: number
}

export interface ValidatedByMetadataParameter extends ValidateByMetadataDecoratorFactory {
  parameterIndex: number;
  expectedTypes: Function[];
}

export type ErrorFunction = (...value: any[]) => void
export type OrdinaryValidationFunction = (value: any, expectedType: ExpectedType, notNull: boolean) => boolean
export type MetadataValidationFunction = (value: any, expectedType: Function, notNull: boolean) => boolean

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
