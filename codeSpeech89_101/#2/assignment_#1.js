/*
** 1차원 배열의 합 재귀, 꼬리 재귀 -> 번역한 for
[1,2,3,4,5,6,7]
*/

const array = [1,2,3,4,5];

// 번역한 for
// const sum = array =>{
//   let acc = 0;
//   for(const element of array) {
//     acc = acc + element;
//   }
//   return acc;
// }


// 꼬리 재귀
const recursive = (array, acc = 0, index = 0)=> {
  if(!Array.isArray(array)) throw new Error(`invalid array ${array}`);
  if(typeof array[index] !== `number`) throw new Error(`invalid element ${array[index]}`);
  if((array.length - 1) == index) return acc + array[array.length - 1];
  return recursive(array, array[index] + acc, index+1);
}

const recursive_user = (array)=>{
  return recursive(array);
}

// console.log(recursive_user([true], 0, 0));

let result = 0;
try{
  result = recursive_user(3);
} catch(e){
  result = e;
}

console.log(result);