import {
  getNotThrowingFilterFn,
  getShouldExecutePassedErrorFunctionExpectFn, getShouldNotThrowExpectFn,
  getShouldThrowExpectFn,
  getThrowingFilterFn,
  performExpectFn,
  TypesForTest
} from './Utils';

export namespace PropertyDecorator {
  export function shouldNotThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                        helperClass: new() => T,
                                                        propertyKey: keyof T,
                                                        additionalAssignmentValues?: any[]) {
    describe('as property decorator should not throw an error if assigning', () => {
      performExpectFn(
          getNotThrowingFilterFn(typesOfProperty),
          getShouldNotThrowExpectFn(propertyKey, (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                     helperClass: new() => T,
                                                     propertyKey: keyof T,
                                                     additionalAssignmentValues?: any[]) {
    describe('as property decorator should throw an error if assigning', () => {
      performExpectFn(
          getThrowingFilterFn(typesOfProperty),
          getShouldThrowExpectFn(propertyKey, (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldExecutePassedErrorFunction<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                                     helperClass: { new(): T; },
                                                                     propertyKey: keyof T,
                                                                     additionalAssignmentValues?: any[]) {
    describe('as property decorator should execute passed error function if assigning', () => {
      performExpectFn(
          getThrowingFilterFn(typesOfProperty),
          getShouldExecutePassedErrorFunctionExpectFn(
              propertyKey,
              (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }
}