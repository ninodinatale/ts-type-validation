import { ComposedType, ExpectedType } from './types';

export const TYPE_ERROR_MESSASGE = 'Invalid type!';

function throwTypeErrorFor(): never {
  throw new TypeError(TYPE_ERROR_MESSASGE);
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