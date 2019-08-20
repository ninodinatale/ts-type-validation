import { OrdinaryDecoratorFactoryArgs } from './types';

export function removeTrailingUndefined<T>(args: OrdinaryDecoratorFactoryArgs<T>) {
  args.reverse();
  while (args.length && args[0] === undefined) {
    args.shift();
  }
  args.reverse();
}

