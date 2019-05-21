import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsNumber } from '../../../src/validators';

describe('@IsNumber', () => {
  let helperClass: HelperClass;

  beforeEach(() => {
    helperClass = new HelperClass();
  });

  describe('as property decorator', () => {
    describe('should not throw an error if assigning', () => {
      it('number', () => {
        TYPES.number.forEach(value => expect(() => helperClass.number = value).not.toThrowError());
      });
      it('null', () => {
        TYPES['null'].forEach(value => expect(() => helperClass.number = value as any).not.toThrowError());
      });
      it('undefined', () => {
        TYPES['undefined'].forEach(value => expect(() => helperClass.number = value as any).not.toThrowError());
      });
    });

    describe('should throw an error if assigning', () => {
      it('Number', () => {
        expect(() => helperClass.number = new Number(1) as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('object', () => {
        TYPES.object.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('primitive string', () => {
        TYPES.string.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('primitive boolean', () => {
        TYPES.boolean.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.number = value as any).toThrowError());
      });
      it('TestClass', () => {
        expect(() => helperClass.number = new TestClass() as any).toThrowError();
      });
    });

    it('should execute passed error function', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      Object.entries(TYPES).filter(type => type[0] !== 'number').forEach(type => {
        type[1].forEach((value: any) => {
          helperClass.numberWithCustomErrorFn = value;
          expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
        });
      });
    });
  });
});

class TestClass {
}

class HelperClass {
  @IsNumber
  number: number;

  @IsNumber(() => console.error(CUSTOM_ERROR))
  numberWithCustomErrorFn: number;
}