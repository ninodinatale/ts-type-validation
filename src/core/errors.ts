import { ComposedType, ExpectedType } from './types';

export const TYPE_ERROR_MESSASGE = 'Invalid type!';

function throwTypeErrorFor<T extends Object>(target: T, propertyKey: string | symbol, expectedType: ExpectedType, value: any): never {
  throw new TypeError(TYPE_ERROR_MESSASGE);
  // TODO uncomment and test
  // throw new TypeError(`Invalid assignment to property ${propertyKey} of object ${target.constructor.name}. Expected type ${expectedType} but assigned value was ${value}`);
}

// TODO reimplement
function _getExpectedTypeString(expectedType: ExpectedType | ComposedType): string {
  if ((expectedType as ComposedType).union != null) {
    let unionTypes = ' ';
    (expectedType as ComposedType).union.forEach(type => unionTypes += type.toString());
    return `union of${unionTypes}`;
  } else {
    return expectedType.toString();
  }
}

export { throwTypeErrorFor }