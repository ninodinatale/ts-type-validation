export declare type ErrorFunction = (...value: any[]) => void

// API
export type OrdinaryValidatorArgs = [] | [ErrorFunction];
export type AdvancedValidatorArgs = [ExpectedType] | [ExpectedType, ErrorFunction];

// Decorator Args
export type PropertyDecoratorArgs = [Object, string | symbol]
export type ParameterDecoratorArgs = [Object, string | symbol, number]
export type MethodDecoratorArgs<T> = [Object, string | symbol, TypedPropertyDescriptor<T>];

export type OrdinaryDecoratorFactoryArgs<T> = PropertyDecoratorArgs | ParameterDecoratorArgs | MethodDecoratorArgs<T>




// export type ExtendedPropertyDecoratorArgs = [ErrorFunction, Object, string] // TODO rename
// export type ExtendedParameterDecoratorArgs = [ErrorFunction, Object, string, number] // TODO rename

// export type ExtendedDecoratorFactoryArgs = [] | ExtendedPropertyDecoratorArgs | ExtendedParameterDecoratorArgs // TODO rename


// export type DecoratorFactoryArgs = [] | [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs // TODO rename




export interface DecoratorFactoryThisContext {
  expectedType: ExpectedType,
  isValidFn?: ValidationFunction
}

export interface OrdinaryDecoratorFactoryThisContext {
  validationType: ValidationType,
  expectedType: ExpectedType,
  errorFn: ErrorFunction,
  isValidFn: ValidationFunction
}

export type ValidationDecoratorArgs = [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs


export type ReducedPropertyDecoratorArgs = [string]
export type ReducedParameterDecoratorArgs = [string, number]
// export type DecoratorFactoryArgs = CompleteDecoratorFactoryArgs | OrdinaryValidatorArgs

// export type PropertyDecoratorFunction = (target: DecoratorTarget, key: string) => void;
// export type ParameterDecoratorFunction = (target: DecoratorTarget, key: string, index: number) => void;
// export type ExpectedType = 'string' | 'number' | 'object' | 'symbol' | 'function' | Object;
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