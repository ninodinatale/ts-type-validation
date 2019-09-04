import { NotNull, RegisterParams } from '../../../index';
import { CUSTOM_ERROR, TypesForTest } from './helpers/Utils';
import { PropertyDecorator } from './helpers/PropertyDecoratorTestHelper';
import Spy = jasmine.Spy;

class TestClass {
}

class PropertyDecoratorHelperClass {

  @NotNull()
  number: number;

  @NotNull({errorCb: () => console.error(CUSTOM_ERROR)})
  numberWithErrorFn: number;

  @NotNull()
  string: string;

  @NotNull()
  function: Function;

  @NotNull()
  arrowFunction: () => {};

  @NotNull()
  symbol: symbol;

  @NotNull()
  boolean: boolean;

  @NotNull()
  testClass: TestClass;
}

class ParameterDecoratorHelperClass {
  number: number;
  numberWithErrorFn: number;
  string: string;
  arrowFunction: Function;
  symbol: symbol;
  boolean: boolean;
  testClass: TestClass;

  @RegisterParams()
  testMethod(
      @NotNull() number: number,
      @NotNull({errorCb: () => console.error(CUSTOM_ERROR)}) numberWithErrorFn: number,
      @NotNull() string: string,
      @NotNull() arrowFunction: Function,
      @NotNull() symbol: symbol,
      @NotNull() boolean: boolean,
      @NotNull() testClass: TestClass
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

  describe('@NotNull', () => {
  const ALL_VALID_TYPES: (keyof TypesForTest)[] = ['number', 'symbol', 'boolean', 'function', 'object', 'string'];
  const ALL_INVALID_TYPES = [undefined, null];
  let allValidArgs: [number, number, string, Function, symbol, boolean, Object];
  let errorSpy: Spy;

  beforeEach(() => {
    allValidArgs = [1, 1, '', (() => {
    }) as any, Symbol(), true, new TestClass()];
  });


  describe('type number', () => {
    const PROPERTY_TYPE = 'number';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        ALL_INVALID_TYPES);

    PropertyDecorator.shouldExecutePassedErrorFunction(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        'numberWithErrorFn',
        ALL_INVALID_TYPES);

    it('should not throw function if assigning 1', () => {
      allValidArgs[0] = 1;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[0] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[0] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should not throw error if assigning null, but execute passed error function instead', () => {
      errorSpy = spyOn(console, 'error');
      allValidArgs[1] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe('type string', () => {
    const PROPERTY_TYPE = 'string';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        ALL_INVALID_TYPES);

    it('should not throw function if assigning string', () => {
      allValidArgs[2] = 'something';
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[2] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[2] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });
  });

  describe('type arrow function', () => {
    const PROPERTY_TYPE = 'function';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        'arrowFunction');

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        'arrowFunction',
        ALL_INVALID_TYPES);

    it('should not throw function if assigning function', () => {
      allValidArgs[3] = () => {
      };
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[3] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[3] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });
  });

  describe('type symbol', () => {
    const PROPERTY_TYPE = 'symbol';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        ALL_INVALID_TYPES);

    it('should not throw function if assigning function', () => {
      allValidArgs[4] = Symbol();
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[4] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[4] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });
  });

  describe('type boolean', () => {
    const PROPERTY_TYPE = 'boolean';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE);

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        ALL_INVALID_TYPES);

    it('should not throw function if assigning boolean', () => {
      allValidArgs[5] = true;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[5] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[5] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });
  });

  describe('type TestClass', () => {
    const PROPERTY_TYPE = 'testClass';

    PropertyDecorator.shouldNotThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        [
          new TestClass()
        ]);

    PropertyDecorator.shouldThrowError(ALL_VALID_TYPES,
        PropertyDecoratorHelperClass,
        PROPERTY_TYPE,
        ALL_INVALID_TYPES);

    it('should not throw function if assigning object', () => {
      allValidArgs[6] = new TestClass();
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).not.toThrowError();
    });

    it('should throw error if assigning null', () => {
      allValidArgs[6] = null as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });

    it('should throw error if assigning undefined', () => {
      allValidArgs[6] = undefined as any;
      expect(() => new ParameterDecoratorHelperClass().testMethod(...allValidArgs)).toThrowError(TypeError, /^Invalid assignment to/);
    });
  });
});

