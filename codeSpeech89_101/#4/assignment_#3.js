// 문제: [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1,2]]]

// example1
// (1)
// const recursive = (arr, acc, i, stack)=>{
//   if(Array.isArray(arr[i])){}
// }

/*
** i(인덱스)가 배열의 길이를 넘으면 어떡할것인가?
** 빈배열이면 어떻게 처리할 것인가?
*/

/*
  const stringify = arr => !arr.length ? '[]' : `배열`;
  console.log(stringify([]));
*/

/*
** 일반화를 위해서 ?!연산자 분기 처리를 해서는 안된다
** 일반화: 모든 경우의 수를 처리하는 알고리즘
*/

// 일반화전
// const recursive = (arr, acc, i, stack)=> { }
// const stringify = arr=> !arr.length ? '[]' : recursive(arr, '', 0, []);

// 일반화후
// const recursive = (arr, acc, i, stack)=> { 
//   const recursive = (arr, acc, i, stack)=>{
//     if(Array.isArray(arr[i])){}
//   }
// }
// const stringify = recursive(arr, '', 0, []);


// (2)
// const recursive = (arr, acc, i, stack)=>{
//   if(Array.isArray(arr[i])) {
//     stack.push([arr, i + 1]);
//     return recursive(arr[i], acc + `[`, 0, stack);
//   }
// }

// const stringify = arr => recursive(arr, '[', 0, []);

// (3)
// const recursive = (arr, acc, i, stack)=>{
//   if(Array.isArray(arr[i])) {
//     stack.push([arr, i + 1]);
//     return recursive(arr[i], acc + `[`, 0, stack);
//   } else {
//     if(i < arr.length) {
//       return recursive(arr, acc + arr[i] + ',', i + 1, stack);
//     } else {
//       if(stack.length) {
//         const [prevArr, prevIndex] = stack.pop();
//         return recursive(prevArr, acc.substring(-1) + `],`, prevIndex+1, stack);
//       }
//       else {
//         return acc.substring(-1) + ']';
//       }
//     }
//   }
// }

// (4.1)
// if(i < arr.length) 조건이 현재원소를 판정하는 로직안에 있을까?
// 잘못짠것이다 -> 원소 순수 판정에 들어와야할 이유가 없다
// 원소판정이후 length판정할 게 아니다
// 원소에 포함된 조건이 아니기 때문이다
// 인덱스가 훨씬 더 큰 조건이다
// 원소를 얻을지 말지를 결정하기 전에 왜 원소를 판정하고 있는가?

/*
배열인가?
배열이아닌가? {
  if(인덱스 < 배열길이)
}
*/

// (4.2)
//  현재스택을 기록하고 다음스택을 기록하는 로직이 나뉘어져 있다
//  a.현재스택을 그냥담고 b.전개시는 인덱스+1 하는 로직이 분산되어있다
//  분산되어있기에 유지보수 하기가 어렵다(응집성이 떨어졌기 때문)
//     return recursive(arr[i], acc + `[`, 0, stack);
//         return recursive(prevArr, acc.substring(-1) + `],`, prevIndex+1, stack);

// const recursive = (arr, acc, i, stack)=>{
//   if(i < arr.length){
//     const currEl = arr[i];
//     if(Array.isArray(currEl)){
//       stack.push([arr, i + 1]);
//       return recursive(currEl, acc +`[`, 0, stack);
//     } else {
//       return recursive(arr, acc + toString(arr[i]) + ',', i + 1, stack);
//     }
//   }else{
//     const pre = stack.pop();
//     if(pre){
//       const [prevArr, prevIndex] = prev;
//       return recursive(prevArr, acc.substring(-1) + `]`, prevIndex, stack);
//     }else{
//       return acc.substring(-1) + ']';
//     }
//   }
// }

// (5) 처리해야할 문제
//  ']'의 중복과 ','의 문제가 있다
// ','의 문제는 개별원소를 문자열로 더하기 있기에 사전의 문자열 합치면서 나타나는 문제이다
// 시작과 끝이 괄호를 닫지 않으려면 어떻게 해야할까? 
// 끝나는 순간 한 꺼번에 []를 해야한다
//       return recursive(prevArr, acc.substring(-1) + `]`, prevIndex, stack);
//     }else{
//       return acc.substring(-1) + ']';

// const recursive = (arr, acc, totalAcc, i, stack)=>{
//   if(i < arr.length){
//     const currEl = arr[i];
//     if(Array.isArray(currEl)){
//       stack.push([arr, acc, i + 1]);
//       return recursive(currEl, [], totalAcc, 0, stack);
//     } else {
//       acc.push(toString(arr[i]));
//       return recursive(arr, acc, totalAcc, i + 1, stack);
//     }
//   }else{
//     let accStr = "";
//     for(const v of acc) accStr = "," + v;
//     totalAcc.push(`[${accStr.substring(1)}]`);
//     const prev = stack.pop();
//     if(prev){
//       const [prevArr, prevIndex] = prev;
//       return recursive(prevArr, acc.substring(-1) + `]`, prevIndex, stack);
//     }else{
//       return acc.substring(-1) + ']';
//     }
//   }
// }

// const stringify = arr => recursive(arr, [], [], 0, [])


// (6)
// }else{
//   let accStr = "";
//   for(const v of acc) accStr = "," + v;
//   totalAcc.push(`[${accStr.substring(1)}]`);
/*
**    totalAcc는 마지막에 데이터를 담아야 하는데
**    마지막인지 어떻게아나??
*/
//   const prev = stack.pop();
//   if(prev){
//     const [prevArr, prevAcc, prevIndex] = prev;
//     prevAcc.push(accStr);
//     return recursive(prevArr, prevAcc, totalAcc, prevIndex, stack);
//   }else{
//     return '[' + acc.substring(-1) + ']';
//   }
// }

// const arrToString = arr=>{
//   let accStr = "";
//   for(const v of acc) accStr += "," + v;
//   accStr = `[${accStr.substring(1)}]`;
// }
// const recursive = (arr, acc, i, stack)=>{
//   if(i < arr.length){
//     const currEl = arr[i];
//     if(Array.isArray(currEl)){
//       stack.push([arr, acc, i + 1]);
//       return recursive(currEl, [], 0, stack);
//     } else {
//       acc.push(""+arr[i]);
//       return recursive(arr, acc, i + 1, stack);
//     }
//   }else{
//     const accStr = arrToString(acc);
//     const prev = stack.pop();
//     if(prev){
//       const [prevArr, prevAcc, prevIndex] = prev;
//       prevAcc.push(accStr);
//       return recursive(prevArr, prevAcc, prevIndex, stack);
//     }else{
//       return accStr;
//     }
//   }
// }

// const stringify = arr => recursive(arr, [], 0, [])

// (7)
// storage기법에서 lifeCycle, scope 중에서 lifeCylcle이 더 중요하다 
// 우리는 storage를 설계할 때, 얼마나 길게 유지할 storage인지 알고서 사용해야한다
// 어떤 변수의 생명주기를 관리할 수 있어야 한다.
// 쉽게되는사람과 그렇지 않은 사람의 차이점은 무엇일까?