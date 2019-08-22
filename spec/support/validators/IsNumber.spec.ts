import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';
import { IsNumber, ValidateParams } from '../../../index';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsNumber()
  number: number;

  @IsNumber(() => console.error(CUSTOM_ERROR))
  numberWithCustomErrorFn: number;
}

class ParameterDecoratorHelperClass {
  number: number;
  numberWithCustomErrorFn: number;

  @ValidateParams()
  testMethod(@IsNumber() numberArg: number,
             @IsNumber(() => console.error(CUSTOM_ERROR)) customErrorNumberArg?: number): any {
    this.number = numberArg;
    this.numberWithCustomErrorFn = customErrorNumberArg as any;
  }
}

const PROPERTY_TYPE = 'number';
const PROPERTY_KEY = PROPERTY_TYPE;
const CUSTOM_PROP_KEY = 'numberWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsNumber', () => {
  PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
      PropertyDecoratorHelperClass,
      PROPERTY_KEY);

  PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
      PropertyDecoratorHelperClass,
      PROPERTY_KEY,
      [new TestClass()]);

  PropertyDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
      PropertyDecoratorHelperClass,
      CUSTOM_PROP_KEY,
      [new TestClass()]);

  ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
      ParameterDecoratorHelperClass,
      PROPERTY_KEY, METHOD_NAME, 0);

  ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
      ParameterDecoratorHelperClass,
      PROPERTY_KEY, METHOD_NAME, 0,
      [new TestClass()]);

  ParameterDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
      ParameterDecoratorHelperClass,
      CUSTOM_PROP_KEY, METHOD_NAME, 1,
      [new TestClass()]);
});
