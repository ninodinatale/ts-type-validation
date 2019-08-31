import { Validate } from '../../../src/Validate';
import { ValidateParams } from '../../../index';
import { CUSTOM_ERROR } from './helpers/Utils';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';
import { ParameterDecorator } from './helpers/ParameterDecoratorTestHelper';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @Validate()
  number: number;

  @Validate({errorCb: () => console.error(CUSTOM_ERROR)})
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
      @Validate({errorCb: () => console.error(CUSTOM_ERROR)}) numberWithErrorFn: number,
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

const METHOD_NAME = 'testMethod';

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

    ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        0);

    ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        0);

    ParameterDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        'numberWithErrorFn',
        METHOD_NAME,
        1);
  });

  describe('type string', () => {
    const PROPERTY_TYPE = 'string';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        2);

    ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        2);
  });

  describe('type arrow function', () => {
    const PROPERTY_TYPE = 'function';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        'arrowFunction');

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        'arrowFunction');

    ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        'arrowFunction',
        METHOD_NAME,
        3);

    ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        'arrowFunction',
        METHOD_NAME,
        3);
  });

  describe('type symbol', () => {
    const PROPERTY_TYPE = 'symbol';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        4);

    ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        4);
  });

  describe('type boolean', () => {
    const PROPERTY_TYPE = 'boolean';

    PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        5);

    ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        5);
  });

  describe('type TestClass', () => {
    const PROPERTY_TYPE = 'testClass';

    PropertyDecorator.shouldNotThrowError([],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        [
            new TestClass()
        ]);

    PropertyDecorator.shouldThrowError(['object'],
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    ParameterDecorator.shouldNotThrowError([],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        6);

    ParameterDecorator.shouldThrowError(['object'],
        ParameterDecoratorHelperClass,
        PROPERTY_TYPE,
        METHOD_NAME,
        6);
  });

});
