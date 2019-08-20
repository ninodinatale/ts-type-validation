// import { IsLiteralOf } from '../../../src/validators';
// import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator, TypesForTest } from './helpers/test-helper';
// import { ValidateParams } from '../../../src/validators/ValidateParams';
//
// class TestClass {
// }
//
// class PropertyDecoratorHelperClass {
//   @IsLiteralOf(['value1', 'value2'])
//   literal1: 'value1' | 'value2';
//
//   @IsLiteralOf([111, 222])
//   literal2: 111 | 222;
//
//   @IsLiteralOf([1, 2], () => console.error(CUSTOM_ERROR))
//   invalidLiteralWIthCustomFn: 1 | 2;
// }
//
//
// class ParameterDecoratorHelperClass {
//   literal1: 'value1' | 'value2';
//
//   literal2: 111 | 222;
//   invalidLiteralWIthCustomFn: 1 | 2;
//
//   @ValidateParams()
//   testMethod(@IsLiteralOf(['value1', 'value2']) literal1: any,
//              @IsLiteralOf([111, 222]) literal2: any,
//              @IsLiteralOf([1, 2], () => console.error(CUSTOM_ERROR)) invalidLiteralWIthCustomFn?: any): any {
//     this.literal1 = literal1;
//     this.literal2 = literal2;
//     this.invalidLiteralWIthCustomFn = invalidLiteralWIthCustomFn;
//   }
// }
//
// const TYPE_UNDER_TEST: keyof TypesForTest = 'literal';
// const CUSTOM_PROP_KEY_LITERAL1 = 'literal1';
// const CUSTOM_PROP_KEY_LITERAL2 = 'literal2';
// const CUSTOM_PROP_KEY_ERROR_FN = 'invalidLiteralWIthCustomFn';
// const METHOD_NAME = 'testMethod';
//
//
// describe('@IsLiteralOf', () => {
//   describe('as property decorator', () => {
//     let helperClass: PropertyDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new PropertyDecoratorHelperClass();
//     });
//
//     describe('value1 | value2', () => {
//       describe('should not throw an error if assigning', () => {
//         it('value1', () => {
//           expect(() => helperClass.literal1 = 'value1').not.toThrowError();
//         });
//         it('value2', () => {
//           expect(() => helperClass.literal1 = 'value2').not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('VALUE1', () => {
//           expect(() => helperClass.literal1 = 'VALUE1' as any).toThrowError('Invalid type!');
//         });
//         it('anystring', () => {
//           expect(() => helperClass.literal1 = 'anystring' as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_LITERAL1,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('111 | 222', () => {
//       describe('should not throw an error if assigning', () => {
//         it('value1', () => {
//           expect(() => helperClass.literal2 = 111).not.toThrowError();
//         });
//         it('value2', () => {
//           expect(() => helperClass.literal2 = 222).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('"111"', () => {
//           expect(() => helperClass.literal2 = '111' as any).toThrowError('Invalid type!');
//         });
//         it('"222"', () => {
//           expect(() => helperClass.literal2 = '222' as any).toThrowError('Invalid type!');
//         });
//         it('anynumber', () => {
//           expect(() => helperClass.literal2 = 1 as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_LITERAL2,
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
//     describe('value1 | value2', () => {
//       describe('should not throw an error if assigning', () => {
//         it('value1', () => {
//           expect(() => helperClass.testMethod('value1', null, null).not.toThrowError());
//         });
//         it('value2', () => {
//           expect(() => helperClass.testMethod('value2', null, null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('VALUE1', () => {
//           expect(() => helperClass.testMethod('VALUE1', null, null).toThrowError('Invalid type!'));
//         });
//         it('anystring', () => {
//           expect(() => helperClass.testMethod('anystring', null, null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 0, {
//           customPropertyKey: CUSTOM_PROP_KEY_LITERAL1,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('111 | 222', () => {
//       describe('should not throw an error if assigning', () => {
//         it('value1', () => {
//           expect(() => helperClass.testMethod(null, 111, null).not.toThrowError());
//         });
//         it('value2', () => {
//           expect(() => helperClass.testMethod(null, 222, null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('"111"', () => {
//           expect(() => helperClass.testMethod(null, '111', null).toThrowError('Invalid type!'));
//         });
//         it('"222"', () => {
//           expect(() => helperClass.testMethod(null, '222', null).toThrowError('Invalid type!'));
//         });
//         it('anynumber', () => {
//           expect(() => helperClass.testMethod(null, 1, null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 1, {
//           customPropertyKey: CUSTOM_PROP_KEY_LITERAL2,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//     ParameterDecorator.shouldExecutePassedErrorFunction(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 2, {
//       additionalCustomValues: [new TestClass()],
//       customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//     });
//   });
// });
//
