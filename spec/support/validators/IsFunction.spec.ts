import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';
import { IsFunction, ValidateParams } from '../../../index';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsFunction()
  function: Function;

  @IsFunction(() => console.error(CUSTOM_ERROR))
  functionWithCustomErrorFn: Function;
}

class ParameterDecoratorHelperClass {
  function: Function;
  functionWithCustomErrorFn: Function;

  @ValidateParams()
  testMethod(@IsFunction() arg1: any,
             @IsFunction(() => console.error(CUSTOM_ERROR)) arg2?: any): any {
    this.function = arg1;
    this.functionWithCustomErrorFn = arg2;
  }
}

const PROPERTY_TYPE = 'function';
const PROPERTY_KEY = PROPERTY_TYPE;
const CUSTOM_PROP_KEY = 'functionWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsFunction', () => {
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
