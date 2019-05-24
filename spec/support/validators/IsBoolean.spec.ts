import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsBoolean } from '../../../src/validators';

describe('@IsBoolean', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('should not throw an error if assigning', () => {
    it('boolean', () => {
      TYPES.boolean.forEach(value => expect(() => helperClass.boolean = value).not.toThrowError());
    });
    it('null', () => {
      TYPES['null'].forEach(value => expect(() => helperClass.boolean = value as any).not.toThrowError());
    });
    it('undefined', () => {
      TYPES['undefined'].forEach(value => expect(() => helperClass.boolean = value as any).not.toThrowError());
    });
  });

  describe('should throw an error if assigning', () => {
    it('Boolean', () => {
      expect(() => helperClass.boolean = new Boolean(true) as any).toThrowError();
    });
    it('primitive object', () => {
      TYPES.primitiveObject.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('object', () => {
      TYPES.object.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('primitive number', () => {
      TYPES.number.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('primitive string', () => {
      TYPES.string.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('primitive symbol', () => {
      TYPES.symbol.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('function', () => {
      TYPES.function.forEach(value => expect(() => helperClass.boolean = value as any).toThrowError());
    });
    it('DummyClass', () => {
      expect(() => helperClass.boolean = new TestClass() as any).toThrowError();
    });
  });

  it('should execute passed error function', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    Object.entries(TYPES).filter(type => type[0] !== 'boolean').forEach(type => {
      type[1].forEach((value: any) => {
        helperClass.booleanWithCustomErrorFn = value;
        expect(consoleErrorSpy).toHaveBeenCalledWith(CUSTOM_ERROR);
      });
    });
  });
});

class TestClass {}

class HelperClass {

  @IsBoolean()
  boolean: boolean;

  @IsBoolean(() => console.error(CUSTOM_ERROR))
  booleanWithCustomErrorFn: boolean;

}
