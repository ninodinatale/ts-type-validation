import { IsEnumOf, ValidateParams } from '../../../index';
import { CUSTOM_ERROR } from './helpers/Utils';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';
import { ParameterDecorator } from './helpers/ParameterDecoratorTestHelper';

class TestClass {
}

enum NumberBasedEnum {
  One,
  Two,
  Three,
}

enum StringBasedEnum {
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
}

class PropertyDecoratorHelperClass {

  @IsEnumOf(NumberBasedEnum)
  numberBasedEnum: NumberBasedEnum;

  @IsEnumOf(StringBasedEnum)
  stringBasedEnum: StringBasedEnum;

  @IsEnumOf(NumberBasedEnum, {errorCb: () => console.error(CUSTOM_ERROR)})
  numberBasedEnumWithCustomErrorFn: string;
}

class ParameterDecoratorHelperClass {
  numberBasedEnum: NumberBasedEnum;
  stringBasedEnum: StringBasedEnum;
  numberBasedEnumWithCustomErrorFn: NumberBasedEnum;

  @ValidateParams()
  testMethod(@IsEnumOf(NumberBasedEnum) numberBasedEnum: any,
             @IsEnumOf(StringBasedEnum) stringBasedEnum: any,
             @IsEnumOf(NumberBasedEnum, {errorCb: () => console.error(CUSTOM_ERROR)}) numberBasedEnumWithCustomErrorFn?: any): any {
    this.numberBasedEnum = numberBasedEnum;
    this.stringBasedEnum = stringBasedEnum;
    this.numberBasedEnumWithCustomErrorFn = numberBasedEnumWithCustomErrorFn;
  }
}

const NUMBER_BASED_PROP_KEY = 'numberBasedEnum';
const STRING_BASED_PROP_KEY = 'stringBasedEnum';
const NUMBER_BASED_PROP_KEY_CUSTOM_ERR_FN = 'numberBasedEnumWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsEnumOf', () => {

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY,
      [
        NumberBasedEnum.One,
        NumberBasedEnum.Two,
        NumberBasedEnum.Three
      ]);

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      STRING_BASED_PROP_KEY,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six
      ]);

  PropertyDecorator.shouldExecutePassedErrorFunction([],
      PropertyDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY_CUSTOM_ERR_FN,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six
      ]);


  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six,
        new TestClass()
      ]);

  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      STRING_BASED_PROP_KEY,
      [
        NumberBasedEnum.One,
        NumberBasedEnum.Two,
        NumberBasedEnum.Three,
        new TestClass()
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY,
      METHOD_NAME,
      0,
      [
        NumberBasedEnum.One,
        NumberBasedEnum.Two,
        NumberBasedEnum.Three
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      STRING_BASED_PROP_KEY,
      METHOD_NAME,
      1,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six
      ]);

  ParameterDecorator.shouldExecutePassedErrorFunction([],
      ParameterDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY_CUSTOM_ERR_FN,
      METHOD_NAME,
      2,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six
      ]);


  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY,
      METHOD_NAME,
      0,
      [
        StringBasedEnum.Four,
        StringBasedEnum.Five,
        StringBasedEnum.Six,
        new TestClass()
      ]);

  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      NUMBER_BASED_PROP_KEY,
      METHOD_NAME,
      1,
      [
        NumberBasedEnum.One,
        NumberBasedEnum.Two,
        NumberBasedEnum.Three,
        new TestClass()
      ]);
});
