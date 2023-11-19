// @@@@@example6 -> 과제@@@@@
// (6.1)
// const f =_=>{
//   console.log(`ffff`);
//   return [];
// }

// /*
// ** iterator는 next()를 호출하면 값을 알 수 있기때문에 i가 필요하지 않다
// */
// const recursive = (iter, acc)=>{
//   const {done, value:[k, v] = f()} = iter.next();
//   // f()는 value가 undefined이기전 까지는 절대로 호출되지 않는다

//   //const {done, value:[k, v] = []} = iter.next();
//   //value는 k,v로 해체할 것이다 undefined일경우를 대비해서 기본객체를 잡아줄 것이다
//   //기본객체는 undefined가 아니면 아예 생성이 되지 않는다
// }

// (6.2) answer // stringify({a:3, b:"abc"})
const objEntries = function*(obj){
  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
}
const join = acc=>{
  if(!acc) return "{}";
  else{
    let target = acc;
    let result = "";
    do {
      result = result + `,"${toString(target.k)}":"${toString(target.v)}`
    } while(target = result.prev)
    return "{" + result.substring(1) + "}";
  }
}

const recursive = (iter, acc)=>{
  const {done, value:[k,v] = []} = iter.next();
  // console.log(done)
  // console.log([k,v])
  // console.log(acc);
  return done ? join(acc) : recursive(iter, {prev:acc, k, v});
/*
** 순 방향이었던 iterator를 역방향이었던 previous에 acc를 넣은것 밖에 없다
*/
}

//(6.2.1) tail recursive
const stringify = obj => recursive(objEntries(obj), null);
console.log(stringify({a:3, b:"abc"}));


// (6.2.2) loop
// const stringify = obj =>{
//   let acc = null, iter= objEntries(obj);
//   while(true){
//     const {done, value:[k,v] =[]} = iter.next();
//     if(done) return join(acc);
//   }
// }

// @@@@@example5@@@@@
// const objEntries = function*(obj){
//   for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
// };

// const test = objEntries({a:3, b:5});
// const [[k1, v1]] = test;
// console.log(k1,v1);
// console.log(test,test.next);
/*
** test is not iterable이 나오는 이유??
** generator가 만든 iterator는 한 번이라도 iteration에 참가하게 되면
** next는 여전히 존재하지만 closed라는 native속성이 들어가면서 더 이상 iterator가 아니게 된다
** 한 번 iteration이 일어나면 iteration이 두 번 다시 일어날 수 없게끔 종료시키는 효과가 있다
** 사람이 만든 iterator는 괜찮다
*/
// const [[k2, v2]] = test;
//console.log(k2,v2);


// (6.3)
// 함수형에서는 pipe라고부른다
[1,2,3,4,5,6,7].filter(it=>it%2).map(it=>it*2);

// @@@@@example4 -> 한 번에 해체해버리기@@@@@
// const objEntries = function*(obj){
//   for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
// }

// const test = objEntries({a:3, b:5});
// const [aaa, bbb] = test;
// console.log(aaa)
// console.log(bbb);



// @@@@@example3@@@@@
// const objEntries = function*(obj){
//   for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
// }
// const test = objEntries({a:3, b:5});
// const action = (...a)=>console.log(a);
// action(...test);




// @@@@@example2@@@@@
// const objEntries = function*(obj){
//   for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
// }

// const objEntries = function(obj){
//   for(const k in obj) {
//     if(obj.hasOwnProperty(k)) {
//       console.log(k);
//       console.log(obj[k]);
//     } 
//   }
// }

// const test = objEntries({a:3, b:5});
// const [...a] = test;
// console.log(a);

// const test = objEntries({a:3, b:5});
// for(const [k, v] of test) console.log(k, v);




// @@@@@@example1@@@@@@@
// const objEntries = function*(obj){
//   for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
// }

// const test = objEntries({a:3, b:5});
// const call0 = test.next();
// const call1 = test.next();
// const call2 = test.next();
// console.log(call0, call1, call2);

/*
** 제네레이터
** 총11회를 돌았다 이것을 7회 혹은 4회만 돌 수 없을까??
** [1,2,3,4,5,6,7].filter(it=>it%2).map(it=>it*2)
*/