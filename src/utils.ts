import { DecoratorFactoryArgs } from './types';

export function removeTrailingUndefined<T>(args: DecoratorFactoryArgs<T>) {
  args.reverse();
  while (args.length && args[0] === undefined) {
    args.shift();
  }
  args.reverse();
}

