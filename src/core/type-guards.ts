import {
  ExpectedType,
  HigherOrderType,
  MethodDecoratorArgs,
  DecoratorFactoryArgs,
  ParameterDecoratorArgs,
  PropertyDecoratorArgs,
  ValidationType
} from './types';

export function isValidExpectedType(validationType: ValidationType, expectedType?: ExpectedType): expectedType is ExpectedType {
  if (!expectedType) {
    return false;
  }

  let enumValues: Array<HigherOrderType> = [];
  for(let value in HigherOrderType) {
    if(typeof HigherOrderType[value] === 'number') {
      enumValues.push(value as unknown as HigherOrderType);
    }
  }

  if (Object.values(['string', 'number', 'boolean', 'object', 'symbol', 'function', ...enumValues]).includes(validationType)) {
    return validationType === expectedType;
  } else {
    if (Object.values(HigherOrderType).includes(validationType)) {
      switch (validationType) {
        case HigherOrderType.Enum:
          // TODO: This assertion is used for enums. Improve assertion to remove __proto__ access.
          // @ts-ignore
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

export function isParameterDecoratorArgs<T>(args: DecoratorFactoryArgs<T>): args is ParameterDecoratorArgs {
  return args.length === 3 && typeof args[2] === 'number';
}

// TODO why any in args: any
export function isMethodDecorator<T>(args: any): args is MethodDecoratorArgs<T> {
  return args.length === 3 && typeof args[2] !== 'number';
}

export function isPropertyDecorator<T>(args: DecoratorFactoryArgs<T>): args is PropertyDecoratorArgs {
  return args.length === 2;
}
