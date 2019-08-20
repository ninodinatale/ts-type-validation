// import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator, TYPES, TypesForTest } from './helpers/test-helper';
// import { IsTupleOf, IsUnionOf } from '../../../src/validators';
// import { ValidateParams } from '../../../src/validators/ValidateParams';
//
// class TestClass {
// }
//
// class PropertyDecoratorHelperClass {
//   @IsUnionOf(['string', 'boolean'])
//   stringOrBoolean: string | boolean;
//
//   @IsUnionOf([TestClass, 'string'])
//   testClass1OrString: TestClass | string;
//
//   @IsUnionOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
//   stringOrBooleanWithErrorFn: string | boolean;
// }
//
//
// class ParameterDecoratorHelperClass {
//   stringOrBoolean: string | boolean;
//   testClass1OrString: TestClass | string;
//   stringOrBooleanWithErrorFn: string | boolean;
//
//   @ValidateParams()
//   testMethod(@IsTupleOf(['string', 'boolean']) stringOrBoolean: any,
//              @IsTupleOf([TestClass, 'string']) testClass1OrString: any,
//              @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR)) stringOrBooleanWithErrorFn?: any): any {
//     this.stringOrBoolean = stringOrBoolean;
//     this.testClass1OrString = testClass1OrString;
//     this.stringOrBooleanWithErrorFn = stringOrBooleanWithErrorFn;
//   }
// }
//
// const TYPE_UNDER_TEST: keyof TypesForTest = 'union';
// const CUSTOM_PROP_KEY_UNION1 = 'stringOrBoolean';
// const CUSTOM_PROP_KEY_UNION2 = 'testClass1OrString';
// const CUSTOM_PROP_KEY_ERROR_FN = 'stringOrBooleanWithErrorFn';
// const METHOD_NAME = 'testMethod';
//
//
// describe('@IsUnionOf', () => {
//   describe('as property decorator', () => {
//     let helperClass: PropertyDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new PropertyDecoratorHelperClass();
//     });
//
//     describe('string or boolean', () => {
//       describe('should not throw an error if assigning', () => {
//         it('string', () => {
//           TYPES.string.forEach(value => expect(() => helperClass.stringOrBoolean = value).not.toThrowError());
//         });
//         it('boolean', () => {
//           TYPES.boolean.forEach(value => expect(() => helperClass.stringOrBoolean = value).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_UNION1,
//           additionalCustomValues: [
//             new TestClass()
//           ],
//           excludeTypes: ['string', 'boolean', 'null', 'undefined']
//         });
//       });
//     });
//
//     describe('TestClass or string', () => {
//       describe('should not throw an error if assigning', () => {
//         it('string', () => {
//           TYPES.string.forEach(value => expect(() => helperClass.testClass1OrString = value).not.toThrowError());
//         });
//         it('TestClass', () => {
//           expect(() => helperClass.testClass1OrString = new TestClass() as any).not.toThrowError();
//         });
//       });
//
//       // TODO this should fail for string... ?
//       PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//         customPropertyKey: CUSTOM_PROP_KEY_UNION2,
//         excludeTypes: ['string']
//       });
//     });
//   });
//
//   PropertyDecorator.shouldExecutePassedErrorFunction(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//     additionalCustomValues: [new TestClass()],
//     customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//   });
//
//   describe('as parameter decorator', () => {
//     let helperClass: ParameterDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new ParameterDecoratorHelperClass();
//     });
//
//     describe('string or boolean', () => {
//       describe('should not throw an error if assigning', () => {
//         it('string', () => {
//           TYPES.string.forEach(value => expect(() => helperClass.testMethod(value, null, null)).not.toThrowError());
//         });
//         it('boolean', () => {
//           TYPES.boolean.forEach(value => expect(() => helperClass.testMethod(value, null, null)).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         // TODO this should fail for string and boolean... ?
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 0, {
//           customPropertyKey: CUSTOM_PROP_KEY_UNION1,
//           additionalCustomValues: [
//             new TestClass()
//           ],
//           excludeTypes: ['string', 'boolean']
//         });
//       });
//     });
//
//     describe('TestClass or string', () => {
//       describe('should not throw an error if assigning', () => {
//         it('string', () => {
//           TYPES.string.forEach(value => expect(() => helperClass.testMethod(null, value, null)).not.toThrowError());
//         });
//         it('TestClass', () => {
//           expect(() => helperClass.testMethod(null, new TestClass(), null)).not.toThrowError();
//         });
//       });
//
//       // TODO this should fail for string... ?
//       ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 1, {
//         customPropertyKey: CUSTOM_PROP_KEY_UNION2,
//         excludeTypes: ['string']
//       });
//     });
//   });
//
//   ParameterDecorator.shouldExecutePassedErrorFunction(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 2, {
//     additionalCustomValues: [new TestClass()],
//     customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//   });
// });
//
