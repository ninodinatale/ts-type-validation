import {
  getNotThrowingFilterFn,
  getShouldExecutePassedErrorFunctionExpectFn,
  getShouldNotThrowExpectFn,
  getShouldThrowExpectFn,
  getThrowingFilterFn,
  performExpectFn,
  TypesForTest
} from './Utils';

export namespace ParameterDecorator {
  export function shouldNotThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                        helperClass: new() => T,
                                                        propertyKey: keyof T,
                                                        methodName: keyof T,
                                                        argumentIndex: number,
                                                        additionalAssignmentValues?: any[]) {
    describe('as parameter decorator should not throw an error if assigning', () => {
      performExpectFn(
          getNotThrowingFilterFn(typesOfProperty),
          // @ts-ignore
          getShouldNotThrowExpectFn(propertyKey, (value, c) => c[methodName](...getArgs(argumentIndex, value)), helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                     helperClass: new() => T,
                                                     propertyKey: keyof T,
                                                     methodName: keyof T,
                                                     argumentIndex: number,
                                                     additionalAssignmentValues?: any[]) {
    describe('as parameter decorator should throw an error if assigning', () => {
      performExpectFn(
          getThrowingFilterFn(typesOfProperty),
          // @ts-ignore
          getShouldThrowExpectFn(propertyKey, (value, c) => c[methodName](...getArgs(argumentIndex, value)), helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldExecutePassedErrorFunction<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                                     helperClass: { new(): T; },
                                                                     propertyKey: keyof T,
                                                                     methodName: keyof T,
                                                                     argumentIndex: number,
                                                                     additionalAssignmentValues?: any[]) {
    describe('as parameter decorator should execute passed error function if assigning', () => {
      performExpectFn(
          getThrowingFilterFn(typesOfProperty),
          getShouldExecutePassedErrorFunctionExpectFn(propertyKey,
              // @ts-ignore
              (value, c) => c[methodName](...getArgs(argumentIndex, value)), helperClass),
          additionalAssignmentValues
      );
    });
  }

  function getArgs(argumentIndex: number, value: any): any[] {
    const args: any[] = [];
    for (let i = 0; i <= argumentIndex; i++) {
      args.push(i === argumentIndex ? value : null);
    }
    return args;
  }
}