// import { PropertyDecoratorFunction, ErrorFunction, ExpectedType } from './core/types';
// import { installValidatorForProperty, ordinaryIsValidFn } from './core';
//
// /**
//  * It cannot be checked if a value is an intersection of `n` objects since it is only possible to get the
//  * properties of the `intersectionTypes` which are defined. Possible workaround would be to define all
//  * properties of the intersectionTypes as `undefined` or any other value. Then it would be possible to
//  * instantiate the intersection type and iterate over the keys with `Object.keys()`. Nonetheless it is much
//  * cleaner to just create a wrapper object with properties with type of the intersection types.
//  *
//  * @param intersectionTypes The object constructor of the desired types.
//  * @param errorFn The function which is being executed on invalid assignments.
//  */
// export function IsIntersectionOf(intersectionTypes: Object[], errorFn?: ErrorFunction): PropertyDecoratorFunction {
//   return (target: any, key: string) => {
//     installValidatorForProperty.bind({
//       expectedType: {intersection: intersectionTypes},
//       errorFn: errorFn,
//       isValidFn: (value: any) => _isValidIntersection.call(null, value, intersectionTypes)
//     })(target, key);
//   };
// }
//
// function _isValidIntersection(value: any, intersectionTypes: Object[]): boolean {
//   if (typeof value === 'object') {
//     return intersectionTypes.every((type: Object) => {
//       return Object.keys(type).every(key => {
//         return value.hasOwnProperty(key)
//       });
//     });
//   } else {
//     return false;
//   }
// }
