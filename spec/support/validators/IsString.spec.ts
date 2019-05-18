import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsString } from '../../../src/validators';

describe('@IsString', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('should not throw an error if assigning', () => {
    it('string', () => {
      TYPES.string.forEach(value => expect(() => helperClass.string = value).not.toThrowError());
    });
    it('null', () => {
      TYPES['null'].forEach(value => expect(() => helperClass.string = value as any).not.toThrowError());
    });
    it('undefined', () => {
      TYPES['undefined'].forEach(value => expect(() => helperClass.string = value as any).not.toThrowError());
    });
  });

  describe('should throw an error if assigning', () => {
    it('String', () => {
      expect(() => helperClass.string = new String('') as any).toThrowError();
    });
    it('primitive object', () => {
      TYPES.primitiveObject.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('object', () => {
      TYPES.object.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('primitive number', () => {
      TYPES.number.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('primitive boolean', () => {
      TYPES.boolean.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('primitive symbol', () => {
      TYPES.symbol.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('function', () => {
      TYPES.function.forEach(value => expect(() => helperClass.string = value as any).toThrowError());
    });
    it('DummyClass', () => {
      expect(() => helperClass.string = new TestClass() as any).toThrowError();
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES).filter(type => type[0] !== 'string').forEach(type => {
      type[1].forEach((value: any) => {
        helperClass.stringWithCustomErrorFn = value;
        expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
      });
    });
  });
});

class TestClass {}

class HelperClass {
  @IsString
  string: string;

  @IsString(() => console.error(CUSTOM_ERROR))
  stringWithCustomErrorFn: string;
}

