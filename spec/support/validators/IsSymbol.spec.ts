import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsSymbol } from '../../../src/validators';

describe('@IsSymbol', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('should not throw an error if assigning', () => {
    it('symbol', () => {
      TYPES.symbol.forEach(value => expect(() => helperClass.symbol = value).not.toThrowError());
    });
    it('null', () => {
      TYPES['null'].forEach(value => expect(() => helperClass.symbol = value as any).not.toThrowError());
    });
    it('undefined', () => {
      TYPES['undefined'].forEach(value => expect(() => helperClass.symbol = value as any).not.toThrowError());
    });
  });

  describe('should throw an error if assigning', () => {
    it('primitive object', () => {
      TYPES.primitiveObject.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('object', () => {
      TYPES.object.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('primitive number', () => {
      TYPES.number.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('primitive boolean', () => {
      TYPES.boolean.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('primitive string', () => {
      TYPES.string.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('function', () => {
      TYPES.function.forEach(value => expect(() => helperClass.symbol = value as any).toThrowError());
    });
    it('TestClass', () => {
      expect(() => helperClass.symbol = new TestClass() as any).toThrowError();
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES).filter(type => type[0] !== 'symbol').forEach(type => {
      type[1].forEach((value: any) => {
        helperClass.symbolWithCustomErrorFn = value;
        expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
      });
    });
  });
});

class TestClass {}

class HelperClass {
  @IsSymbol
  symbol: symbol;
  @IsSymbol(() => console.error(CUSTOM_ERROR))
  symbolWithCustomErrorFn: symbol;
}

