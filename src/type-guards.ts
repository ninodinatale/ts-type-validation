import {
  ClassDecoratorArgs,
  DecoratorFactoryArgs,
  ExpectedType,
  HigherOrderType,
  MethodDecoratorArgs,
  OrdinaryValidatedParameter,
  ParameterDecoratorArgs,
  PropertyDecoratorArgs,
  ValidatedByMetadataParameter,
  ValidationType
} from './types';

export function isValidExpectedType(validationType: ValidationType, expectedType?: ExpectedType): expectedType is ExpectedType {
  if (!expectedType) {
    return validationType === HigherOrderType.NotNull;
  }

  let enumValues: Array<HigherOrderType> = [];
  for (let value in HigherOrderType) {
    if (typeof HigherOrderType[value] === 'number') {
      enumValues.push(value as unknown as HigherOrderType);
    }
  }

  if (Object.values(['string', 'number', 'boolean', 'object', 'symbol', 'function', ...enumValues]).includes(validationType)) {
    return validationType === expectedType;
  } else {
    if (Object.values(HigherOrderType).includes(validationType)) {
      switch (validationType) {
        case HigherOrderType.NotNull:
          return true;
        case HigherOrderType.Enum:
          // @ts-ignore TODO: This assertion is used for enums. Improve assertion to remove __proto__ access.
          return expectedType.__proto__.constructor.name === 'Object';
        case HigherOrderType.Union:
        case HigherOrderType.Tuple:
          return Array.isArray(expectedType);
        case HigherOrderType.Literal:
          return Array.isArray(expectedType) && !expectedType.some(literal => {
            return typeof literal !== 'string' && typeof literal !== 'number';
          });
        case HigherOrderType.Object:
          if (typeof expectedType === 'function') {
            return expectedType.hasOwnProperty('prototype') &&
                // exclude anonymous function constructors
                // @ts-ignore: we know there is a property prototype TODO
                !!expectedType.prototype.constructor.name;

          } else {
            return false;
          }
        default:
          return false;
      }
    }
  }
  return false;
}

// TODO why any in args: any
export function isParameterDecoratorArgs<T>(args: any): args is ParameterDecoratorArgs {
  return args.length === 3 && typeof args[2] === 'number';
}

// TODO why any in args: any
export function isMethodDecorator<T>(args: any): args is MethodDecoratorArgs<T> {
  return args.length === 3 && typeof args[2] !== 'number';
}

export function isPropertyDecorator<T>(args: DecoratorFactoryArgs<T>): args is PropertyDecoratorArgs {
  return args.length === 2;
}

export function isClassDecorator<T>(args: DecoratorFactoryArgs<T>): args is ClassDecoratorArgs {
  return args.length === 1 && typeof args[0] === 'function';
}

export function isOrdinaryValidatedParameter(arg: any): arg is OrdinaryValidatedParameter {
  const {validationType, expectedType, isValidFn, parameterIndex} = arg;
  return validationType != null && expectedType != null && isValidFn != null && parameterIndex != null;
}

export function isValidatedByMetadataParameter(arg: any): arg is ValidatedByMetadataParameter {
  const {parameterIndex, expectedTypes} = arg;
  return parameterIndex != null && expectedTypes != null;
}
