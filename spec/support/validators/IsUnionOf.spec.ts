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
}


class ParameterDecoratorHelperClass {
  stringOrBoolean: string | boolean;
  testClass1OrString: TestClass | string;
  stringOrBooleanWithErrorFn: string | boolean;

  @ValidateParams()
  testMethod(@IsUnionOf(['string', 'boolean']) stringOrBoolean: any,
             @IsUnionOf([TestClass, 'string']) testClass1OrString: any,
             @IsUnionOf(['string', 'boolean'], {errorCb: () => console.error(CUSTOM_ERROR)}) stringOrBooleanWithErrorFn?: any): any {
    this.stringOrBoolean = stringOrBoolean;
    this.testClass1OrString = testClass1OrString;
    this.stringOrBooleanWithErrorFn = stringOrBooleanWithErrorFn;
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
});

