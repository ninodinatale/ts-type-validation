export const CUSTOM_ERROR = 'custom error';

// These are all existing types. Everything which is not a primitive falls under the Object type.
export const TYPES = {
  primitiveObject: [
    Object.create(null)
  ],
  object: [
    {},
    Object(),
    new Object(),
  ],
  number: [
    1,
    1.1,
    -1,
    -1.1,
    Infinity,
    -Infinity,
    NaN,
    Number(1),
    0xf00d,
    0b1010,
    0o744,
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
    ``,
    String('')
  ],
  'function': [
    () => {
    },
    function () {
    }],
  'null': [
    null
  ],
  'undefined': [
    undefined
  ]
};