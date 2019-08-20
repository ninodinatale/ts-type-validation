import { CUSTOM_ERROR } from './helpers/test-helper';
import { ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';
import { IsBoolean, ValidateParams } from '../../../index';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsBoolean()
  boolean: boolean;

  @IsBoolean(() => console.error(CUSTOM_ERROR))
  booleanWithCustomErrorFn: boolean;

  constructor() {
  }
}

class ParameterDecoratorHelperClass {
  boolean: boolean;
  booleanWithCustomErrorFn: boolean;

  @ValidateParams()
  testMethod(@IsBoolean() arg1: any,
             @IsBoolean(() => console.error(CUSTOM_ERROR)) arg2?: any): any {
    this.boolean = arg1;
    this.booleanWithCustomErrorFn = arg2;
  }
}

const PROPERTY_TYPE = 'boolean';
const PROPERTY_KEY = PROPERTY_TYPE;
const CUSTOM_PROP_KEY = 'booleanWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsBoolean', () => {

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
