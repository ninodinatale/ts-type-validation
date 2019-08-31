import { IsTupleOf, ValidateParams } from '../../../index';
import { CUSTOM_ERROR } from './helpers/Utils';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';
import { ParameterDecorator } from './helpers/ParameterDecoratorTestHelper';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsTupleOf(['string', 'boolean'])
  stringBoolean: [string, boolean];

  @IsTupleOf([TestClass, 'number'])
  testClass1Number: [TestClass, number];

  @IsTupleOf([Object, 'number'])
  objectNumber: [Object, number];

  @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR))
  stringBooleanWithErrorFn: [string, boolean];
}


class ParameterDecoratorHelperClass {
  stringBoolean: [string, boolean];
  testClass1Number: [TestClass, number];
  objectNumber: [Object, number];
  stringBooleanWithErrorFn: [string, boolean];

  @ValidateParams()
  testMethod(@IsTupleOf(['string', 'boolean']) stringBoolean: any,
             @IsTupleOf([TestClass, 'number']) testClass1Number: any,
             @IsTupleOf([Object, 'number']) objectNumber: any,
             @IsTupleOf(['string', 'boolean'], () => console.error(CUSTOM_ERROR)) stringBooleanWithErrorFn?: any): any {
    this.stringBoolean = stringBoolean;
    this.testClass1Number = testClass1Number;
    this.objectNumber = objectNumber;
    this.stringBooleanWithErrorFn = stringBooleanWithErrorFn;
  }
}

const PROP_KEY_TUPLE1 = 'stringBoolean';
const PROP_KEY_TUPLE2 = 'testClass1Number';
const PROP_KEY_TUPLE3 = 'objectNumber';
const CUSTOM_PROP_KEY_ERROR_FN = 'stringBooleanWithErrorFn';
const METHOD_NAME = 'testMethod';

describe('@IsTupleOf', () => {
  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE1,
      [
          ['somestring', true],
          ['', false]
      ]);

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE2,
      [
        [new TestClass(), 99]
      ]);

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE3,
      [
        [new Object(), 1],
        [new TestClass(), -99]
      ]);

  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE1,
      [
        ['somestring', 'boolean'],
        [false, true],
        [1, true],
        [new Object(), false]
      ]);

  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE2,
      [
        [new TestClass(), 'string'],
        [new Object(), 1],
      ]);

  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      PROP_KEY_TUPLE3,
      [
        [new TestClass(), 'string'],
        [new Object(), false],
      ]);

  PropertyDecorator.shouldExecutePassedErrorFunction([],
      PropertyDecoratorHelperClass,
      CUSTOM_PROP_KEY_ERROR_FN, [
          [false, false]
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE1,
      METHOD_NAME,
      0,
      [
          ['somestring', true],
          ['', false]
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE2,
      METHOD_NAME,
      1,
      [
        [new TestClass(), 99]
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE3,
      METHOD_NAME,
      2,
      [
        [new Object(), 1],
        [new TestClass(), -99]
      ]);

  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE1,
      METHOD_NAME,
      0,
      [
        ['somestring', 'boolean'],
        [false, true],
        [1, true],
        [new Object(), false]
      ]);

  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE2,
      METHOD_NAME,
      1,
      [
        [new TestClass(), 'string'],
        [new Object(), 1],
      ]);

  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      PROP_KEY_TUPLE3,
      METHOD_NAME,
      2,
      [
        [new TestClass(), 'string'],
        [new Object(), false],
      ]);

  ParameterDecorator.shouldExecutePassedErrorFunction([],
      ParameterDecoratorHelperClass,
      CUSTOM_PROP_KEY_ERROR_FN,
      METHOD_NAME,
      3,
      [
          [false, false]
      ]);
});

