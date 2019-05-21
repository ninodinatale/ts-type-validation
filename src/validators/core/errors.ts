import { ComposedType, ValidatedType } from './types';

function throwTypeErrorFor(): never {
  throw new TypeError();
}

// function throwTypeErrorFor(object: object, key: string, expectedType: ValidatedType | ComposedType, assignedValue: any): never {
//   let assigneValueType: string = typeof assignedValue;
//   if (assigneValueType != 'function' && assignedValue instanceof Object) {
//     assigneValueType = assignedValue.constructor.name;
//   }
//   const expectedTypeStr = _getExpectedTypeString(expectedType);
//   throw new TypeError(`Expected property ${key} of object ${object.constructor.name} to be of type ${expectedTypeStr}; But it was ${assigneValueType}.`);
// }
//
function _getExpectedTypeString(expectedType: ValidatedType | ComposedType): string {
  if ((expectedType as ComposedType).union != null) {
    let unionTypes = ' ';
    (expectedType as ComposedType).union.forEach(type => unionTypes += type.toString());
    return `union of${unionTypes}`;
  } else {
    return expectedType.toString();
  }
}

export { throwTypeErrorFor }