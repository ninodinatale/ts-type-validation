import { TYPES, TypesForTest } from './test-helper';
import { TYPE_ERROR_MESSASGE } from '../../../../src/core/errors';


// TODO remove from here?
export const CUSTOM_ERROR = 'custom error';

export namespace PropertyDecorator {

  // TODO typesOfProperty should not be an array anymore
  export function shouldNotThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                        helperClass: new() => T,
                                                        propertyKey: keyof T,
                                                        additionalAssignmentValues?: any[]) {
    describe('as property decorator should not throw an error if assigning', () => {
      _performExpectFn(
          _getNotThrowingFilterFn(typesOfProperty),
          _getShouldNotThrowExpectFn(propertyKey, (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                     helperClass: new() => T,
                                                     propertyKey: keyof T,
                                                     additionalAssignmentValues?: any[]) {
    describe('as property decorator should throw an error if assigning', () => {
      _performExpectFn(
          _getThrowingFilterFn(typesOfProperty),
          _getShouldThrowExpectFn(propertyKey, (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }

  export function shouldExecutePassedErrorFunction<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                                     helperClass: { new(): T; },
                                                                     propertyKey: keyof T,
                                                                     additionalAssignmentValues?: any[]) {
    describe('as property decorator should execute passed error function if assigning', () => {
      _performExpectFn(
          _getThrowingFilterFn(typesOfProperty),
          _getShouldExecutePassedErrorFunctionExpectFn(
              propertyKey,
              (value, c) => c[propertyKey] = value, helperClass),
          additionalAssignmentValues
      );
    });
  }
}

export namespace ParameterDecorator {
  export function shouldNotThrowError<T extends Object>(typesOfProperty: (keyof TypesForTest)[],
                                                        helperClass: new() => T,
                                                        propertyKey: keyof T,
                                                        methodName: keyof T,
                                                        argumentIndex: number,
                                                        additionalAssignmentValues?: any[]) {
    describe('as parameter decorator should not throw an error if assigning', () => {
      _performExpectFn(
          _getNotThrowingFilterFn(typesOfProperty),
          // @ts-ignore
          _getShouldNotThrowExpectFn(propertyKey, (value, c) => c[methodName](...getArgs(argumentIndex, value)), helperClass),
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
      _performExpectFn(
          _getThrowingFilterFn(typesOfProperty),
          // @ts-ignore
          _getShouldThrowExpectFn(propertyKey, (value, c) => c[methodName](...getArgs(argumentIndex, value)), helperClass),
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
      _performExpectFn(
          _getThrowingFilterFn(typesOfProperty),
          _getShouldExecutePassedErrorFunctionExpectFn(propertyKey,
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

function _performExpectFn<T>(filterFn: (entry: [keyof TypesForTest, any[]]) => boolean,
                             expectFn: (value: any) => void,
                             additionalAssignmentValues?: any[]) {
  Object.entries(TYPES)
      // @ts-ignore
      .filter(entries => filterFn(entries))
      .forEach(entry => {
        const key: string = entry[0];
        const values: any[] = entry[1];

        values.forEach(value => {
          it(key, () => {
            expectFn(value);
          });
        });

      });

  if (additionalAssignmentValues) {
    additionalAssignmentValues.forEach(value => {
      it(value.name || value.constructor.name || typeof value, () => {
        expectFn(value);
      });
    });
  }
}

function _getShouldNotThrowExpectFn<T extends Object>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperClass: T) => void,
    helperClass: new() => T) {
  return (value: any) => {
    const helperInstance = new helperClass();
    expect(() => callbackUnderExpectation(value, helperInstance)).not.toThrowError();

    // Properties' values need to be set to the value.
    // Don't check NaN because NaN is != NaN.
    if (typeof value !== 'number' || !isNaN(value)) {
      expect(helperInstance[propertyKey]).toBe(value);
    }
  };
}

function _getShouldThrowExpectFn<T extends Object, K extends keyof T>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperInstance: T) => void,
    helperClass: new() => T) {
  return function (value: any) {
    const helperInstance = new helperClass();
    expect(() => callbackUnderExpectation(value, helperInstance)).toThrowError(TYPE_ERROR_MESSASGE);

    // TODO Expected false to be undefined because the value is assigned to the prototype instead of the object???
    // expect(helperInstance[propertyKey]).toBeUndefined();
    // _expectValuesToBeNull(helperInstance, propertyKey);
  };
}

function _getShouldExecutePassedErrorFunctionExpectFn<T extends Object, K extends keyof T>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperInstance: T) => void,
    helperClass: new() => T) {
  return (value: any) => {
    const spy = spyOn(console, 'error');
    const helperInstance = new helperClass();
    expect(() => callbackUnderExpectation(value, helperInstance)).not.toThrowError();

    // Values may not have been set to the properties.
    // TODO Expected false to be undefined because the value is assigned to the prototype instead of the object???
    // _expectValuesToBeNull(helperInstance, propertyKey);

    expect(spy).toHaveBeenCalled();
  };
}

function _expectValuesToBeNull<T extends Object, K extends keyof T>(helperInstance: T, propertyKey: K) {
  // Values may not have been set to the properties.
  // expect(helperInstance[propertyKey]).toBeUndefined();
}

function _getThrowingFilterFn(typesOfProperty: (keyof TypesForTest)[]): (entry: [keyof TypesForTest, any[]]) => boolean {
  // TODO this tslint is because null and undefined has been removed from TypesForTest (correct?)
  // @ts-ignore
  return (entry) => entry[0] != 'null' && entry[0] != 'undefined' && !typesOfProperty.includes(entry[0]);
}

function _getNotThrowingFilterFn(typesOfProperty: (keyof TypesForTest)[]): (entry: [keyof TypesForTest, any[]]) => boolean {
  return (entry) => typesOfProperty.includes(entry[0]);
}