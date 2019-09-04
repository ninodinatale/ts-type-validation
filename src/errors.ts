import { ExpectedType, HigherOrderType, ValidationType } from './types';

function throwTypeErrorFor<T extends Object>(validationType: ValidationType | undefined, expectedType: ExpectedType, value: any, target: T, propertyKey: string | symbol | undefined, parameterIndex: number | undefined): never {
  const propKey = typeof propertyKey === 'symbol' ? propertyKey.description : propertyKey;
  const val = typeof value === 'symbol' ? value.description : value;

  let expType: string;
  switch (expectedType) {
    case typeof expectedType === 'string':
      expType = expectedType + '';
      break;
    case HigherOrderType.NotNull:
      expType = 'not null';
      break;
    default:
      expType = expectedType.toString();
  }

  let higherOrderTypeStr: string = '';
  switch (validationType) {
    case HigherOrderType.Literal:
      higherOrderTypeStr = 'literal of';
      break;
    case HigherOrderType.Union:
      higherOrderTypeStr = 'union of';
      break;
    case HigherOrderType.Tuple:
      higherOrderTypeStr = 'tuple of';
      break;
    case HigherOrderType.Enum:
      higherOrderTypeStr = 'enum of';
      break;
    case HigherOrderType.Object:
      higherOrderTypeStr = 'object of';
      break;
    default:
      higherOrderTypeStr = '';
  }

  let errorMessageExpected: string;
  if (higherOrderTypeStr.length > 0) {
    errorMessageExpected = `Expected ${higherOrderTypeStr} ${expType}`;
  } else {
    errorMessageExpected = `Expected ${expType}`;
  }

  if (propertyKey != null && parameterIndex != null) {
    // parameter
    throw new TypeError(`Invalid assignment to parameter with index ${parameterIndex} of called function ${propKey} of object ${target.constructor.name}. ${errorMessageExpected}, but assigned value was ${val} (${typeof val})`);
  } else if (propertyKey != null) {
    // property
    throw new TypeError(`Invalid assignment to property ${propKey} of object ${target.constructor.name}. ${errorMessageExpected}, but assigned value was ${val} (${typeof val})`);
  } else {
    // class
    throw new TypeError(`Invalid assignment to parameter with index ${parameterIndex} of called constructor of object ${target.constructor.name}. ${errorMessageExpected}, but assigned value was ${val} (${typeof val})`);
  }
}

export { throwTypeErrorFor };