import { ExpectedType, HigherOrderType, ValidationType } from './types';

function throwTypeErrorFor<T extends Object>(target: T, propertyKey: string | symbol, validationType: ValidationType | null, expectedType: ExpectedType, value: any): never {
  const propKey = typeof propertyKey === 'symbol' ? propertyKey.description : propertyKey;
  const val = typeof value === 'symbol' ? value.description : value;
  const expType = typeof expectedType === 'string' ? expectedType : expectedType.toString();

  let higherOrderTypeStr: string;
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

  throw new TypeError(`Invalid assignment to property ${propKey} of object ${target.constructor.name}. ${errorMessageExpected}, but assigned value was ${val} (${typeof val})`);
}

export { throwTypeErrorFor };