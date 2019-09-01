import { IsUnionOf, ValidateParams } from '../../../index';
import { CUSTOM_ERROR } from './helpers/Utils';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';
import { ParameterDecorator } from './helpers/ParameterDecoratorTestHelper';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsUnionOf(['string', 'boolean'])
  stringOrBoolean: string | boolean;

  @IsUnionOf([TestClass, 'string'])
  testClass1OrString: TestClass | string;

  @IsUnionOf(['string', 'boolean'], {errorCb: () => console.error(CUSTOM_ERROR)})
  stringOrBooleanWithErrorFn: string | boolean;

  @IsUnionOf(['string', 'boolean'], {notNull: true})
  notNullstringOrBoolean: string | boolean;

  @IsUnionOf([TestClass, 'string'], {notNull: true})
  notNulltestClass1OrString: TestClass | string;

  @IsUnionOf(['string', 'boolean'], {errorCb: () => console.error(CUSTOM_ERROR), notNull: true})
  notNullstringOrBooleanWithErrorFn: string | boolean;
}


class ParameterDecoratorHelperClass {
  stringOrBoolean: string | boolean;
  testClass1OrString: TestClass | string;
  stringOrBooleanWithErrorFn: string | boolean;
  notNullstringOrBoolean: string | boolean;
  notNulltestClass1OrString: TestClass | string;
  notNullstringOrBooleanWithErrorFn: string | boolean;

  @ValidateParams()
  testMethod(
      @IsUnionOf(['string', 'boolean']) stringOrBoolean: any,
      @IsUnionOf([TestClass, 'string']) testClass1OrString: any,
      @IsUnionOf(['string', 'boolean'], {errorCb: () => console.error(CUSTOM_ERROR)}) stringOrBooleanWithErrorFn: any,
      @IsUnionOf(['string', 'boolean'], {notNull: true}) notNullstringOrBoolean: any,
      @IsUnionOf([TestClass, 'string'], {notNull: true}) notNulltestClass1OrString: any,
      @IsUnionOf(['string', 'boolean'], {notNull: true, errorCb: () => console.error(CUSTOM_ERROR)}) notNullstringOrBooleanWithErrorFn?: any
  ): any {
    this.notNullstringOrBoolean = notNullstringOrBoolean;
    this.notNulltestClass1OrString = notNulltestClass1OrString;
    this.notNullstringOrBooleanWithErrorFn = notNullstringOrBooleanWithErrorFn;
  }
}

const PROP_KEY_UNION1 = 'stringOrBoolean';
const PROP_KEY_UNION2 = 'testClass1OrString';
const CUSTOM_PROP_KEY_ERROR_FN = 'stringOrBooleanWithErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsUnionOf', () => {

  PropertyDecorator.shouldNotThrowError(['string', 'boolean'],
      PropertyDecoratorHelperClass,
      PROP_KEY_UNION1);

  PropertyDecorator.shouldNotThrowError(['string'],
      PropertyDecoratorHelperClass,
      PROP_KEY_UNION2, [
        new TestClass()
      ]);

  PropertyDecorator.shouldThrowError(['string', 'boolean'],
      PropertyDecoratorHelperClass,
      PROP_KEY_UNION1);

  PropertyDecorator.shouldThrowError(['string'],
      PropertyDecoratorHelperClass,
      PROP_KEY_UNION2, [
        new Object()
      ]);

  PropertyDecorator.shouldExecutePassedErrorFunction(['string', 'boolean'],
      PropertyDecoratorHelperClass,
      CUSTOM_PROP_KEY_ERROR_FN);


  ParameterDecorator.shouldNotThrowError(['string', 'boolean'],
      ParameterDecoratorHelperClass,
      PROP_KEY_UNION1,
      METHOD_NAME,
      0);

  ParameterDecorator.shouldNotThrowError(['string'],
      ParameterDecoratorHelperClass,
      PROP_KEY_UNION2,
      METHOD_NAME,
      1,
      [
        new TestClass()
      ]);

  ParameterDecorator.shouldThrowError(['string', 'boolean'],
      ParameterDecoratorHelperClass,
      PROP_KEY_UNION1,
      METHOD_NAME,
      0);

  ParameterDecorator.shouldThrowError(['string'],
      ParameterDecoratorHelperClass,
      PROP_KEY_UNION2,
      METHOD_NAME,
      1,
      [
        new Object()
      ]);

  ParameterDecorator.shouldExecutePassedErrorFunction(['string', 'boolean'],
      ParameterDecoratorHelperClass,
      PROP_KEY_UNION2,
      METHOD_NAME,
      2);


  describe('not null of', () => {
    describe('type string or boolean', () => {

      PropertyDecorator.shouldNotThrowError(['string', 'boolean'],
          PropertyDecoratorHelperClass,
          'notNullstringOrBoolean');

      PropertyDecorator.shouldThrowError(['string', 'boolean'],
          PropertyDecoratorHelperClass,
          'notNullstringOrBoolean',
          [null, undefined]
      );

      PropertyDecorator.shouldExecutePassedErrorFunction(['string', 'boolean'],
          PropertyDecoratorHelperClass,
          'notNullstringOrBooleanWithErrorFn',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError(['string', 'boolean'],
          ParameterDecoratorHelperClass,
          'notNullstringOrBoolean',
          METHOD_NAME,
          3);

      ParameterDecorator.shouldThrowError(['string', 'boolean'],
          ParameterDecoratorHelperClass,
          'notNullstringOrBoolean',
          METHOD_NAME,
          3,
          [null, undefined]
      );
    });

    describe('type TestClass or string', () => {

      PropertyDecorator.shouldNotThrowError(['string'],
          PropertyDecoratorHelperClass,
          'notNulltestClass1OrString',
          [new TestClass()]);

      PropertyDecorator.shouldThrowError(['string'],
          PropertyDecoratorHelperClass,
          'notNulltestClass1OrString',
          [null, undefined]
      );

      ParameterDecorator.shouldNotThrowError(['string'],
          ParameterDecoratorHelperClass,
          'notNulltestClass1OrString',
          METHOD_NAME,
          4);

      ParameterDecorator.shouldThrowError(['string'],
          ParameterDecoratorHelperClass,
          'notNulltestClass1OrString',
          METHOD_NAME,
          4,
          [null, undefined]
      );
    });
  });
});

