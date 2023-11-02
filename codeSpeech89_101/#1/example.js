//example6
/*
** const _sum =(v, acc = 0)=> v > 1 ? _sum(v - 1, acc + v) : 1+acc;
** const sum =v=>_sum(v,0);
**
*/

const sum=v=>{
  let acc = 0;
  for(let i = v; i > 1; i--) acc += i;
  acc += 1;
  return acc;
}


//example5
// const sum = (num)=>{
//   let sum=0;
//   for(let i=1; i<=num; i++){
//     sum = sum + i;
//   }
//   return sum;
// }
// console.log(sum(10));

// if(1){
//   const v = 10;
//   let acc = 0;
//   for(let i = v; i > 1; i--) acc = acc + i;
//   acc = acc + 1;
// }

//example4
/**
 ** v + sum(v-1)
 ** v +연산을 해야하기때문에 메모리를 해제할 수 없는 상황이다
 ** 함수를 호출하고나서 갔다와서 할일이 있는 상황이라면 함수안 인자를 바꿔줘야한다
 */
//const sum = v=> v > 1 ? v + sum(v-1) : 1;

//const sum =(v, acc = 0)=> v > 1 ? sum(v - 1, acc + v) : 1+acc;

// const sum =(v, acc = 0) =>{
//   if(v > 1){
//     console.log(`v: `, v);
//     return sum(v - 1, acc + v)
//   } else {
//     console.log(`v: `, v);
//     return 1+acc;
//   }
// } 
// console.log(sum(3));

/*
** 사용자를 위한 함수 만들기
*/
// const _sum =(v, acc)=> v > 1 ? _sum(v - 1, acc + v) : 1+acc;
// const sum = v=> _sum(v, 0);
// console.log(sum(10));



//example3
// let accumulator = 0;
// for(let i = 1; i <= 10; i++) {
//   accumulator += i;
// }

// const sum = v=> v > 1 ? v + sum(v-1) : 1;



// example2
// const routineA = arg=>routineB(arg * 2);
// const routineB = arg=>arg * 3;

// const b = 10;
// const a = routineA(b);

// example1
// const routineA = b=>{
//   const result = b * 2;
//   console.log(result);
//   return result;
// };

// const routineB = d=>{
//   const result = d * 3;
//   console.log(result);
//   return d;
// }

// const b = 10, d = 30;
// const a = routineA(b);
// console.log(a);
// const c = routineB(d);
// console.log(c);
// console.log(`b: ${b} d: ${d}`);