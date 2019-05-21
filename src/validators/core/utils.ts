import { DecoratorFactoryArgs } from './types';

export function removeTrailingUndefined(args: DecoratorFactoryArgs) {
  args.reverse();
  while (args.length && args[0] === undefined) {
    args.shift();
  }
  args.reverse();
}

