import { CUSTOM_ERROR } from './helpers/test-helper';
import { IsObject, ValidateParams } from '../../../index';
import { ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';

class TestClass1 {
}

class PropertyDecoratorHelperClass {
  @IsObject(Object)
  object: Object;

  @IsObject(Object, () => console.error(CUSTOM_ERROR))
  objectWithCustomErrorFn: Object;

  @IsObject(TestClass1)
  testClass1: TestClass1;
}

class ParameterDecoratorHelperClass {
  object: Object;
  objectWithCustomErrorFn: Object;
  testClass1: TestClass1;

  @ValidateParams()
  testMethod(@IsObject(Object) object: any,
             @IsObject(TestClass1) testClass1: any,
             @IsObject(Object, () => console.error(CUSTOM_ERROR)) objectWithCustomErrorFn?: any): any {
    this.object = object;
    this.testClass1 = testClass1;
    this.objectWithCustomErrorFn = objectWithCustomErrorFn;
  }
}

const OBJECT_PROP_KEY = 'object';
const TESTCLASS1_PROP_KEY = 'testClass1';
const CUSTOM_ERROR_FN_PROP_KEY = 'objectWithCustomErrorFn';
const METHOD_NAME = 'testMethod';


describe('@IsObject', () => {
  PropertyDecorator.shouldNotThrowError(['object'],
      PropertyDecoratorHelperClass,
      OBJECT_PROP_KEY,
      [
        new TestClass1()
      ]);

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      TESTCLASS1_PROP_KEY,
      [
        new TestClass1()
      ]);

  PropertyDecorator.shouldExecutePassedErrorFunction(['object'],
      PropertyDecoratorHelperClass,
      CUSTOM_ERROR_FN_PROP_KEY);


  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      TESTCLASS1_PROP_KEY,
      [
        new Object()
      ]);

  ParameterDecorator.shouldNotThrowError(['object'],
      ParameterDecoratorHelperClass,
      OBJECT_PROP_KEY,
      METHOD_NAME,
      0,
      [
        new TestClass1()
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      TESTCLASS1_PROP_KEY,
      METHOD_NAME,
      1,
      [
        new TestClass1()
      ]);

  ParameterDecorator.shouldExecutePassedErrorFunction(['object'],
      ParameterDecoratorHelperClass,
      CUSTOM_ERROR_FN_PROP_KEY,
      METHOD_NAME,
      2);


  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      TESTCLASS1_PROP_KEY,
      METHOD_NAME,
      1,
      [
        new Object()
      ]);
});
