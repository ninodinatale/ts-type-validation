import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsObject } from '../../../src/validators';

describe('@IsObject', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('should not throw an error if assigning', () => {
    it('object', () => {
      TYPES.object.forEach(value => expect(() => helperClass.object = value).not.toThrowError());
    });
    it('DummyClass', () => {
      expect(() => helperClass.dummyClass = new TestClass1() as any).not.toThrowError();
    });
    it('ExtendingDummyClass', () => {
      expect(() => helperClass.extendingTestClass1 = new TestClass2ExtendingTestClass1() as any).not.toThrowError();
    });
    it('null', () => {
      TYPES['null'].forEach(value => expect(() => helperClass.object = value as any).not.toThrowError());
    });
    it('undefined', () => {
      TYPES['undefined'].forEach(value => expect(() => helperClass.object = value as any).not.toThrowError());
    });
  });

  describe('should throw an error if assigning', () => {
    it('primitive object', () => {
      TYPES.primitiveObject.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('string', () => {
      TYPES.string.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('primitive number', () => {
      TYPES.number.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('primitive boolean', () => {
      TYPES.boolean.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('primitive symbol', () => {
      TYPES.symbol.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('function', () => {
      TYPES.function.forEach(value => expect(() => helperClass.object = value as any).toThrowError());
    });
    it('NotExtendingTestClass1', () => {
      expect(() => helperClass.notExtendingTestClass1 = new TestClass1() as any).toThrowError();
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES).filter(type => type[0] !== 'object').forEach(type => {
      type[1].forEach((value: any) => {
        helperClass.objectWithCustomErrorFn = value;
        expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
      });
    });
  });
});

class TestClass1 {
}

class TestClass2ExtendingTestClass1 extends TestClass1 {
}

class HelperClass {
  @IsObject(Object)
  object: Object;

  @IsObject(Object, () => console.error(CUSTOM_ERROR))
  objectWithCustomErrorFn: Object;

  @IsObject(TestClass1)
  dummyClass: TestClass1;

  @IsObject(TestClass1)
  extendingTestClass1: TestClass2ExtendingTestClass1;

  @IsObject(TestClass2ExtendingTestClass1)
  notExtendingTestClass1: TestClass1;
}

