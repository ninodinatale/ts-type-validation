# Type validation with TypeScript's decorators 

Use TypeScript's decorators to validate the type of 
- the assigned value of class properties
- passed arguments to functions 
- and (soon) passed arguments to the constructor of an object

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
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
- [License](#license)


---


## Installation

Run `npm install @ndinatale/ts-type-validation`

Since decorators are still experimental, you must enable the `experimentalDecorators` compiler option either on the
command line or in your `tsconfig.json`:

Command Line:
```bash
tsc --target ES5 --experimentalDecorators
```

tsconfig.json:
```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

---

## Features

Validations are available for:
- boolean
- function
- number
- string
- symbol
- object
- enum
- literals
- tuples
- unions
- (soon) intersections

which can be validated on:
- class properties
- function arguments
- (soon) constructor arguments

---

## Usage

Simply decorate a property, a function argument or a constructor argument with the desired validation decorator. 

If a validation fails, all validation decorators throw a `TypeError` by default. This can be changed by passing a
function as the last argument to the decorator which will be executed instead of the `TypeError`.

The function which holds the parameter decorators needs to be decorated with `@ValidateParams()` in order to validate
the params at all.

### Boolean
#### Property Decorator
```typescript
import { IsBoolean } from '@ndinatale/ts-type-validation'

class Foo {
  @IsBoolean()
  bar: boolean;

  @IsBoolean(() => console.error('some custom function'))
  foobar: boolean;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsBoolean } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsBoolean() foo: boolean,
             @IsBoolean(() => console.error('some custom function')) bar: boolean): void {
    // ...
  }
}
```

### Function
#### Property Decorator
```typescript
import { IsFunction } from '@ndinatale/ts-type-validation'

class Foo {
  @IsFunction()
  bar: () => void;

  @IsFunction(() => console.error('some custom function'))
  foobar: () => void;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsFunction } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsFunction() foo: () => void,
             @IsFunction(() => console.error('some custom function')) bar: () => void): void {
    // ...
  }
}
```

### Number
#### Property Decorator
```typescript
import { IsNumber } from '@ndinatale/ts-type-validation'

class Foo {
  @IsNumber()
  bar: number;

  @IsNumber(() => console.error('some custom function'))
  foobar: number;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsNumber } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsNumber() foo: number,
             @IsNumber(() => console.error('some custom function')) bar: number): void {
    // ...
  }
}
```

### String
#### Property Decorator
```typescript
import { IsString } from '@ndinatale/ts-type-validation'

class Foo {
  @IsString()
  bar: number;

  @IsString(() => console.error('some custom function'))
  foobar: number;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsString } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsString() foo: string,
             @IsString(() => console.error('some custom function')) bar: string): void {
    // ...
  }
}
```

### Symbol
#### Property Decorator
```typescript
import { IsSymbol } from '@ndinatale/ts-type-validation'

class Foo {
  @IsSymbol()
  bar: symbol;

  @IsSymbol(() => console.error('some custom function'))
  foobar: symbol;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsSymbol } from '@ndinatale/ts-type-validation'

class Foo {

  @ValidateParams()
  testMethod(@IsSymbol() foo: symbol,
             @IsSymbol(() => console.error('some custom function')) bar: symbol): void {
    // ...
  }
}
```

### Object

The object to make the comparison on needs to be passed into the decorator.

#### Property Decorator
```typescript
import { IsObject } from '@ndinatale/ts-type-validation'

class Bar {
  
}

class Foo {
  @IsObject(Bar)
  bar: Bar;

  @IsObject(Bar, () => console.error('some custom function'))
  foobar: Bar;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsObject } from '@ndinatale/ts-type-validation'

class Bar {
  
}

class Foo {

  @ValidateParams()
  testMethod(@IsObject(Bar) foo: Bar,
             @IsObject(Bar, () => console.error('some custom function')) bar: Bar): void {
    // ...
  }
}
```

### Enum

The enum to make the comparison on needs to be passed to the decorator.

#### Property Decorator
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

  @IsEnumOf(Bar, () => console.error('some custom function'))
  foobar: Bar;
}
```

#### Parameter Decorator
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
             @IsEnumOf(Bar, () => console.error('some custom function')) bar: Bar): void {
    // ...
  }
}
```

### Literals

The literals to be accepted need to be passed as an array to the decorator.

#### Property Decorator
```typescript
import { IsLiteralOf } from '@ndinatale/ts-type-validation'

class Foo {
  @IsLiteralOf(['foo', 'bar'])
  bar: 'foo' | 'bar';

  @IsLiteralOf(['foo', 'bar'], () => console.error('some custom function'))
  foobar: 'foo' | 'bar';
  
  @IsLiteralOf([1, 2])
  barfoo: 1 | 2;

  @IsLiteralOf([20, 30], () => console.error('some custom function'))
  foobar: 20 | 30;
}
```

#### Parameter Decorator
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
             @IsLiteralOf(['foo', 'bar'], () => console.error('some custom function')) bar: 'foo' | 'bar'): void {
    // ...
  }
}
```

### Tuple

The tuple types need to be passed as an array to the decorator. (strings for primitive types) 

#### Property Decorator
```typescript
import { IsTupleOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {
  @IsTupleOf(['string', 'number'])
  bar: [string, number];

  @IsTupleOf(['number', 'string'], () => console.error('some custom function'))
  foobar: [number, string];

  @IsTupleOf(['boolean', Object])
  barfoo: [boolean, Object];

  @IsTupleOf([Bar, 'symbol'])
  foo: [Bar, symbol];
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsTupleOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {

  @ValidateParams()
  testMethod(@IsTupleOf(['string', 'number']) bar: [string, number],
             @IsTupleOf(['number', 'string'], () => console.error('some custom function')) foobar: [number, string],
             @IsTupleOf(['boolean', Object]) barfoo: [boolean, Object],
             @IsTupleOf([Bar, 'symbol']) foo: [Bar, symbol]): void {
    // ...
  }
}
```

### Union

The union types need to be passed as an array to the decorator. (strings for primitive types) 

#### Property Decorator
```typescript
import { IsUnionOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {
  @IsUnionOf(['string', 'number'])
  bar: string | number;

  @IsUnionOf(['number', 'string'], () => console.error('some custom function'))
  foobar: number | string;

  @IsUnionOf(['boolean', Object])
  barfoo: boolean | Object;

  @IsUnionOf([Bar, 'symbol'])
  foo: Bar | symbol;
}
```

#### Parameter Decorator
```typescript
import { ValidateParams, IsUnionOf } from '@ndinatale/ts-type-validation'

class Bar {
}

class Foo {

  @ValidateParams()
  testMethod(@IsUnionOf(['string', 'number']) bar: [string, number],
             @IsUnionOf(['number', 'string'], () => console.error('some custom function')) foobar: [number, string],
             @IsUnionOf(['boolean', Object]) barfoo: [boolean, Object],
             @IsUnionOf([Bar, 'symbol']) foo: [Bar, symbol]): void {
    // ...
  }
}
```

---

## Contributing

Steps to contribute will be added soon.


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**