export const CUSTOM_ERROR = 'custom error';

interface TypesForTest {
  number: (number)[];
  symbol: symbol[];
  boolean: (boolean)[];
  string: (string)[];
  null: any[];
  function: (() => void)[];
  object: any[];
  undefined: undefined[];
  enum: [];
  literal: [];
  tuple: [];
  union: [];
}

// These are all existing types. Everything which is not a primitive falls under the Object type.
export const TYPES: {[key in keyof TypesForTest]: any[]} = {
  object: [
    {},
    Object(),
    new Object(),
    new Number(1),
    new String('1'),
    new Boolean(true)
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
    String('test'),
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
  ],
  enum: [],
  literal: [],
  tuple: [],
  union: []
};

// export function iterateTypesAndExecuteExpectation<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, expectFn: (value: any, typeUnderTest: keyof TypesForTest, clazz: T, propertyKey: keyof T) => void, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[], excludeTypes?: (keyof TypesForTest)[] }) {
//   Object.entries(TYPES)
//       .filter(entry => {
//         if (options && options.excludeTypes) {
//           // @ts-ignore
//           return !options.excludeTypes.includes(entry[0]);
//         } else {
//           return true;
//         }
//       })
//       .forEach(entry => {
//         const key: string = entry[0];
//         const values: any[] = entry[1];
//
//         values.forEach(value => {
//           it(key, () => {
//             // @ts-ignore
//             // value, typeUnderTest, clazz, propertyKey
//             expectFn(value, typeUnderTest, new helperClass(), options && options.customPropertyKey ? options.customPropertyKey : typeUnderTest);
//           });
//         });
//
//       });
//
//   if (options && options.additionalCustomValues) {
//     options.additionalCustomValues.forEach(value => {
//       it(value.name || value.constructor.name || typeof value, () => {
//         // @ts-ignore
//         expectFn(value, new helperClass(), options && options.customPropertyKey ? options.customPropertyKey : typeUnderTest);
//       });
//     });
//   }
// }
//
// export namespace PropertyDecorator {
//   export function shouldExecutePassedErrorFunction<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[] }) {
//     describe('should execute passed error function if assigning', () => {
//       let consoleErrorSpy: Spy;
//
//       beforeEach(() => {
//         consoleErrorSpy = spyOn(console, 'error');
//       });
//       iterateTypesAndExecuteExpectation(helperClass, 'number', (value, typeUnderTest, clazz, propertyKey) => {
//         if (propertyKey != null && value != null && typeof value != typeUnderTest) {
//           clazz[propertyKey] = value;
//           expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
//           expect(clazz[propertyKey] == null).toBe(true);
//           consoleErrorSpy.calls.reset();
//         }
//       }, Object.assign(options, {excludeTypes: ['null', 'undefined']}));
//
//     });
//   }
//
//   export function shouldNotThrowError<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[] }) {
//     iterateTypesAndExecuteExpectation(helperClass, typeUnderTest, (value, typeUnderTest, clazz, propertyKey) => {
//       if (typeof value == typeUnderTest || value == null) {
//         expect(() => clazz[propertyKey] = value).not.toThrowError();
//         // don't check NaN because NaN is != NaN
//         if (!isNaN(parseInt(value))) {
//           // @ts-ignore
//           expect(clazz[propertyKey]).toBe(value);
//         }
//       }
//     }, options);
//   }
//
//   export function shouldThrowError<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[], excludeTypes?: (keyof TypesForTest)[] }) {
//     iterateTypesAndExecuteExpectation(helperClass, typeUnderTest, (value, typeUnderTest, clazz, propertyKey) => {
//       // @ts-ignore
//       if (value != null && (options && options.excludeTypes && !options.excludeTypes.includes(typeUnderTest)) && (typeof value != typeUnderTest || typeUnderTest === 'enum' || typeUnderTest === 'literal' || typeUnderTest === 'tuple' || typeUnderTest === 'union')) {
//         expect(() => clazz[propertyKey] = value).toThrowError('Invalid type!');
//         expect(clazz[propertyKey] == null).toBe(true);
//       }
//     }, options);
//   }
// }
//
// export namespace ParameterDecorator {
//   export function shouldExecutePassedErrorFunction<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, methodName: keyof T, argumentIndex: number, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[] }) {
//     describe('should execute passed error function if assigning', () => {
//       let consoleErrorSpy: Spy;
//
//       beforeEach(() => {
//         consoleErrorSpy = spyOn(console, 'error');
//       });
//       iterateTypesAndExecuteExpectation(helperClass, 'number', (value, typeUnderTest, clazz, propertyKey) => {
//         if (propertyKey != null && value != null && typeof value != typeUnderTest) {
//           const args = [];
//           for (let i = 0; i <= argumentIndex; i++) {
//             args.push(i === argumentIndex ? value : null);
//           }
//           // @ts-ignore
//           clazz[methodName](...args);
//           expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
//           expect(clazz[propertyKey] == null).toBe(true);
//           consoleErrorSpy.calls.reset();
//         }
//       }, options);
//
//     });
//   }
//
//   export function shouldNotThrowError<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, methodName: keyof T, argumentIndex: number, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[] }) {
//     iterateTypesAndExecuteExpectation(helperClass, typeUnderTest, (value, typeUnderTest, clazz, propertyKey) => {
//       if (typeof value == typeUnderTest || typeUnderTest == null) {
//         const args: any[] = [];
//         for (let i = 0; i <= argumentIndex; i++) {
//           args.push(i === argumentIndex ? value : null);
//         }
//         // @ts-ignore
//         expect(() => clazz[methodName](...args)).not.toThrowError();
//         // don't check NaN because NaN is != NaN
//         if (!isNaN(parseInt(value))) {
//           // @ts-ignore
//           expect(clazz[propertyKey]).toBe(value);
//         }
//       }
//     }, options);
//   }
//
//   export function shouldThrowError<T extends Object>(helperClass: { new(): T; }, typeUnderTest: keyof TypesForTest, methodName: keyof T, argumentIndex: number, options?: { customPropertyKey?: keyof T, additionalCustomValues?: any[], excludeTypes?: (keyof TypesForTest)[] }) {
//     iterateTypesAndExecuteExpectation(helperClass, typeUnderTest, (value, typeUnderTest, clazz, propertyKey) => {
//       // @ts-ignore
//       if (value != null && (options && options.excludeTypes && !options.excludeTypes.includes(typeUnderTest)) && (typeof value != typeUnderTest || typeUnderTest === 'enum' || typeUnderTest === 'literal' || typeUnderTest === 'tuple' || typeUnderTest === 'union')) {
//         const args: any[] = [];
//         for (let i = 0; i <= argumentIndex; i++) {
//           args.push(i === argumentIndex ? value : null);
//         }
//         // @ts-ignore
//         expect(() => clazz[methodName](...args)).toThrowError('Invalid type!');
//         expect(clazz[propertyKey]).toBeUndefined();
//       }
//     }, options);
//   }
// }