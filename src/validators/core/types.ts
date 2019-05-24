export type DecoratorTarget = { [key: string]: any };
export type ErrorFunction = (...value: any[]) => void

export type PropertyDecoratorArgs = [DecoratorTarget, string]
export type ParameterDecoratorArgs = [DecoratorTarget, string, number]

export type ExtendedPropertyDecoratorArgs = [ErrorFunction, DecoratorTarget, string] // TODO rename
export type ExtendedParameterDecoratorArgs = [ErrorFunction, DecoratorTarget, string, number] // TODO rename

export type ExtendedDecoratorFactoryArgs = [] | ExtendedPropertyDecoratorArgs | ExtendedParameterDecoratorArgs // TODO rename

export type OrdinaryDecoratorFactoryArgs = PropertyDecoratorArgs | ParameterDecoratorArgs

export type DecoratorFactoryArgs = [] | [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs // TODO rename

export type OrdinaryValidatorArgs = [] | [ErrorFunction];
export type AdvancedValidatorArgs = [ExpectedType] | [ExpectedType, ErrorFunction];



export interface DecoratorFactoryThisContext {
  expectedType: ExpectedType,
  isValidFn?: ValidationFunction
}

export interface OrdinaryDecoratorFactoryThisContext {
  expectedType: ExpectedType,
  errorFn: ErrorFunction,
  isValidFn: ValidationFunction
}

export type ValidationDecoratorArgs = [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs


export type ReducedPropertyDecoratorArgs = [string]
export type ReducedParameterDecoratorArgs = [string, number]
// export type DecoratorFactoryArgs = CompleteDecoratorFactoryArgs | OrdinaryValidatorArgs

export type PropertyDecoratorFunction = (target: DecoratorTarget, key: string) => void;
export type ParameterDecoratorFunction = (target: DecoratorTarget, key: string, index: number) => void;
// export type ExpectedType = 'string' | 'number' | 'object' | 'symbol' | 'function' | Object;
export type ComposedType = { union: ExpectedType[], tuple: ExpectedType[], intersection: ExpectedType[], enum: any };
export type DecoratorFunction = PropertyDecoratorFunction | ParameterDecoratorFunction
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