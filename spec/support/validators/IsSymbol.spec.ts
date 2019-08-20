import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';
import { IsSymbol, ValidateParams } from '../../../src';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsSymbol()
  symbol: symbol;

  @IsSymbol(() => console.error(CUSTOM_ERROR))
  symbolWithCustomErrorFn: symbol;
}

class ParameterDecoratorHelperClass {
  symbol: symbol;
  symbolWithCustomErrorFn: symbol;

  @ValidateParams()
  testMethod(@IsSymbol() arg1: any,
             @IsSymbol(() => console.error(CUSTOM_ERROR)) arg2?: any): any {
    this.symbol = arg1;
    this.symbolWithCustomErrorFn = arg2;
  }
}

const PROPERTY_TYPE = 'symbol';
const PROPERTY_KEY = PROPERTY_TYPE;
const CUSTOM_PROP_KEY = 'symbolWithCustomErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsSymbol', () => {
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
