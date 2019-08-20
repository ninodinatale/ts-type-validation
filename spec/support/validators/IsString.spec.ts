import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';
import { IsString, ValidateParams } from '../../../src';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsString()
  string: string;

  @IsString(() => console.error(CUSTOM_ERROR))
  stringWithCustomErrorFn: string;
}

class ParameterDecoratorHelperClass {
  string: string;
  stringWithCustomErrorFn: string;

  @ValidateParams()
  testMethod(@IsString() arg1: any,
             @IsString(() => console.error(CUSTOM_ERROR)) arg2?: any): any {
    this.string = arg1;
    this.stringWithCustomErrorFn = arg2;
  }
}

const PROPERTY_TYPE = 'string';
const PROPERTY_KEY = PROPERTY_TYPE;
const CUSTOM_PROP_KEY = 'stringWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsString', () => {
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
