// import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator, TypesForTest } from './helpers/test-helper';
// import { IsEnumOf } from '../../../src/validators';
// import { ValidateParams } from '../../../src/validators/ValidateParams';
//
// class TestClass {
// }
//
// enum NumberBasedEnum {
//   Value1,
//   Value2,
//   Value3,
// }
//
// enum StringBasedEnum {
//   Value1 = 'VALUE1',
//   Value2 = 'VALUE2',
//   Value3 = 'VALUE3',
// }
//
// class PropertyDecoratorHelperClass {
//   @IsEnumOf(NumberBasedEnum)
//   numberBasedEnum: NumberBasedEnum;
//
//   @IsEnumOf(StringBasedEnum)
//   stringBasedEnum: StringBasedEnum;
//
//   @IsEnumOf(NumberBasedEnum, () => console.error(CUSTOM_ERROR))
//   numberBasedEnumWithCustomErrorFn: string;
// }
//
// class ParameterDecoratorHelperClass {
//   numberBasedEnum: NumberBasedEnum;
//   stringBasedEnum: StringBasedEnum;
//   numberBasedEnumWithCustomErrorFn: NumberBasedEnum;
//
//   @ValidateParams()
//   testMethod(@IsEnumOf(NumberBasedEnum) numberBasedEnum: any,
//              @IsEnumOf(StringBasedEnum) stringBasedEnum: any,
//              @IsEnumOf(NumberBasedEnum, () => console.error(CUSTOM_ERROR)) numberBasedEnumWithCustomErrorFn?: any): any {
//     this.numberBasedEnum = numberBasedEnum;
//     this.stringBasedEnum = stringBasedEnum;
//     this.numberBasedEnumWithCustomErrorFn = numberBasedEnumWithCustomErrorFn;
//   }
// }
//
// const TYPE_UNDER_TEST: keyof TypesForTest = 'enum';
// const CUSTOM_PROP_KEY_NUMBER_BASED = 'numberBasedEnum';
// const CUSTOM_PROP_KEY_STRING_BASED = 'stringBasedEnum';
// const CUSTOM_PROP_KEY_ERROR_FN = 'numberBasedEnumWithCustomErrorFn';
// const METHOD_NAME = 'testMethod';
//
// describe('@IsEnumOf', () => {
//
//   describe('as property decorator', () => {
//     let helperClass: PropertyDecoratorHelperClass;
//
//     beforeAll(() => {
//       helperClass = new PropertyDecoratorHelperClass();
//     });
//
//     describe('NumberBasedEnum', () => {
//       describe('should not throw an error if assigning', () => {
//         it('NumberBasedEnum.Value1', () => {
//           expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value1).not.toThrowError();
//         });
//         it('NumberBasedEnum.Value2', () => {
//           expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value2).not.toThrowError();
//         });
//         it('NumberBasedEnum.Value3', () => {
//           expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value3).not.toThrowError();
//         });
//         it('0, 1 or 2', () => {
//           expect(() => helperClass.numberBasedEnum = 0).not.toThrowError();
//           expect(() => helperClass.numberBasedEnum = 1).not.toThrowError();
//           expect(() => helperClass.numberBasedEnum = 2).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('number greater than 2', () => {
//           expect(() => helperClass.numberBasedEnum = 3).toThrowError('Invalid type!');
//           expect(() => helperClass.numberBasedEnum = 4).toThrowError('Invalid type!');
//           expect(() => helperClass.numberBasedEnum = 99999).toThrowError('Invalid type!');
//         });
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value1 as any).toThrowError('Invalid type!');
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value2 as any).toThrowError('Invalid type!');
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value3 as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_NUMBER_BASED,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('StringBasedEnum', () => {
//       describe('should not throw an error if assigning', () => {
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value1).not.toThrowError();
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value2).not.toThrowError();
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value3).not.toThrowError();
//         });
//         it('VALUE1, VALUE2 or VALUE2', () => {
//           expect(() => helperClass.stringBasedEnum = 'VALUE1' as any).not.toThrowError();
//           expect(() => helperClass.stringBasedEnum = 'VALUE2' as any).not.toThrowError();
//           expect(() => helperClass.stringBasedEnum = 'VALUE3' as any).not.toThrowError();
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value1 as any).toThrowError('Invalid type!');
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value2 as any).toThrowError('Invalid type!');
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value3 as any).toThrowError('Invalid type!');
//         });
//         it('0, 1 or 2', () => {
//           expect(() => helperClass.stringBasedEnum = 0 as any).toThrowError('Invalid type!');
//           expect(() => helperClass.stringBasedEnum = 1 as any).toThrowError('Invalid type!');
//           expect(() => helperClass.stringBasedEnum = 2 as any).toThrowError('Invalid type!');
//         });
//         it('number greater than 2', () => {
//           expect(() => helperClass.stringBasedEnum = 'VALUE4' as any).toThrowError('Invalid type!');
//           expect(() => helperClass.stringBasedEnum = 'VALUE5' as any).toThrowError('Invalid type!');
//           expect(() => helperClass.stringBasedEnum = 'VALUE6' as any).toThrowError('Invalid type!');
//         });
//         PropertyDecorator.shouldThrowError(PropertyDecoratorHelperClass, TYPE_UNDER_TEST, {
//           customPropertyKey: CUSTOM_PROP_KEY_STRING_BASED,
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
//     describe('NumberBasedEnum', () => {
//       describe('should not throw an error if assigning', () => {
//         it('NumberBasedEnum.Value1', () => {
//           expect(() => helperClass.testMethod(NumberBasedEnum.Value1, null, null).not.toThrowError());
//         });
//         it('NumberBasedEnum.Value2', () => {
//           expect(() => helperClass.testMethod(NumberBasedEnum.Value2, null, null).not.toThrowError());
//         });
//         it('NumberBasedEnum.Value3', () => {
//           expect(() => helperClass.testMethod(NumberBasedEnum.Value3, null, null).not.toThrowError());
//         });
//         it('0, 1 or 2', () => {
//           expect(() => helperClass.testMethod(0, null, null).not.toThrowError());
//           expect(() => helperClass.testMethod(1, null, null).not.toThrowError());
//           expect(() => helperClass.testMethod(2, null, null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('number greater than 2', () => {
//           expect(() => helperClass.testMethod(3, null, null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(4, null, null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(99999, null, null).toThrowError('Invalid type!'));
//         });
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.testMethod(StringBasedEnum.Value1, null, null).toThrowError('Invalid type!'));
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.testMethod(StringBasedEnum.Value2, null, null).toThrowError('Invalid type!'));
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.testMethod(StringBasedEnum.Value3, null, null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 0, {
//           customPropertyKey: CUSTOM_PROP_KEY_NUMBER_BASED,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     describe('StringBasedEnum', () => {
//       describe('should not throw an error if assigning', () => {
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.testMethod(null, StringBasedEnum.Value1, null).not.toThrowError());
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.testMethod(null, StringBasedEnum.Value2, null).not.toThrowError());
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.testMethod(null, StringBasedEnum.Value3, null).not.toThrowError());
//         });
//         it('VALUE1, VALUE2 or VALUE3', () => {
//           expect(() => helperClass.testMethod(null, 'VALUE1', null).not.toThrowError());
//           expect(() => helperClass.testMethod(null, 'VALUE2', null).not.toThrowError());
//           expect(() => helperClass.testMethod(null, 'VALUE3', null).not.toThrowError());
//         });
//       });
//
//       describe('should throw an error if assigning', () => {
//         it('StringBasedEnum.Value1', () => {
//           expect(() => helperClass.testMethod(null, NumberBasedEnum.Value1, null).toThrowError('Invalid type!'));
//         });
//         it('StringBasedEnum.Value2', () => {
//           expect(() => helperClass.testMethod(null, NumberBasedEnum.Value2, null).toThrowError('Invalid type!'));
//         });
//         it('StringBasedEnum.Value3', () => {
//           expect(() => helperClass.testMethod(null, NumberBasedEnum.Value3, null).toThrowError('Invalid type!'));
//         });
//         it('0, 1 or 2', () => {
//           expect(() => helperClass.testMethod(null, 0, null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(null, 1, null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(null, 2, null).toThrowError('Invalid type!'));
//         });
//         it('number greater than 2', () => {
//           expect(() => helperClass.testMethod(null, 'VALUE4', null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(null, 'VALUE5', null).toThrowError('Invalid type!'));
//           expect(() => helperClass.testMethod(null, 'VALUE6', null).toThrowError('Invalid type!'));
//         });
//         ParameterDecorator.shouldThrowError(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 1, {
//           customPropertyKey: CUSTOM_PROP_KEY_STRING_BASED,
//           additionalCustomValues: [
//             new TestClass()
//           ]
//         });
//       });
//     });
//
//     ParameterDecorator.shouldExecutePassedErrorFunction(ParameterDecoratorHelperClass, TYPE_UNDER_TEST, METHOD_NAME, 2, {
//       additionalCustomValues: [new TestClass()],
//       customPropertyKey: CUSTOM_PROP_KEY_ERROR_FN
//     });
//   });
// });
