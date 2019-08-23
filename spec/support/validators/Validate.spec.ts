import { CUSTOM_ERROR, PropertyDecorator } from './helpers/TestHelper';
import { Validate } from '../../../src/Validate';
import { ValidateParams } from '../../../index';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @Validate()
  number: number;

  @Validate(() => console.error(CUSTOM_ERROR))
  numberWithErrorFn: number;

  @Validate()
  string: string;

  @Validate()
  function: Function;

  @Validate()
  arrowFunction: () => {};

  @Validate()
  symbol: symbol;

  @Validate()
  boolean: boolean;

  @Validate()
  testClass: TestClass;
}

// TODO
class ParameterDecoratorHelperClass {
  number: number;
  numberWithErrorFn: number;
  string: string;
  function: Function;
  arrowFunction: () => {};
  symbol: symbol;
  boolean: boolean;
  testClass: TestClass;

  @ValidateParams()
  testMethod(
      @Validate() number: number,
      @Validate(() => console.error(CUSTOM_ERROR)) numberWithErrorFn: number,
      @Validate() string: string,
      @Validate() arrowFunction: () => {},
      @Validate() symbol: symbol,
      @Validate() boolean: boolean,
      @Validate() testClass: TestClass
  ): any {
    this.number = number;
    this.numberWithErrorFn = numberWithErrorFn;
    this.string = string;
    this.arrowFunction = arrowFunction;
    this.symbol = symbol;
    this.boolean = boolean;
    this.testClass = testClass;
  }
}

describe('@Validate', () => {

  describe('type number', () => {
    const PROPERTY_TYPE = 'number';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        'numberWithErrorFn');
  });


  describe('type string', () => {
    const PROPERTY_TYPE = 'string';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);
  });


  describe('type function', () => {
    const PROPERTY_TYPE = 'function';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);
  });


  describe('type arrow function', () => {
    const PROPERTY_TYPE = 'function';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        'arrowFunction');

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        'arrowFunction');
  });

  describe('type symbol', () => {
    const PROPERTY_TYPE = 'symbol';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);
  });


  describe('type TestClass', () => {
    const PROPERTY_TYPE = 'testClass';

    PropertyDecorator.shouldNotThrowError([],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        [new TestClass()]);

    PropertyDecorator.shouldThrowError([],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE, [new Object()]);
  });


  // ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
  //     ParameterDecoratorHelperClass,
  //     PROPERTY_KEY, METHOD_NAME, 0);
  //
  // ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
  //     ParameterDecoratorHelperClass,
  //     PROPERTY_KEY, METHOD_NAME, 0,
  //     [new TestClass()]);
  //
  // ParameterDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
  //     ParameterDecoratorHelperClass,
  //     CUSTOM_PROP_KEY, METHOD_NAME, 1,
  //     [new TestClass()]);
});

