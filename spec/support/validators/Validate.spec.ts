import { Validate, ValidateParams } from '../../../index';
import { CUSTOM_ERROR } from './helpers/Utils';
import { ParameterDecorator } from './helpers/ParameterDecoratorTestHelper';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';

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

  @Validate({notNull: true})
  notNullnumber: number;

  @Validate({notNull: true, errorCb: () => console.error(CUSTOM_ERROR)})
  notNullnumberWithErrorFn: number;

  @Validate({notNull: true})
  notNullstring: string;

  @Validate({notNull: true})
  notNullfunction: Function;

  @Validate({notNull: true})
  notNullarrowFunction: () => {};

  @Validate({notNull: true})
  notNullsymbol: symbol;

  @Validate({notNull: true})
  notNullboolean: boolean;

  @Validate({notNull: true})
  notNulltestClass: TestClass;
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
  notNullnumber: number;
  notNullnumberWithErrorFn: number;
  notNullstring: string;
  notNullarrowFunction: () => {};
  notNullsymbol: symbol;
  notNullboolean: boolean;
  notNulltestClass: TestClass;

  @ValidateParams()
  testMethod(
      @Validate() number: number,
      @Validate({errorCb: () => console.error(CUSTOM_ERROR)}) numberWithErrorFn: number,
      @Validate() string: string,
      @Validate() arrowFunction: () => {},
      @Validate() symbol: symbol,
      @Validate() boolean: boolean,
      @Validate() testClass: TestClass,
      @Validate({notNull: true}) notNullnumber: number,
      @Validate({notNull: true, errorCb: () => console.error(CUSTOM_ERROR)}) notNullnumberWithErrorFn: number,
      @Validate({notNull: true}) notNullstring: string,
      @Validate({notNull: true}) notNullarrowFunction: () => {},
      @Validate({notNull: true}) notNullsymbol: symbol,
      @Validate({notNull: true}) notNullboolean: boolean,
      @Validate({notNull: true}) notNulltestClass: TestClass
  ): any {
    this.number = number;
    this.numberWithErrorFn = numberWithErrorFn;
    this.string = string;
    this.arrowFunction = arrowFunction;
    this.symbol = symbol;
    this.boolean = boolean;
    this.testClass = testClass;
    this.notNullnumber = notNullnumber;
    this.notNullnumberWithErrorFn = notNullnumberWithErrorFn;
    this.notNullstring = notNullstring;
    this.notNullarrowFunction = notNullarrowFunction;
    this.notNullsymbol = notNullsymbol;
    this.notNullboolean = notNullboolean;
    this.notNulltestClass = notNulltestClass;
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

  describe('not null of', () => {

    describe('type number', () => {
      const PROPERTY_TYPE = 'number';

      PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullnumber');

      PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullnumber',
          [null, undefined]
      );

      PropertyDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullnumberWithErrorFn',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullnumber',
          METHOD_NAME,
          7);

      ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          PROPERTY_TYPE,
          METHOD_NAME,
          7,
          [null, undefined]
      );

      ParameterDecorator.shouldExecutePassedErrorFunction([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'numberWithErrorFn',
          METHOD_NAME,
          8,
          [null, undefined]
      );
    });

    describe('type string', () => {
      const PROPERTY_TYPE = 'string';

      PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullstring');

      PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullstring',
              [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullstring',
          METHOD_NAME,
          9);

      ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          PROPERTY_TYPE,
          METHOD_NAME,
          9,
          [null, undefined]
      );
    });

    describe('type arrow function', () => {
      const PROPERTY_TYPE = 'function';

      PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullarrowFunction');

      PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullarrowFunction',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullarrowFunction',
          METHOD_NAME,
          10);

      ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullarrowFunction',
          METHOD_NAME,
          3,
          [null, undefined]
      );
    });

    describe('type symbol', () => {
      const PROPERTY_TYPE = 'symbol';

      PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullsymbol');

      PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullsymbol',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullsymbol',
          METHOD_NAME,
          11);

      ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          PROPERTY_TYPE,
          METHOD_NAME,
          11,
          [null, undefined]
      );
    });

    describe('type boolean', () => {
      const PROPERTY_TYPE = 'boolean';

      PropertyDecorator.shouldNotThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullboolean');

      PropertyDecorator.shouldThrowError([PROPERTY_TYPE],
          PropertyDecoratorHelperClass,
          'notNullboolean',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          'notNullboolean',
          METHOD_NAME,
          12);

      ParameterDecorator.shouldThrowError([PROPERTY_TYPE],
          ParameterDecoratorHelperClass,
          PROPERTY_TYPE,
          METHOD_NAME,
          12,
          [null, undefined]
      );
    });

    describe('type TestClass', () => {
      PropertyDecorator.shouldNotThrowError([],
          PropertyDecoratorHelperClass,
          'notNulltestClass',
          [
            new TestClass()
          ]);

      PropertyDecorator.shouldThrowError(['object'],
          PropertyDecoratorHelperClass,
          'notNulltestClass',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError([],
          ParameterDecoratorHelperClass,
          'notNulltestClass',
          METHOD_NAME,
          13);

      ParameterDecorator.shouldThrowError(['object'],
          ParameterDecoratorHelperClass,
          'notNulltestClass',
          METHOD_NAME,
          13,
          [null, undefined]
      );
    });
  });
});
