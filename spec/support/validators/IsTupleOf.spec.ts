// import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator, TYPES, TypesForTest } from './helpers/test-helper';
// import { IsTupleOf } from '../../../src/validators';
// import { ValidateParams } from '../../../src/validators/ValidateParams';
//
// class TestClass {
// }
//
// class PropertyDecoratorHelperClass {
//   @IsTupleOf(['string', 'boolean'])
//   stringBoolean: [string, boolean];
//
//   @IsTupleOf([TestClass, 'number'])
//   testClass1Number: [TestClass, number];
//
//   @IsTupleOf([Object, 'number'])
//   objectNumber: [Object, number];
//
//   @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
//   stringBooleanWithErrorFn: [string, boolean];
//   invalidLiteralWIthCustomFn: 1 | 2;
// }
//
//
// class ParameterDecoratorHelperClass {
//   stringBoolean: [string, boolean];
//   testClass1Number: [TestClass, number];
//   objectNumber: [Object, number];
//   stringBooleanWithErrorFn: [string, boolean];
//
//   @ValidateParams()
//   testMethod(@IsTupleOf(['string', 'boolean']) stringBoolean: any,
//              @IsTupleOf([TestClass, 'number']) testClass1Number: any,
//              @IsTupleOf([Object, 'number']) objectNumber: any,
//              @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR)) stringBooleanWithErrorFn?: any): any {
//     this.stringBoolean = stringBoolean;
//     this.testClass1Number = testClass1Number;
//     this.objectNumber = objectNumber;
//     this.stringBooleanWithErrorFn = stringBooleanWithErrorFn;
//   }
// }
//
// const TYPE_UNDER_TEST: keyof TypesForTest = 'tuple';
// const CUSTOM_PROP_KEY_TUPLE1 = 'stringBoolean';
// const CUSTOM_PROP_KEY_TUPLE2 = 'testClass1Number';
// const CUSTOM_PROP_KEY_TUPLE3 = 'objectNumber';
// const CUSTOM_PROP_KEY_ERROR_FN = 'stringBooleanWithErrorFn';
// const METHOD_NAME = 'testMethod';
//
// describe('@IsTupleOf', () => {
//   describe('as property decorator', () => {
//     let helperClass: PropertyDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new PropertyDecoratorHelperClass();
//     });
//
//     describe('any type', () => {
//       describe('should throw an error if assigning', () => {
//         it('[null, boolean]', () => {
//           expect(() => helperClass.stringBoolean = [null, TYPES.string[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[string, null]', () => {
//           expect(() => helperClass.stringBoolean = [TYPES.string, null] as any).toThrowError('Invalid type!');
//         });
//       });
//     });
//
//     describe('[string, boolean]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[string, boolean]', () => {
//           expect(() => helperClass.stringBoolean = [TYPES.string[0], TYPES.boolean[0]]).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[boolean, string]', () => {
//           expect(() => helperClass.stringBoolean = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.stringBoolean = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[]', () => {
//           expect(() => helperClass.stringBoolean = [] as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE1,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('[TestClass1, number]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[TestClass1, number]', () => {
//           expect(() => helperClass.testClass1Number = [new TestClass(), TYPES.number[0]]).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[Object, number]', () => {
//           expect(() => helperClass.testClass1Number = [TYPES.object[0], TYPES.number[0]]).toThrowError('Invalid type!');
//         });
//         it('[number, TestClass1]', () => {
//           expect(() => helperClass.testClass1Number = [TYPES.number[0], new TestClass()] as any).toThrowError('Invalid type!');
//         });
//         it('[number, Object]', () => {
//           expect(() => helperClass.testClass1Number = [TYPES.number[0], TYPES.object[0]]).toThrowError('Invalid type!');
//         });
//         it('[boolean, string]', () => {
//           expect(() => helperClass.testClass1Number = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.testClass1Number = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[]', () => {
//           expect(() => helperClass.testClass1Number = [] as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE2,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('[Object, number]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[Object, number]', () => {
//           expect(() => helperClass.objectNumber = [TYPES.object[0], TYPES.number[0]]).not.toThrowError();
//         });
//         it('[TestClass1, number]', () => {
//           expect(() => helperClass.objectNumber = [new TestClass(), TYPES.number[0]]).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[number, Object]', () => {
//           expect(() => helperClass.objectNumber = [TYPES.number[0], TYPES.object[0]]).toThrowError('Invalid type!');
//         });
//         it('[boolean, string]', () => {
//           expect(() => helperClass.objectNumber = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.objectNumber = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError('Invalid type!');
//         });
//         it('[]', () => {
//           expect(() => helperClass.objectNumber = [] as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE3,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     PropertyDecorator.shouldExecutePassedErrorFunction(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//       additionalCustomValues: [new TestClass()],
//       customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//     });
//   });
//
//   describe('as parameter decorator', () => {
//     let helperClass: ParameterDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new ParameterDecoratorHelperClass();
//     });
//
//     describe('any type', () => {
//       describe('should throw an error if assigning', () => {
//         it('[null, boolean]', () => {
//           expect(() => helperClass.testMethod([null, TYPES.string[0]], null, null).toThrowError('Invalid type!'));
//         });
//         it('[string, null]', () => {
//           expect(() => helperClass.testMethod([TYPES.string[0], null], null, null).toThrowError('Invalid type!'));
//         });
//       });
//     });
//
//     describe('[string, boolean]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[string, boolean]', () => {
//           expect(() => helperClass.testMethod([TYPES.string[0], TYPES.boolean[0]], null, null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[boolean, string]', () => {
//           expect(() => helperClass.testMethod([TYPES.boolean[0], TYPES.string[0]], null, null).toThrowError('Invalid type!'));
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.testMethod([TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]], null, null).toThrowError('Invalid type!'));
//         });
//         it('[]', () => {
//           expect(() => helperClass.testMethod([], null, null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 0, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE1,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('[TestClass1, number]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[TestClass1, number]', () => {
//           expect(() => helperClass.testMethod(null, [new TestClass(), TYPES.number[0]], null).toThrowError('Invalid type!'));
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[Object, number]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.object[0], TYPES.number[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[number, TestClass1]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.number[0], new TestClass()], null).toThrowError('Invalid type!'));
//         });
//         it('[number, Object]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.number[0], TYPES.object[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[boolean, string]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.boolean[0], TYPES.string[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[]', () => {
//           expect(() => helperClass.testMethod(null, [], null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 1, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE2,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('[Object, number]', () => {
//       describe('should not throw an error if assigning', () => {
//         it('[Object, number]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.object[0], TYPES.number[0]], null).not.toThrowError());
//         });
//         it('[TestClass1, number]', () => {
//           expect(() => helperClass.testMethod(null, [new TestClass(), TYPES.number[0]], null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('[number, Object]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.number[0], TYPES.object[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[boolean, string]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.boolean[0], TYPES.string[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[string, boolean, boolean]', () => {
//           expect(() => helperClass.testMethod(null, [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]], null).toThrowError('Invalid type!'));
//         });
//         it('[]', () => {
//           expect(() => helperClass.testMethod(null, [], null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 2, {
//           customPropertyKey: CUSTOM_PROP_KEY_TUPLE3,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     ParameterDecorator.shouldExecutePassedErrorFunction(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 3, {
//       additionalCustomValues: [new TestClass()],
//       customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//     });
//   });
// });
//
