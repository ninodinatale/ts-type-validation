import { CUSTOM_ERROR, TYPES } from './helpers/test-helper';
import { IsUnionOf } from '../../../src/validators/IsUnionOf';
import { IsEnumOf } from '../../../src/validators/IsEnumOf';

describe('@IsEnumOf', () => {
  let helperClass: HelperClass;

  beforeAll(() => {
    helperClass = new HelperClass();
  });

  describe('any type', () => {
    describe('should not throw an error if assigning', () => {
      it('null', () => {
        TYPES['null'].forEach(value => expect(() => helperClass.numberBasedEnum = value as any).not.toThrowError());
      });
      it('undefined', () => {
        TYPES['undefined'].forEach(value => expect(() => helperClass.numberBasedEnum = value as any).not.toThrowError());
      });
    });
  });

  describe('NumberBasedEnum', () => {
    describe('should not throw an error if assigning', () => {
      it('NumberBasedEnum.Value1', () => {
        expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value1).not.toThrowError();
      });
      it('NumberBasedEnum.Value2', () => {
        expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value2).not.toThrowError();
      });
      it('NumberBasedEnum.Value3', () => {
        expect(() => helperClass.numberBasedEnum = NumberBasedEnum.Value3).not.toThrowError();
      });
      it('0, 1 or 2', () => {
        expect(() => helperClass.numberBasedEnum = 0).not.toThrowError();
        expect(() => helperClass.numberBasedEnum = 1).not.toThrowError();
        expect(() => helperClass.numberBasedEnum = 2).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('number greater than 2', () => {
        expect(() => helperClass.numberBasedEnum = 3).toThrowError();
        expect(() => helperClass.numberBasedEnum = 4).toThrowError();
        expect(() => helperClass.numberBasedEnum = 99999).toThrowError();
      });
      it('StringBasedEnum.Value1', () => {
        expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value1 as any).toThrowError();
      });
      it('StringBasedEnum.Value2', () => {
        expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value2 as any).toThrowError();
      });
      it('StringBasedEnum.Value3', () => {
        expect(() => helperClass.numberBasedEnum = StringBasedEnum.Value3 as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.numberBasedEnum = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.numberBasedEnum = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.numberBasedEnum = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.numberBasedEnum = new TestClass1() as any).toThrowError();
      });
    });
  });

  describe('StringBasedEnum', () => {
    describe('should not throw an error if assigning', () => {
      it('StringBasedEnum.Value1', () => {
        expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value1).not.toThrowError();
      });
      it('StringBasedEnum.Value2', () => {
        expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value2).not.toThrowError();
      });
      it('StringBasedEnum.Value3', () => {
        expect(() => helperClass.stringBasedEnum = StringBasedEnum.Value3).not.toThrowError();
      });
      it('0, 1 or 2', () => {
        expect(() => helperClass.stringBasedEnum = 'VALUE1' as any).not.toThrowError();
        expect(() => helperClass.stringBasedEnum = 'VALUE2' as any).not.toThrowError();
        expect(() => helperClass.stringBasedEnum = 'VALUE3' as any).not.toThrowError();
      });
    });

    describe('should throw an error if assigning', () => {
      it('StringBasedEnum.Value1', () => {
        expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value1 as any).toThrowError();
      });
      it('StringBasedEnum.Value2', () => {
        expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value2 as any).toThrowError();
      });
      it('StringBasedEnum.Value3', () => {
        expect(() => helperClass.stringBasedEnum = NumberBasedEnum.Value3 as any).toThrowError();
      });
      it('0, 1 or 2', () => {
        expect(() => helperClass.stringBasedEnum = 0 as any).toThrowError();
        expect(() => helperClass.stringBasedEnum = 1 as any).toThrowError();
        expect(() => helperClass.stringBasedEnum = 2 as any).toThrowError();
      });
      it('number greater than 2', () => {
        expect(() => helperClass.stringBasedEnum = 'VALUE4' as any).toThrowError();
        expect(() => helperClass.stringBasedEnum = 'VALUE5' as any).toThrowError();
        expect(() => helperClass.stringBasedEnum = 'VALUE6' as any).toThrowError();
      });
      it('primitive object', () => {
        TYPES.primitiveObject.forEach(value => expect(() => helperClass.stringBasedEnum = value as any).toThrowError());
      });
      it('primitive symbol', () => {
        TYPES.symbol.forEach(value => expect(() => helperClass.stringBasedEnum = value as any).toThrowError());
      });
      it('string', () => {
        TYPES.string.forEach(value => expect(() => helperClass.stringBasedEnum = value as any).toThrowError());
      });
      it('function', () => {
        TYPES.function.forEach(value => expect(() => helperClass.stringBasedEnum = value as any).toThrowError());
      });
      it('TestClass1', () => {
        expect(() => helperClass.stringBasedEnum = new TestClass1() as any).toThrowError();
      });
    });
  });
});

enum NumberBasedEnum {
  Value1,
  Value2,
  Value3,
}

enum StringBasedEnum {
  Value1 = 'VALUE1',
  Value2 = 'VALUE2',
  Value3 = 'VALUE3',
}

class TestClass1 {
}

class HelperClass {
  @IsEnumOf(NumberBasedEnum)
  numberBasedEnum: NumberBasedEnum;

  @IsEnumOf(StringBasedEnum)
  stringBasedEnum: StringBasedEnum;
}

