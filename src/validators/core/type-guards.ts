import {
  ExpectedType,
  ExtendedDecoratorFactoryArgs, HighOrderType,
  OrdinaryDecoratorFactoryArgs,
  ParameterDecoratorArgs,
  PrimitiveType,
  PropertyDecoratorArgs, ValidationType
} from './types';

export function IsEmptyDevoratorFactoryArgs(args: any[]): args is [] {
  return args.length == 0;
}

export function isExtendedDecoratorFactoryArgs(args: any[]): args is ExtendedDecoratorFactoryArgs {
  return args.length == 0 || typeof args[0] === PrimitiveType.Function;
}

export function isDecoratorFactoryArgs(args: any[]): args is OrdinaryDecoratorFactoryArgs {
  return typeof args[0] === PrimitiveType.Object;
}

export function isValidExpectedType(validationType: ValidationType, expectedType?: ExpectedType): expectedType is ExpectedType {
  if (!expectedType) {
    return false;
  }
  if (Object.values(PrimitiveType).includes(validationType)) {
    return validationType === expectedType;
  } else {
    if (Object.values(HighOrderType).includes(validationType)) {
      switch (validationType) {
        case HighOrderType.Enum:
          // TODO: This assertion is used for enums. Improve assertion to remove __proto__ access.
          // @ts-ignore
          return expectedType.__proto__.constructor.name === 'Object';
        case HighOrderType.Union:
        case HighOrderType.Tuple:
          return Array.isArray(expectedType);
        case HighOrderType.Literal:
          return Array.isArray(expectedType) && !expectedType.some(literal => {
            return typeof literal !== PrimitiveType.String && typeof literal !== PrimitiveType.Number;
          });
        case HighOrderType.Object:
          if (typeof expectedType === PrimitiveType.Function) {
            return expectedType.hasOwnProperty('prototype') &&
              // exclude anonymous function constructors
              // @ts-ignore: we know there is a property prototype
              !!expectedType.prototype.constructor.name;

          } else {
            return false;
          }
        default: return false;
      }
    }
  }
  return false;
}

export function isParameterDecorator(args: OrdinaryDecoratorFactoryArgs): args is ParameterDecoratorArgs {
  return args.length === 3 && typeof args[2] === PrimitiveType.Number;
}

export function isPropertyDecorator(args: OrdinaryDecoratorFactoryArgs): args is PropertyDecoratorArgs {
  return args.length === 2;
}

function _isFunctionConstructor(expectedType?: any): expectedType is FunctionConstructor {
  return expectedType && expectedType.prototype && expectedType.prototype.constructor.name;
}