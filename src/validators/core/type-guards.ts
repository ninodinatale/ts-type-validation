import {
  ExtendedDecoratorFactoryArgs,
  OrdinaryDecoratorFactoryArgs,
  ParameterDecoratorArgs,
  PropertyDecoratorArgs, Types,
} from './types';

export function IsEmptyDevoratorFactoryArgs(args: any[]): args is [] {
  return args.length == 0;
}

export function isExtendedDecoratorFactoryArgs(args: any[]): args is ExtendedDecoratorFactoryArgs {
  return args.length == 0 || typeof args[0] === Types.Function;
}

export function isDecoratorFactoryArgs(args: any[]): args is OrdinaryDecoratorFactoryArgs {
  return typeof args[0] === Types.Object;
}

export function isParameterDecorator(args: OrdinaryDecoratorFactoryArgs): args is ParameterDecoratorArgs {
  return args.length === 3 && typeof args[2] === Types.Number;
}

export function isPropertyDecorator(args: OrdinaryDecoratorFactoryArgs): args is PropertyDecoratorArgs {
  return args.length === 2;
}

