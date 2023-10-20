// 1. tail recursion 적용 전
// const sum = v=>v + (v > 1 ? sum(v - 1) : 0);
// const result = sum(3);
// console.log(result);

// 2. tail recursion 적용 후
// const sum = (v, prev = 0) => {
//   prev += v;
//   return (v > 1 ? sum(v - 1, prev) : prev);
// }
// sum(3)

// 3. 
const sum = (v) => {
  let prev = 0;
  while(v > 1) {
    prev += v;
    v--;
  }
  return prev;
}