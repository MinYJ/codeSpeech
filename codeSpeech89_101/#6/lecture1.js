// 4. 테스트
const map = (iter, block)=>({
  next(){
    const {done, value} = iter.next();
    console.log(`map_done: `,done);
    console.log(`map_value: `,value);
    if(!done) return {done, value:block(value)};
    else return {done};
  }
})

const iter = iter => ({
  [Symbol.iterator](){return iter;}
});

const filter = (iter, block) => ({
  /*
  ** 인자로 배열이 아닌 iterator를 받아서 처리하겠다
  ** 목적: iterator객체를 반환한다
  */
  next(){
    /*
    **  filter의 next()를 호출하면, iterator의 next()호출해서 반환한다
    */
    let {done, value} = iter.next();
    console.log(`done: `, done);
    console.log(`value: `, value);
    /*
    ** next()를 열어서 제일 먼저확인해야할것 done인지 아닌지 확인하기
    */
  while(!done) {
    if(block(value)) return {done:false, value};
    ({done, value} = iter.next());
    console.log(`while_done: `, done);
    console.log(`while_value: `, value);
  }
  return {done};
  }
});

//(4.1)
//const f = [...iter(filter([1,2,3,4,5][Symbol.iterator](), v=>v%2))];
//const test = [...iter(filter([1,2,3,4,5][Symbol.iterator](), v=> v%2))];

//(4.2)
const test = [...iter(map(filter([1,2,3,4,5][Symbol.iterator](), v=> v%2), v=>v*2))];
console.log(test);


//(4.)
// const f = [...iter(map(filter([1,2,3,4,5][Symbol.iterator](), v=> v%2), v=>v*2))];


// 3. map을 iterator로 만들기
// const map = (iter, block)=>({
//   next(){
//     const {done, value} = iter.next();
//     if(!done) return {done, value:block(value)};
//     else return {done};
//   }
// })

// const iter = iter => ({
//   [Symbol.iterator](){return iter;}
// });
// // 2. filter를 iterator로 만들기

// const filter = (iter, block) => ({
//   /*
//   ** 인자로 배열이 아닌 iterator를 받아서 처리하겠다
//   ** 목적: iterator객체를 반환한다
//   */
//   next(){
//     /*
//     **  filter의 next()를 호출하면, iterator의 next()호출해서 반환한다
//     */
//     let {done, value} = iter.next();
//     /*
//     ** next()를 열어서 제일 먼저확인해야할것 done인지 아닌지 확인하기
//     */
//    while(!done) {
//     if(block(value)) return {done:false, value};
//     ({done, value} = iter.next());
//    }
//    return {done};
//   }
// });

// 1.
// const iterable = {
//   [Symbol.iterator](){
//     const arr = [1,2,3,4];
//     let cursor = 0;
//     return {
//       next() {
//         return {done: cursor >= arr.length, value:cursor < arr.length ? arr[cursor++] : undefined};
//       }
//     }
//   }
// }

// const iter1 = iterable[Symbol.iterator]();
// console.log(iter1.next());
// console.log(iter1.next());
// console.log(iter1.next());
// console.log(iter1.next());
// console.log(iter1.next());

// const [a, b, ...arr] = iterable
// console.log(a, arr);

/*
** 우리가 보기에 배열처럼 보이지만
** 사실은 하나하나 얻을때마다 next()를 호출해서 얻은것이다
*/

/*
** iterable를 객체는 iterator를 토해내기 위해서 감싸기만 하면된다
** iterator만 생각하자
*/