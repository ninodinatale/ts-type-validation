export type ErrorFunction = (...value: any[]) => void

// API
export type OrdinaryValidatorArgs = [] | [ErrorFunction];
export type AdvancedValidatorArgs = [ExpectedType] | [ExpectedType, ErrorFunction];

// Decorator Args
export type PropertyDecoratorArgs = [Target, string | symbol]
export type ParameterDecoratorArgs = [Target, string | symbol, number]
export type MethodDecoratorArgs<T> = [Target, string | symbol, TypedPropertyDescriptor<T>];

export type OrdinaryDecoratorFactoryArgs<T> = PropertyDecoratorArgs | ParameterDecoratorArgs | MethodDecoratorArgs<T>


export type Target = {[key: string]: any};




export interface OrdinaryDecoratorFactoryThisContext {
  validationType: ValidationType,
  expectedType: ExpectedType,
  errorFn: ErrorFunction,
  isValidFn: ValidationFunction
}

export type ComposedType = { union: ExpectedType[], tuple: ExpectedType[], intersection: ExpectedType[], enum: any };


// previously: export type DecoratorFactory = PropertyDecoratorFunction | ParameterDecoratorFunction
export type DecoratorFactory = PropertyDecorator | ParameterDecorator | MethodDecorator


export type ValidationFunction = (value: any, expectedType: ExpectedType) => boolean

export enum HighOrderType {
  Object,
  Enum,
  Literal,
  Tuple,
  Union
}

export type ExpectedType = PrimitiveType | Object
export type ValidationType = PrimitiveType | HighOrderType

export enum PrimitiveType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  Symbol = 'symbol',
  Function = 'function'
}