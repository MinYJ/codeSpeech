//4. 
/*
** 정규식은 실행했을때 일치하지 않을경우 null이 나온다
** 일치하면 배열이 나온다
** 배열의 0은 전체 문자열, 문자열의 1번요소부터 배열에 인덱스1번에 들어간다
*/
const rNum = /^\s*([0-9]+)\s*,?/
const parse = (str, acc, stack)=>{
  const v = str.trim();
  if(!v) return acc;
  switch(v[0]){
    case'[':
      stack.push(acc);
      return parse(v.substring(1), [], stack);
    case']':
      const prev = stack.pop();
      console.log(`prev: `, prev);
      console.log(`acc: `, acc);
      prev.push(acc);
      console.log('푸쉬후: ', prev);
      return parse(v.substr(1), prev, stack);
    default:
      const value = rNum.exec(v);
      console.log(value[0]);
      console.log(value[1]);
      console.log(value);
      console.log(v.substr(value[0].length));
      if(!value) throw "invalid value: " + v;
      acc.push(parseFloat(value[1]));
      return parse(v.substr(value[0].length), acc, stack);
  }
}

// parse("[1,2,3,[1,2,[3,4]]]", [], []);
// [1,[2,[3]]]
const a = parse("[1,[2,[3]]]", [], []);
// console.log(a);


// const v = "3]]]";
// const value = rNum.exec(v);
// console.log(value);
// console.log(v.substr(value[0].length));
// console.log(value[0]);
// console.log(value[0].length);
// console.log(value[1]);

// const v = "[1,[2]]";
// console.log(v[0]);
// console.log(v.substring(1));

// const array = [1];
// array.push([]);
// console.log(array);
//3. -> 배열: 1, 234, 3]
/*
** 시작부터 공백이 있을 수 있다
** \는 공백문자를 뜻한다, *는 0개이상이 있을수도 있다
** -> * ----- {0, }는 같은 표현이다
*/

/*
** [0-9]는 숫자를 의미한다
** + ----- {1, }는 1개 이상을 의미한다 
*/

/*
** ? ----- {0, 1}의 뜻은 있을 수도 없을 수도 있다는 뜻이다
*/
// const rNum = /^\s*([0-9]+)\s*,?/



// 2.
// const parse = (str, acc, stack)=>{
//   const v = str.trim();
//   if(!v) return acc;
//   switch(v[0]){
//     case'[':
//       stack.push(acc);
//       return parse(v.substring(1), [], stack);
//     case']':
//       const prev = stack.pop();
//       prev.push(acc);
//       return parse(v.substr(1), prev, stack);
//     default:

//       return;
//   }
// }
// const arr ='abc';
// console.log(arr.substring(1));





// 1.
// const parse = (str, acc, stack)=>{
//   const v = str.trim();
//   if(!v) return acc;
//   switch(v[0]){
//     case'[':
//       return;
//     case']':
//       return;
//     default:
//   }
// }