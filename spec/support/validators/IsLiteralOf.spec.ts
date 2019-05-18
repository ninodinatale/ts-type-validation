import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsLiteralOf } from '../../../src/validators/IsLiteralOf';

describe('@IsLiteralOf', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('any type', () => {
    describe('should not throw an error if assigning', () => {
      it('null', () => {
        TYPES['null'].forEach(value => expect(() => helperClass.literal1 = value as any).not.toThrowError());
      });
      it('undefined', () => {
        TYPES['undefined'].forEach(value => expect(() => helperClass.literal1 = value as any).not.toThrowError());
      });
    });
  });

  describe('value1 | value2', () => {
    describe('should not throw an error if assigning', () => {
      it('value1', () => {
        expect(() => helperClass.literal1 = 'value1').not.toThrowError();
      });
      it('value2', () => {
        expect(() => helperClass.literal1 = 'value2').not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('VALUE1', () => {
        expect(() => helperClass.literal1 = 'VALUE1' as any).toThrowError();
      });
      it('anystring', () => {
        expect(() => helperClass.literal1 = 'anystring' as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.literal1 = value as any).toThrowError());
      });
      it('primitive number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.literal1 = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.literal1 = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.literal1 = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.literal1 = new TestClass1() as any).toThrowError();
      });
    });
  });

  describe('111 | 222', () => {
    describe('should not throw an error if assigning', () => {
      it('value1', () => {
        expect(() => helperClass.literal2 = 111).not.toThrowError();
      });
      it('value2', () => {
        expect(() => helperClass.literal2 = 222).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('"111"', () => {
        expect(() => helperClass.literal2 = '111' as any).toThrowError();
      });
      it('"222"', () => {
        expect(() => helperClass.literal2 = '222' as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.literal1 = value as any).toThrowError());
      });
      it('anynumber', () => {
        expect(() => helperClass.literal2 = 1 as any).toThrowError();
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.literal2 = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.literal2 = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.literal2 = new TestClass1() as any).toThrowError();
      });
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES)
        .filter(type => type[0] !== 'number')
        .forEach(type => {
          type[1].forEach((value: any) => {
            helperClass.invalidLiteralWIthCustomFn = value;
            expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
          });
        });
  });
});

class TestClass1 {
}

class HelperClass {
  @IsLiteralOf(['value1', 'value2'])
  literal1: 'value1' | 'value2';

  @IsLiteralOf([111, 222])
  literal2: 111 | 222;

  @IsLiteralOf([1, 2], () => console.error(CUSTOM_ERROR))
  invalidLiteralWIthCustomFn: 1 | 2
}

