import { IsEnumOf, RegisterConstructorParams, Validate } from '../../../index';
import Spy = jasmine.Spy;

enum TestEnum {
  One = 'One'
}

@RegisterConstructorParams()
class TestClass {

  constructor(@Validate() age: number,
              @IsEnumOf(TestEnum) testEnum: TestEnum) {
    console.log('original constructor');
  }
}

describe('@RegisterConstructorParams', () => {
  describe('should register', () => {
    describe('@Validate', () => {
      let spy: Spy;
      beforeEach(() => {
        spy = spyOn(console, 'log');
      });

      it('and throw error on instantiate TestClass', () => {
        expect(() => new TestClass(<any>'hello', TestEnum.One)).toThrowError();
        expect(spy).not.toHaveBeenCalled();
      });

      it('and not throw error on instantiate TestClass', () => {
        expect(() => new TestClass(1, TestEnum.One)).not.toThrowError();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('@IsEnumOf', () => {
      let spy: Spy;
      beforeEach(() => {
        spy = spyOn(console, 'log');
      });

      it('and throw error on instantiate TestClass', () => {
        expect(() => new TestClass(1, <any>22)).toThrowError();
        expect(spy).not.toHaveBeenCalled();
      });

      it('and not throw error on instantiate TestClass', () => {
        expect(() => new TestClass(1, TestEnum.One)).not.toThrowError();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
