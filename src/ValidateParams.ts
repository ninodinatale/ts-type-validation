import { installValidatorForMethod } from './core/logic';

export function ValidateParams(): MethodDecorator {
  return installValidatorForMethod;
}
