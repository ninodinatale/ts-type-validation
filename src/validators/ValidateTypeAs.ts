import { throwTypeErrorFor } from './core/errors';

type ValidatedTypes = "string" | "number" | "object" | "symbol" | "function" | Object;

export function ValidateTypeAs(...types: ValidatedTypes[]): any {
  return (target: any, key: string) => {
    const sym = Symbol(key);
    target[sym] = null;
    Object.defineProperty(target, key, {
      get: () => target[sym],
      set: (value: any) => {
        if (hasValidType(value, types)) {
          target[sym] = value;
        } else {
          throwTypeErrorFor(target, key, types.toString(), value);
        }
      }
    });
  };
}

function hasValidType(value: any, types: any[]): boolean {
  return types.some((type: ValidatedTypes) => {
    if (type === Object) {
      return value instanceof Object;
    } else {
      return typeof value === type;
    }
  });
}
