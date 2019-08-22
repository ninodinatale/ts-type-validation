import { IsLiteralOf, ValidateParams } from '../../../index';
import { CUSTOM_ERROR, ParameterDecorator, PropertyDecorator } from './helpers/TestHelper';

class TestClass {
}

class PropertyDecoratorHelperClass {
  @IsLiteralOf(['value1', 'value2'])
  literal1: 'value1' | 'value2';

  @IsLiteralOf([111, 222])
  literal2: 111 | 222;

  @IsLiteralOf([1, 2], () => console.error(CUSTOM_ERROR))
  invalidLiteralWIthCustomFn: 1 | 2;
}


class ParameterDecoratorHelperClass {
  literal1: 'value1' | 'value2';

  literal2: 111 | 222;
  invalidLiteralWIthCustomFn: 1 | 2;

  @ValidateParams()
  testMethod(@IsLiteralOf(['value1', 'value2']) literal1: any,
             @IsLiteralOf([111, 222]) literal2: any,
             @IsLiteralOf([1, 2], () => console.error(CUSTOM_ERROR)) invalidLiteralWIthCustomFn?: any): any {
    this.literal1 = literal1;
    this.literal2 = literal2;
    this.invalidLiteralWIthCustomFn = invalidLiteralWIthCustomFn;
  }
}

const STRING_LITERAL_PROP_KEY = 'literal1';
const NUMBER_LITERAL_PROP_KEY = 'literal2';
const NUMBER_LITERAL_PROP_KEY_CUSTOM_ERR_FN = 'invalidLiteralWIthCustomFn';
const METHOD_NAME = 'testMethod';


describe('@IsLiteralOf', () => {
  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      STRING_LITERAL_PROP_KEY,
      [
        'value1',
        'value2'
      ]);

  PropertyDecorator.shouldNotThrowError([],
      PropertyDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY,
      [
        111,
        222
      ]);

  PropertyDecorator.shouldExecutePassedErrorFunction([],
      PropertyDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY_CUSTOM_ERR_FN,
      [
          'value1'
      ]);


  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      STRING_LITERAL_PROP_KEY,
      [
        1,
        2,
        'someValue',
        'VALUE1',
        new TestClass()
      ]);

  PropertyDecorator.shouldThrowError([],
      PropertyDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY,
      [
        '111',
        '222',
        333,
        'value1',
        new TestClass()
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      STRING_LITERAL_PROP_KEY,
      METHOD_NAME,
      0,
      [
        'value1',
        'value2'
      ]);

  ParameterDecorator.shouldNotThrowError([],
      ParameterDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY,
      METHOD_NAME,
      1,
      [
        111,
        222
      ]);

  ParameterDecorator.shouldExecutePassedErrorFunction([],
      ParameterDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY_CUSTOM_ERR_FN,
      METHOD_NAME,
      2,
      [
        'value1'
      ]);


  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      STRING_LITERAL_PROP_KEY,
      METHOD_NAME,
      0,
      [
        1,
        2,
        'someValue',
        'VALUE1',
        new TestClass()
      ]);

  ParameterDecorator.shouldThrowError([],
      ParameterDecoratorHelperClass,
      NUMBER_LITERAL_PROP_KEY,
      METHOD_NAME,
      1,
      [
        '111',
        '222',
        333,
        'value1',
        new TestClass()
      ]);
});

