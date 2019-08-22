export const CUSTOM_ERROR = 'custom error';

export interface TypesForTest {
  number: (number)[];
  symbol: symbol[];
  boolean: (boolean)[];
  string: (string)[];
  // null: any[];
  function: (() => void)[];
  object: any[];
  // undefined: undefined[];
  // enum: [];
  // literal: [];
  // tuple: [];
  // union: [];
}

// These are all existing types. Everything which is not a primitive falls under the Object type.
export const TYPES: {[key in keyof TypesForTest]: any[]} = {
  object: [
    {},
    Object(),
    new Object(),
    new Number(9999),
    new String('9999'),
    new Boolean(true)
  ],
  number: [
    1111,
    1111.1111,
    -1111,
    -1111.1111,
    Infinity,
    -Infinity,
    NaN,
    Number(1111),
    0xf00d,
    0b1010,
    0o744
  ],
  boolean: [
    true,
    false,
    Boolean(),
    Boolean(true),
    Boolean(false)
  ],
  symbol: [
    Symbol()
  ],
  string: [
    '',
    'test',
    ``,
    `test`,
    String(''),
    String('test'),
  ],
  'function': [
    () => {
    },
    function () {
    }],
  // 'null': [
  //   null
  // ],
  // 'undefined': [
  //   undefined
  // ],
  // enum: [],
  // literal: [],
  // tuple: [],
  // union: []
};
