// export interface Types {
//   number: (number)[];
//   symbol: symbol[];
//   boolean: (boolean)[];
//   string: (string)[];
//   null: any[];
//   function: (() => void)[];
//   object: any[];
//   undefined: undefined[];
// }
//
// // These are all existing types. Everything which is not a primitive falls under the Object type.
// export const TypeValues: {[key in keyof Types]: any[]} = {
//   object: [
//     {},
//     Object(),
//     new Object(),
//     new Number(1),
//     new String('1'),
//     new Boolean(true)
//   ],
//   number: [
//     1111,
//     1111.1111,
//     -1111,
//     -1111.1111,
//     Infinity,
//     -Infinity,
//     NaN,
//     Number(1111),
//     0xf00d,
//     0b1010,
//     0o744
//   ],
//   boolean: [
//     true,
//     false,
//     Boolean(),
//     Boolean(true),
//     Boolean(false)
//   ],
//   symbol: [
//     Symbol()
//   ],
//   string: [
//     '',
//     ``,
//     String('')
//   ],
//   'function': [
//     () => {
//     },
//     function () {
//     }],
//   'null': [
//     null
//   ],
//   'undefined': [
//     undefined
//   ]
// };
