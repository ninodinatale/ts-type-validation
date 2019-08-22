// import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
// import { IsTupleOf } from '../../../src/validators/IsTupleOf';
// import { IsIntersectionOf } from '../../../src/validators/IsIntersectionOf';
//
// /**
//  * Not working. {@see IsIntersectionOf}
//  */
// xdescribe('@IsIntersectionOf', () => {
//   let helperClass: HelperClass;
//
//   beforeAll(() => {
//     helperClass = new HelperClass();
//   });
//
//   describe('any type', () => {
//     describe('should not throw an error if assigning', () => {
//       it('null', () => {
//         TYPES['null'].forEach(value => expect(() => helperClass.testClass1AndTestClass2 = value as any).not.toThrowError());
//       });
//       it('undefined', () => {
//         TYPES['undefined'].forEach(value => expect(() => helperClass.testClass1AndTestClass2 = value as any).not.toThrowError());
//       });
//     });
//   });
//
//   describe('TestClass1 & TestClass2', () => {
//     describe('should not throw an error if assigning', () => {
//       it('ValidIntersectionClass', () => {
//         expect(() => helperClass.testClass1AndTestClass2 = new ValidIntersectionClass()).not.toThrowError();
//       });
//     });
//
//     describe('should throw an error if assigning', () => {
//       it('TestClass1', () => {
//         expect(() => helperClass.testClass1AndTestClass2 = new TestClass1() as any).toThrowError('Invalid type!');
//       });
//     });
//   });
//
//   it('should execute passed error function', () => {
//     const consoleErrorSpy = spyOn(console, 'error');
//     Object.entries(TYPES)
//         .filter(type => type[0] !== 'string' && type[0] !== 'boolean')
//         .forEach(type => {
//           type[1].forEach((value: any) => {
//             helperClass.stringBooleanWithErrorFn = value;
//             expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
//           });
//         });
//   });
// });
//
// class TestClass1 {
//   a: any;
//   b: any;
//   c: any;
// }
//
// class TestClass2 {
//   d: any;
//   e: any;
//   f: any;
// }
//
// class ValidIntersectionClass {
//   a: any;
//   b: any;
//   c: any;
//   d: any;
//   e: any;
//   f: any;
// }
//
// class HelperClass {
//   @IsIntersectionOf([TestClass1, TestClass2])
//   testClass1AndTestClass2: TestClass1 & TestClass2;
//
//   @IsIntersectionOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
//   stringBooleanWithErrorFn: [string, boolean];
// }
//
