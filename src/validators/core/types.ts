export type DecoratorTarget = { [key: string]: any };
export type ErrorFunction = (...value: any[]) => void

export type PropertyDecoratorArgs = [DecoratorTarget, string]
export type ParameterDecoratorArgs = [DecoratorTarget, string, number]

export type ExtendedPropertyDecoratorArgs = [ErrorFunction, DecoratorTarget, string] // TODO rename
export type ExtendedParameterDecoratorArgs = [ErrorFunction, DecoratorTarget, string, number] // TODO rename

export type ExtendedDecoratorFactoryArgs = [] | ExtendedPropertyDecoratorArgs | ExtendedParameterDecoratorArgs // TODO rename

export type OrdinaryDecoratorFactoryArgs = PropertyDecoratorArgs | ParameterDecoratorArgs

export type DecoratorFactoryArgs = [] | [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs // TODO rename


export interface DecoratorFactoryThisContext {
  expectedType: ValidatedType,
  isValidFn?: ValidationFunction
}

export interface OrdinaryDecoratorFactoryThisContext {
  expectedType: ValidatedType,
  errorFn: ErrorFunction,
  isValidFn: ValidationFunction
}

export type ValidationDecoratorArgs = [ErrorFunction] | PropertyDecoratorArgs | ParameterDecoratorArgs


export type ReducedPropertyDecoratorArgs = [string]
export type ReducedParameterDecoratorArgs = [string, number]
export type ValidatorArgs = ReducedPropertyDecoratorArgs | ReducedParameterDecoratorArgs
// export type DecoratorFactoryArgs = CompleteDecoratorFactoryArgs | ValidatorArgs

export type PropertyDecoratorFunction = (target: DecoratorTarget, key: string) => void;
export type ParameterDecoratorFunction = (target: DecoratorTarget, key: string, index: number) => void;
// export type ValidatedType = 'string' | 'number' | 'object' | 'symbol' | 'function' | Object;
export type ComposedType = { union: ValidatedType[], tuple: ValidatedType[], intersection: ValidatedType[], enum: any };
export type DecoratorFunction = any | void; // TODO does not work without any smh.
export type ValidationFunction = (expectedValue: ValidatedType) => boolean

export type ValidatedType = Types | Object

export enum Types {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  Symbol = 'symbol',
  Function = 'function'
}