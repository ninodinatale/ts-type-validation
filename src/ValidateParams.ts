import { installOrdinaryValidatorForMethod } from './core/logic';

export function ValidateParams(): MethodDecorator {
  return installOrdinaryValidatorForMethod;
}
