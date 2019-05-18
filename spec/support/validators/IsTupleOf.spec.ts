import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsTupleOf } from '../../../src/validators/IsTupleOf';

describe('@IsUnionOf', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('any type', () => {
    describe('should not throw an error if assigning', () => {
      it('null', () => {
        TYPES['null'].forEach(value => expect(() => helperClass.stringBoolean = value as any).not.toThrowError());
      });
      it('undefined', () => {
        TYPES['undefined'].forEach(value => expect(() => helperClass.stringBoolean = value as any).not.toThrowError());
      });
    });
    describe('should throw an error if assigning', () => {
      it('[null, boolean]', () => {
        expect(() => helperClass.stringBoolean = [null, TYPES.string[0]] as any).toThrowError();
      });
      it('[string, null]', () => {
        expect(() => helperClass.stringBoolean = [TYPES.string, null] as any).toThrowError();
      });
    });
  });

  describe('[string, boolean]', () => {
    describe('should not throw an error if assigning', () => {
      it('[string, boolean]', () => {
        expect(() => helperClass.stringBoolean = [TYPES.string[0], TYPES.boolean[0]]).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('[boolean, string]', () => {
        expect(() => helperClass.stringBoolean = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError();
      });
      it('[string, boolean, boolean]', () => {
        expect(() => helperClass.stringBoolean = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError();
      });
      it('[]', () => {
        expect(() => helperClass.stringBoolean = [] as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.stringBoolean = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.stringBoolean = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.stringBoolean = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.stringBoolean = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.stringBoolean = new TestClass1() as any).toThrowError();
      });
    });
  });

  describe('[TestClass1, number]', () => {
    describe('should not throw an error if assigning', () => {
      it('[TestClass1, number]', () => {
        expect(() => helperClass.testClass1Number = [new TestClass1(), TYPES.number[0]]).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('[Object, number]', () => {
        expect(() => helperClass.testClass1Number = [TYPES.object[0], TYPES.number[0]]).toThrowError();
      });
      it('[number, TestClass1]', () => {
        expect(() => helperClass.testClass1Number = [TYPES.number[0], new TestClass1()] as any).toThrowError();
      });
      it('[number, Object]', () => {
        expect(() => helperClass.testClass1Number = [TYPES.number[0], TYPES.object[0]]).toThrowError();
      });
      it('[boolean, string]', () => {
        expect(() => helperClass.testClass1Number = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError();
      });
      it('[string, boolean, boolean]', () => {
        expect(() => helperClass.testClass1Number = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError();
      });
      it('[]', () => {
        expect(() => helperClass.testClass1Number = [] as any).toThrowError();
      });
      it('boolean', () => {
        TYPES.boolean.forEach(value => expect(() => helperClass.testClass1Number = value as any).toThrowError());
      });
      it('Object', () => {
        TYPES.object.forEach(value => expect(() => helperClass.testClass1Number = value).toThrowError());
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.testClass1Number = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.testClass1Number = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.testClass1Number = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.testClass1Number = value as any).toThrowError());
      });
    });
  });

  describe('[Object, number]', () => {
    describe('should not throw an error if assigning', () => {
      it('[Object, number]', () => {
        expect(() => helperClass.objectNumber = [TYPES.object[0], TYPES.number[0]]).not.toThrowError();
      });
      it('[TestClass1, number]', () => {
        expect(() => helperClass.objectNumber = [new TestClass1(), TYPES.number[0]]).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('[number, Object]', () => {
        expect(() => helperClass.objectNumber = [TYPES.number[0], TYPES.object[0]]).toThrowError();
      });
      it('[boolean, string]', () => {
        expect(() => helperClass.objectNumber = [TYPES.boolean[0], TYPES.string[0]] as any).toThrowError();
      });
      it('[string, boolean, boolean]', () => {
        expect(() => helperClass.objectNumber = [TYPES.string[0], TYPES.boolean[0], TYPES.boolean[0]] as any).toThrowError();
      });
      it('[]', () => {
        expect(() => helperClass.objectNumber = [] as any).toThrowError();
      });
      it('boolean', () => {
        TYPES.boolean.forEach(value => expect(() => helperClass.objectNumber = value as any).toThrowError());
      });
      it('Object', () => {
        TYPES.object.forEach(value => expect(() => helperClass.objectNumber = value).toThrowError());
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.objectNumber = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.objectNumber = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.objectNumber = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.objectNumber = value as any).toThrowError());
      });
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES)
        .filter(type => type[0] !== 'string' && type[0] !== 'boolean')
        .forEach(type => {
          type[1].forEach((value: any) => {
            helperClass.stringBooleanWithErrorFn = value;
            expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
          });
        });
  });
});

class TestClass1 {
}

class HelperClass {
  @IsTupleOf(['string', 'boolean'])
  stringBoolean: [string, boolean];

  @IsTupleOf([TestClass1, 'number'])
  testClass1Number: [TestClass1, number];

  @IsTupleOf([Object, 'number'])
  objectNumber: [Object, number];

  @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
  stringBooleanWithErrorFn: [string, boolean];
}

