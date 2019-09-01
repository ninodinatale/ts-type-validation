# Type validation with TypeScript's decorators 

Use TypeScript's decorators combined with emitted metadata of type definitions to validate...
- the type of the assigned value of class properties
- the type of passed arguments to functions 
- the type of passed arguments to the constructor of an object
- definitions
- ranges
- lengths and sizes

...and much more to come.

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Type validations](#type-validations)
    - [Boolean](#boolean)
    - [Function](#function)
    - [Number](#number)
    - [String](#string)
    - [Symbol](#symbol)
    - [Object](#object)
    - [Enum](#enum)
    - [Literals](#literals)
    - [Tuple](#tuple)
    - [Union](#union)
  - [Validation upon not null](#validation-upon-not-null)
- [Planned features](#planned-features)
- [License](#license)


---


## Installation

Run `npm install @ndinatale/ts-type-validation`

Since decorators are still experimental, you must enable the `experimentalDecorators` as well as `emitDecoratorMetadata` compiler options either on the
command line or in your `tsconfig.json`:

Command Line:
```bash
tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata
```

tsconfig.json:
```json
{
    "compilerOptions": {
        "target": "esnext",
        "experimentalDecorators": true,
        "`emitDecoratorMetadata`": true
    }
}
```

---

## Features

### Type validations

With the use of `reflect-metadata` and the compiler option `emitDecoratorMetadata`, it's possible to validate the types
of decorated properties, arguments and function return types by the defined types _at runtime_.

With the decorator `@Validate()`, it's possible to validate
- boolean
- function
- number
- string
- symbol
- object

just by the type definition provided by TypeScript.

Additionally, with the decorators `@IsEnumOf()`, `@IsLiteralOf()`, `@IsTupleOf()`, and (soon) `@IsIntersectionOf()` there's the
opportunity to validate upon these higher order types, although the type definition won't (and can't) be considered.

### Validation upon "not null"

By default, `null` and `undefined` are valid assignments to all decorator functions. Thus they accept an options
parameter to set the `notNull` flag. If a target should not validate upon type, but only check for not null, there is a
`@NotNull()` decorator, which only validates upon not `null` and not `undefined`.

---

## Usage

Simply decorate a property, a function argument or a constructor argument with the desired validation decorator. For
the types  `boolean`, `function`, `number`, `string`, `symbol` and `object`, the type definition will be read and
validated accordingly. For TypeScript's higher order types `enums`, `literals`, `tuples` and `intersections`, the passed
values to the decorator function will be the base of the validation, which means the type definitions will be ignored.

If a validation fails, all validation decorators throw a `TypeError` by default. This can be changed by passing an
options object in which it's possible to define an error callback which will be executed instead of the `TypeError`.

The function which holds the parameter decorators needs to be decorated with `@ValidateParams()` in order to validate
the params at all.

### Type validations
#### Boolean
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Foo {
  @Validate()
  bar: boolean;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: boolean;

  @Validate({notNull: true})
  barfoo: boolean;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: boolean,
             @Validate({notNull: true}) foobar: boolean,
             @Validate({errorCb: () => console.error('some custom function')}) bar: boolean): void {
    // ...
  }
}
```

#### Function
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Foo {
  @Validate()
  bar: Function;

  @Validate({notNull: true})
  barfoo: Function;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: Function;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: () => void,
             @Validate({notNull: true}) barfoo: () => void,
             @Validate({errorCb: () => console.error('some custom function')}) bar: () => void): void {
    // ...
  }
}
```

#### Number
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Foo {
  @Validate()
  bar: number;

  @Validate({notNull: true})
  barfoo: number;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: number;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: number,
             @Validate({notNull: true}) barfoo: number,
             @Validate({errorCb: () => console.error('some custom function')}) bar: number): void {
    // ...
  }
}
```

#### String
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Foo {
  @Validate()
  bar: string;

  @Validate({notNull: true})
  barfoo: string;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: string;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: string,
             @Validate() barfoo: string,
             @Validate({errorCb: () => console.error('some custom function')}) bar: string): void {
    // ...
  }
}
```

#### Symbol
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Foo {
  @Validate()
  bar: symbol;

  @Validate({notNull: true})
  barfoo: symbol;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: symbol;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: symbol,
             @Validate({errorCb: () => console.error('some custom function')}) bar: symbol): void {
    // ...
  }
}
```

#### Object
##### Property Decorator
```typescript
import { Validate } from '@ndinatale/ts-type-validation'

class Bar {
  
}

class Foo {
  @Validate()
  bar: Bar;

  @Validate({notNull: true})
  barfoo: Bar;

  @Validate({errorCb: () => console.error('some custom function')})
  foobar: Bar;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, Validate } from '@ndinatale/ts-type-validation'

class Bar {
  
}

class Foo {

  @ValidateParams()
  testMethod(@Validate() foo: Bar,
             @Validate({errorCb: () => console.error('some custom function')}) bar: Bar): void {
    // ...
  }
}
```

#### Enum

The enum to make the comparison on needs to be passed to the decorator.

##### Property Decorator
```typescript
import { IsEnumOf } from '@ndinatale/ts-type-validation'

enum Bar {
  Beer,
  Vodka,
  Rum
}

class Foo {
  @IsEnumOf(Bar)
  bar: Bar;

  @IsEnumOf(Bar, {notNull: true})
  barfoo: Bar;

  @IsEnumOf(Bar, {errorCb: () => console.error('some custom function')})
  foobar: Bar;
}
```

##### Parameter Decorator
```typescript

enum Bar {
  Beer,
  Vodka,
  Rum
}

import { ValidateParams, IsEnumOf } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsEnumOf(Bar) foo: Bar,
             @IsEnumOf(Bar, {errorCb: () => console.error('some custom function')}) bar: Bar): void {
    // ...
  }
}
```

#### Literals

The literals to be accepted need to be passed as an array to the decorator.

##### Property Decorator
```typescript
import { IsLiteralOf } from '@ndinatale/ts-type-validation'

class Foo {
  @IsLiteralOf(['foo', 'bar'])
  bar: 'foo' | 'bar';

  @IsLiteralOf(['foo', 'bar'], {errorCb: () => console.error('some custom function')})
  foobar: 'foo' | 'bar';
  
  @IsLiteralOf([1, 2])
  barfoo: 1 | 2;

  @IsLiteralOf([1, 2], {notNull: true})
  foobarfoo: 1 | 2;

  @IsLiteralOf([20, 30], {errorCb: () => console.error('some custom function')})
  foobar: 20 | 30;
}
```

##### Parameter Decorator
```typescript

enum Bar {
  Beer,
  Vodka,
  Rum
}

import { ValidateParams, IsLiteralOf } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsLiteralOf(['foo', 'bar']) foo: 'foo' | 'bar',
             @IsLiteralOf([20, 30]) foo: 20 | 30,
             @IsLiteralOf([1, 2]) foo: 1 | 2,
             @IsLiteralOf(['foo', 'bar'], {errorCb: () => console.error('some custom function')}) bar: 'foo' | 'bar'): void {
    // ...
  }
}
```

#### Tuple

The tuple types need to be passed as an array to the decorator. (strings for primitive types) 

##### Property Decorator
```typescript
import { IsTupleOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {
  @IsTupleOf(['string', 'number'])
  bar: [string, number];

  @IsTupleOf(['number', 'string'], {errorCb: () => console.error('some custom function')})
  foobar: [number, string];

  @IsTupleOf(['boolean', Object])
  barfoo: [boolean, Object];

  @IsTupleOf(['boolean', Object], {notNull: true})
  foobarfoo: [boolean, Object];

  @IsTupleOf([Bar, 'symbol'])
  foo: [Bar, symbol];
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, IsTupleOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {

  @ValidateParams()
  testMethod(@IsTupleOf(['string', 'number']) bar: [string, number],
             @IsTupleOf(['number', 'string'], {errorCb: () => console.error('some custom function')}) foobar: [number, string],
             @IsTupleOf(['boolean', Object]) barfoo: [boolean, Object],
             @IsTupleOf([Bar, 'symbol']) foo: [Bar, symbol]): void {
    // ...
  }
}
```

#### Union

The union types need to be passed as an array to the decorator. (strings for primitive types) 

##### Property Decorator
```typescript
import { IsUnionOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {
  @IsUnionOf(['string', 'number'])
  bar: string | number;

  @IsUnionOf(['number', 'string'], {errorCb: () => console.error('some custom function')})
  foobar: number | string;

  @IsUnionOf(['boolean', Object])
  barfoo: boolean | Object;

  @IsUnionOf(['boolean', Object], {notNull: true})
  foobarfoo: boolean | Object;

  @IsUnionOf([Bar, 'symbol'])
  foo: Bar | symbol;
}
```

##### Parameter Decorator
```typescript
import { ValidateParams, IsUnionOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {

  @ValidateParams()
  testMethod(@IsUnionOf(['string', 'number']) bar: [string, number],
             @IsUnionOf(['number', 'string'], {errorCb: () => console.error('some custom function')}) foobar: [number, string],
             @IsUnionOf(['boolean', Object]) barfoo: [boolean, Object],
             @IsUnionOf([Bar, 'symbol']) foo: [Bar, symbol]): void {
    // ...
  }
}
```

## Validation upon not null

Use the `@NotNull()` decorator to only validate the assigned value upon null or undefined.

```typescript
import { NotNull, ValidateParams } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {

  @NotNull()
  foo: string;

  @NotNull(() => console.error('some custom function')) foobar: [number, string],
  bar: Bar;
  
  @NotNull()
  foobar: number;

  @ValidateParams()
  testMethod(@NotNull() foo: string,
             @NotNull(() => console.error('some custom function')) bar: Bar,
             @NotNull() foobar: number): void {
    // ...
  }
}
```
---

## Planned features

Ordered by priority:

- Validation on constructor functions and their params.
- `@Range()` to validate the range of a `number` property.
- `@Length()` to validate the length of an `Array` or `string` property.
- `@IsIntersectionOf()` to validate on intersections.
- and many more.

## Contributing

Steps to contribute will be added soon.


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**