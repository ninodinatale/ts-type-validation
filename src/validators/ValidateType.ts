import 'reflect-metadata';
import { throwTypeErrorFor } from './core/errors';

export function ValidateType(errorFn?: () => void) {
  return (target: any, key: string) => {
    const propertyKeySymbol = Symbol(key);
    target[propertyKeySymbol] = null;
    Object.defineProperty(target, key, {
      configurable: false,
      get: function () {
        return target[propertyKeySymbol];
      },
      set: function (value: any) {
        const expectedType = Reflect.getMetadata('design:type', target, key).name;

        console.log('expectedType:', expectedType);

        if (value.constructor.name.toUpperCase() !== expectedType.toUpperCase()) {
          if (errorFn) {
            errorFn();
          } else {
            throwTypeErrorFor(target, key, expectedType, value);
          }
        } else {
          target[propertyKeySymbol] = value;
        }
      }
    });
  };
}
