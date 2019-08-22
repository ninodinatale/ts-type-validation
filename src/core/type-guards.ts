import {
  ExpectedType,
  HighOrderType,
  MethodDecoratorArgs,
  OrdinaryDecoratorFactoryArgs,
  ParameterDecoratorArgs,
  PropertyDecoratorArgs,
  ValidationType
} from './types';

export function isValidExpectedType(validationType: ValidationType, expectedType?: ExpectedType): expectedType is ExpectedType {
  if (!expectedType) {
    return false;
  }

  let enumValues: Array<HighOrderType> = [];
  for(let value in HighOrderType) {
    if(typeof HighOrderType[value] === 'number') {
      enumValues.push(value as unknown as HighOrderType);
    }
  }

  if (Object.values(['string', 'number', 'boolean', 'object', 'symbol', 'function', ...enumValues]).includes(validationType)) {
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
            return typeof literal !== 'string' && typeof literal !== 'number';
          });
        case HighOrderType.Object:
          if (typeof expectedType === 'function') {
            return expectedType.hasOwnProperty('prototype') &&
                // exclude anonymous function constructors
                // @ts-ignore: we know there is a property prototype
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

export function isParameterDecoratorArgs<T>(args: OrdinaryDecoratorFactoryArgs<T>): args is ParameterDecoratorArgs {
  return args.length === 3 && typeof args[2] === 'number';
}

// TODO why any in args: any
export function isMethodDecorator<T>(args: any): args is MethodDecoratorArgs<T> {
  return args.length === 3 && typeof args[2] !== 'number';
}

export function isPropertyDecorator<T>(args: OrdinaryDecoratorFactoryArgs<T>): args is PropertyDecoratorArgs {
  return args.length === 2;
}
