//example9
const err = msg => {throw msg};
const _tailRecursiveSum = (array, i, acc) => i > -1 ? _tailRecursiveSum(array, i - 1, array[i] + acc) : acc;
const tailRecursiveSum = (array) => _tailRecursiveSum(array, array.length - 1, 0);

const iterateSum = array => {
  let acc = 0;
  let i = array.length - 1;

  const f = ()=> acc = array[i] + acc;

  for (; i > -1; i = i - 1) f();
  return acc
}

//example8
// const iterateSum = array => {
//   let acc = 0;
//   let i = array.length - 1;

//   const f = ()=> acc = array[i] + acc;

//   for (; i > 0; i = i - 1) f();

//   acc += (array[0] ?? err("invalid element index0"))
//   return acc
// }


//example7
// const err = msg => {throw msg};
// const _tailRecursiveSum = (array, i, acc) => i > 0 ? _tailRecursiveSum(array, i - 1, array[i] + acc) : (array[0] ?? err("invalid element index0")) + acc
// const tailRecursiveSum = (array) => _tailRecursiveSum(array, array.length - 1, 0);

// const iterateSum = array => {
//   let acc = 0;
//   for (let i = array.length - 1; i > 0; i = i - 1) {
//     acc = array[i] + acc;
//   }
//   acc = (array[0] ?? err("invalid element index0")) + acc;
//   return acc
// }
//example6
// const arraysum = arr=>{
//   const elementSum = (arr, i, acc) => {
//     if (arr.length === i) return acc;
//     return elementSum(arr, acc + arr[i], i + 1)
//   };
//   return elementSum(arr, 0, 0);
// };



//example5
// const sum = (()=>{
//   const elementSum = (arr, i, acc) => {
//     if (arr.length === i) return acc;
//     return elementSum(arr, acc + arr[i], i + 1)
//   };
//   return arr => elementSum(arr, 0, 0);
// })();

//example4
// const _sum = (arr, i, acc) => {
//   if (arr.length === i) return acc;
//   return _sum(arr, acc + arr[i], i + 1);
// }

// const sum = arr => _sum(arr, 0, 0);


//example3
// const validator = {
//   data:[
//     (array, el)=> Array.isArray(array),
//     (array, el)=> typeof el == `number`
//   ],
//   validate(array, index){
//     return this.data.every(vail=>vali(array, array[index]));
//   }
// };

// const recursive = (array, index = 0, acc = 0) =>{
//   if(!validator.validate(array, index)) throw `invalid arguments, array: ${array}, element: ${array[index]}`;
//   return recursive(array, index+1, acc + array[index]);
// }

// const array = [1, 2, true];
// recursive(array);


//example2
// const validator = [
//   (list, el)=> Array.isArray(list),
//   (list, el)=> typeof el == `number`
// ];

// const recursive = (array, index = 0, acc = 0) =>{
//   if(!validator.every(vail=>vail(array, array[index]))) throw `invalid arguments, array: ${array}, element: ${array[index]}`;
//   return recursive(array, index+1, acc + array[index]);
// }

// const array = [1, 2, true];
// recursive(array);

// example1
// const listValidator = list=>Array.isArray(list);
// const elementValidator = v=>typeof v == 'number';

// const recursive = (array, index = 0, acc = 0) =>{
//   if(!listValidator(array)) throw `invalid list ${list}`;
//   if(!elementValidator(array[index])) throw `invalid element ${index}:${array[index]}`;
// }