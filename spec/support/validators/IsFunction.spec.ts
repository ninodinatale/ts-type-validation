import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsFunction } from '../../../src/validators';

describe('@IsFunction', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('should not throw an error if assigning', () => {
    it('function', () => {
      TYPES.function.forEach(value => expect(() => helperClass.function = value).not.toThrowError());
    });
    it('null', () => {
      TYPES['null'].forEach(value => expect(() => helperClass.function = value as any).not.toThrowError());
    });
    it('undefined', () => {
      TYPES['undefined'].forEach(value => expect(() => helperClass.function = value as any).not.toThrowError());
    });
  });

  describe('should throw an error if assigning', () => {
    it('String', () => {
      expect(() => helperClass.function = new String('') as any).toThrowError();
    });
    it('primitive object', () => {
      TYPES.primitiveObject.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('object', () => {
      TYPES.object.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('primitive number', () => {
      TYPES.number.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('primitive boolean', () => {
      TYPES.boolean.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('primitive symbol', () => {
      TYPES.symbol.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('string', () => {
      TYPES.string.forEach(value => expect(() => helperClass.function = value as any).toThrowError());
    });
    it('TestClass', () => {
      expect(() => helperClass.function = new TestClass() as any).toThrowError();
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES).filter(type => type[0] !== 'function').forEach(type => {
      type[1].forEach((value: any) => {
        helperClass.functionWithCustomErrorFn = value;
        expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
      });
    });
  });
});

class TestClass {}

class HelperClass {
  @IsFunction
  function: Function;
  @IsFunction(() => console.error(CUSTOM_ERROR))
  functionWithCustomErrorFn: Function;
}

