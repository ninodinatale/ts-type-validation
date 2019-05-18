import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsUnionOf } from '../../../src/validators/IsUnionOf';

describe('@IsUnionOf', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('any type', () => {
    describe('should not throw an error if assigning', () => {
      it('null', () => {
        TYPES['null'].forEach(value => expect(() => helperClass.stringOrBoolean = value as any).not.toThrowError());
      });
      it('undefined', () => {
        TYPES['undefined'].forEach(value => expect(() => helperClass.stringOrBoolean = value as any).not.toThrowError());
      });
    });
  });

  describe('string or boolean', () => {
    describe('should not throw an error if assigning', () => {
      it('string', () => {
        TYPES.string.forEach(value => expect(() => helperClass.stringOrBoolean = value).not.toThrowError());
      });
      it('boolean', () => {
        TYPES.boolean.forEach(value => expect(() => helperClass.stringOrBoolean = value).not.toThrowError());
      });
    });

    describe('should throw an error if assigning', () => {
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.stringOrBoolean = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.stringOrBoolean = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.stringOrBoolean = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.stringOrBoolean = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.stringOrBoolean = new TestClass1() as any).toThrowError();
      });
    });
  });

  describe('TestClass1 or string', () => {
    describe('should not throw an error if assigning', () => {
      it('string', () => {
        TYPES.string.forEach(value => expect(() => helperClass.testClass1OrString = value).not.toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.testClass1OrString = new TestClass1() as any).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('boolean', () => {
        TYPES.boolean.forEach(value => expect(() => helperClass.testClass1OrString = value).toThrowError());
      });
      it('Object', () => {
        TYPES.object.forEach(value => expect(() => helperClass.testClass1OrString = value).toThrowError());
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.testClass1OrString = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.testClass1OrString = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.testClass1OrString = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.testClass1OrString = value as any).toThrowError());
      });
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES)
        .filter(type => type[0] !== 'string' && type[0] !== 'boolean')
        .forEach(type => {
          type[1].forEach((value: any) => {
            helperClass.stringOrBooleanWithErrorFn = value;
            expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
          });
        });
  });
});

class TestClass1 {
}

class TestClass2 {
}

class HelperClass {
  @IsUnionOf(['string', 'boolean'])
  stringOrBoolean: string | boolean;

  @IsUnionOf([TestClass1, 'string'])
  testClass1OrString: TestClass1 | string;

  @IsUnionOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
  stringOrBooleanWithErrorFn: string | boolean;
}

