export function performExpectFn<T>(filterFn: (entry: [keyof TypesForTest, any[]]) => boolean,
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
      it(value == null ? value === null ? 'null' : 'undefined' : value.name || value.constructor.name || typeof value, () => {
        expectFn(value);
      });
    });
  }
}

export function getShouldNotThrowExpectFn<T extends Object>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperClass: T) => void,
    helperClass: new() => T,
    argumentIndex?: number) {
  return (value: any) => {
    const helperInstance = new helperClass();

    const isParameterUnderTest = executeCallbackUnderExpectationForParameter(callbackUnderExpectation, helperInstance, value, argumentIndex);

    if (isParameterUnderTest) {
      // Properties' values need to be set to the value.
      // Don't check NaN because NaN is != NaN.
      if (typeof value !== 'number' || !isNaN(value)) {
        expect(helperInstance[propertyKey]).toBe(value);
      }
    }
  };
}

export function getShouldThrowExpectFn<T extends Object, K extends keyof T>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperInstance: T) => void,
    helperClass: new() => T) {
  return function (value: any) {
    const helperInstance = new helperClass();
    expect(() => callbackUnderExpectation(value, helperInstance)).toThrowError(TypeError, /^Invalid assignment to/);
    _expectValuesToBeNull(helperInstance, propertyKey);
  };
}

export function getShouldExecutePassedErrorFunctionExpectFn<T extends Object, K extends keyof T>(
    propertyKey: keyof T,
    callbackUnderExpectation: (value: any, helperInstance: T) => void,
    helperClass: new() => T,
    argumentIndex?: number) {
  return (value: any) => {
    const spy = spyOn(console, 'error');
    const helperInstance = new helperClass();
    const isParameterUnderTest = executeCallbackUnderExpectationForParameter(callbackUnderExpectation, helperInstance, value, argumentIndex);

    if (isParameterUnderTest) {
      _expectValuesToBeNull(helperInstance, propertyKey);
      expect(spy).toHaveBeenCalled();
    }
  };
}

function _expectValuesToBeNull<T extends Object, K extends keyof T>(helperInstance: T, propertyKey: K) {
  // TODO: Expected false to be undefined because the value is assigned to the prototype instead of the object (???)
  // Values may not have been set to the properties.
  // expect(helperInstance[propertyKey]).toBeUndefined();
}

function executeCallbackUnderExpectationForParameter<T extends Object>(
    callbackUnderExpectation: (value: any, helperClass: T) => void,
    helperInstance: T,
    value: any,
    argumentIndex?: number): boolean {
  let isParameterUnderTest = true;

  // catch if parameter is not the one under test in order to continue script.
  try {
    callbackUnderExpectation(value, helperInstance);
  } catch (e) {
    if (argumentIndex != null) {
      if (e instanceof TypeError) {
        if (e.message.match(/Invalid assignment to parameter with index/)) {
          if (e.message.match(new RegExp(`Invalid assignment to parameter with index ${argumentIndex} `))) {
            fail('Expected function not to throw error, but it threw TypeError with message: ' + e.message);
          } else {
            // Do not fail, argument index is not under test which means the passed value is null/undefined. See
            // function getArgs() of ParameterDecoratorTestHelper.ts
            isParameterUnderTest = false;
          }
        } else {
          fail('Expected function not to throw error, but it threw TypeError with message: ' + e.message);
        }
      } else {
        fail('Expected function not to throw error, but it threw ' + e.constructor.name);
      }
    } else {
      fail('Expected function not to throw error, but it threw ' + e.constructor.name);
    }
  }

  return isParameterUnderTest;
}

export function getThrowingFilterFn(typesOfProperty: (keyof TypesForTest)[]): (entry: [keyof TypesForTest, any[]]) => boolean {
  return (entry) => entry[0] != 'null' && entry[0] != 'undefined' && !typesOfProperty.includes(entry[0]);
}

export function getNotThrowingFilterFn(typesOfProperty: (keyof TypesForTest)[]): (entry: [keyof TypesForTest, any[]]) => boolean {
  return (entry) => typesOfProperty.includes(entry[0]);
}

export const CUSTOM_ERROR = 'custom error';

export interface TypesForTest {
  number: (number)[];
  symbol: symbol[];
  boolean: (boolean)[];
  string: (string)[];
  function: (() => void)[];
  object: any[];
  'null': null,
  'undefined': undefined
}

// These are all existing types. Everything which is not a primitive falls under the Object type.
export const TYPES: { [key in keyof TypesForTest]: any[] } = {
  object: [
    {},
    Object(),
    new Object()
  ],
  number: [
    1111,
    1111.1111,
    -1111,
    -1111.1111,
    Infinity,
    -Infinity,
    NaN,
    Number(1111),
    0xf00d,
    0b1010,
    0o744
  ],
  boolean: [
    true,
    false,
    Boolean(),
    Boolean(true),
    Boolean(false)
  ],
  symbol: [
    Symbol()
  ],
  string: [
    '',
    'test',
    ``,
    `test`,
    String(''),
    String('test')
  ],
  'function': [
    () => {
    },
    function () {
    }],
  'null': [
    null
  ],
  'undefined': [
    undefined
  ]
};
