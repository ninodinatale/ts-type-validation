import {
  decoratorFactory,
  installValidatorForClass,
  installValidatorForMethod,
  ordinaryIsValidFn
} from './src/core';
import {
  AdvancedValidatorArgs,
  DecoratorFactory,
  ExpectedType,
  HigherOrderType,
  OrdinaryValidatorArgs,
  ValidatorOptions
} from './src/types';


/**
 * Validate upon declared types. Uses `reflect-metadata` internally.
 * @constructor
 */
export function Validate(): any;
/**
 * Validate upon declared types. Uses `reflect-metadata` internally.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function Validate(options: ValidatorOptions): any;
export function Validate(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(undefined, undefined, ...args);
}

/**
 * Validate not null.
 * @constructor
 */
export function NotNull(): any;

/**
 * Validate not null.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function NotNull(options: ValidatorOptions): any;
export function NotNull(...args: OrdinaryValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.NotNull, HigherOrderType.NotNull, args[0], _isNotNull);
}

function _isNotNull(value: any): boolean {
  return value != null;
}

/**
 * Validate value to be a union of {@param unions}.
 * @param unions Union types to validate upon.
 * @constructor
 */
export function IsUnionOf(unions: ExpectedType): any;

/**
 * Validate value to be a union of {@param unions}.
 * @param unions Union types to validate upon.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function IsUnionOf(unions: ExpectedType, options: ValidatorOptions): any;

export function IsUnionOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Union, args[0], args[1], _isValidUnion);
}

function _isValidUnion(value: any, unionTypes: ExpectedType, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  return unionTypes.some((type: ExpectedType) => {
    return ordinaryIsValidFn(value, type, notNull);
  });
}

/**
 * Validate value to be a tuple of {@param tuples}.
 * @param tuples Tuple types to validate upon.
 * @constructor
 */
export function IsTupleOf(tuples: ExpectedType): any;

/**
 * Validate value to be a tuple of {@param tuples}.
 * @param tuples Tuple types to validate upon.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function IsTupleOf(tuples: ExpectedType, options: ValidatorOptions): any;

export function IsTupleOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Tuple, args[0], args[1], _isValidTuple);
}

function _isValidTuple(value: any, tuples: ExpectedType, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  if (value.length !== tuples.length) {
    return false;
  }
  // @ts-ignore: literals has been checked to be of type array in decoratorFactory already
  return tuples.every((type, index) => {
    return ordinaryIsValidFn(value[index], type, notNull);
  });
}

/**
 * Validate value to be a literal of {@param literals}.
 * @param literals Literals to validate upon.
 * @constructor
 */
export function IsLiteralOf(literals: ExpectedType): any;

/**
 * Validate value to be a literal of {@param literals}.
 * @param literals Literals to validate upon.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function IsLiteralOf(literals: ExpectedType, options: ValidatorOptions): any;

export function IsLiteralOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Literal, args[0], args[1], _isValidLiteral);
}

function _isValidLiteral(value: any, literals: ExpectedType, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // @ts-ignore: literals has been checked to be of type ExpectedType in decoratorFactory already
  return literals.some(literal => literal === value);
}

/**
 * Validate value to be an enum of {@oaram enumType}
 * @param enumType Enum to validate upon.
 * @constructor
 */
export function IsEnumOf(enumType: ExpectedType): any;

/**
 * Validate value to be an enum of {@oaram enumType}
 * @param enumType Enum to validate upon.
 * @param options ValidatorOptions to set non-nullability and/or error callback.
 * @constructor
 */
export function IsEnumOf(enumType: ExpectedType, options: ValidatorOptions): any;
export function IsEnumOf(...args: AdvancedValidatorArgs): DecoratorFactory {
  return decoratorFactory(HigherOrderType.Enum, args[0], args[1], _isValidEnum);
}

function _isValidEnum<T extends ExpectedType>(value: any, _enum: T, notNull: boolean): boolean {
  if (value == null) {
    return !notNull;
  }
  // number based (default)
  // Number() is an object, but will be unboxed by JS, which will return
  // true if the index exists in _enum. Therefore we check explicitly that value is not an object. This
  // may be reconsidered at a later time in order to behave Number(), String() etc. like primitive values.
  if (typeof value !== 'object' && value in _enum) {
    return true;
  } else {
    // string based
    return Object.values(_enum).includes(value);
  }
}

/**
 * Installs decorator for decorated function's parameters.
 * @constructor
 */
export function RegisterConstructorParams(): ClassDecorator  {
  return installValidatorForClass;
}

/**
 * Installs decorator for decorated function's parameters.
 * @constructor
 */
export function RegisterParams(): MethodDecorator {
  return installValidatorForMethod;
}

export {
  ValidatorOptions,
  OrdinaryValidatorArgs,
  DecoratorFactory,
  ExpectedType,
  AdvancedValidatorArgs
}