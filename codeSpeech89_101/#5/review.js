// example3
const objEntries = function*(obj){ // 코루틴: 값이 오브젝트인 경우 이터레이터로 변환하기
  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
}
const convert = v=> "" + v; // 하나의 값을 문자열로 바꾸기

const accuToString = (isObject, acc) => { // 쌓여있는 링크드트리를 이용해 문자열로 종합하기
  // {
  //   prev: accu, 이전 노드 링크
  //   isObject: Array.isArray(value), 오브젝트의 값인지 배열값인지
  //   element:value, 문자열로 바꿀값 오브젝트인 경우는 [k, v], 배열의 원소인 경우는 직접 값이 들어있음
  // }

  // 여닫는 문자열 확정

  // (1.1) 수정전
  // let START, END;
  // if(acc.isObject){
  //   START = "{";
  //   END = "}";
  // } else {
  //   START = "[";
  //   END = "]";
  // }
  // (1.2) 수정후
  const [START, END] = isObject ? "{}" : "[]"; // 문자열은 원래 이터레이터라서 분해가 됨

  let result = "";
  if(acc.prev) {
    let curr = acc;
    do {
      result = "," + (isObject ? `"${curr.value[0]}":${convert(curr.value[1])}` : convert(curr.value)) + result;
    } // 수정 전: while(curr = curr.prev && curr.prev); //최조 시작시에도 acc는 있으므로 그 acc.prev가 없는지로 더 갈지 판단
    while(curr = curr.prev);
    result = result.substring(1);
  }
  return START + result + END;
}

const recursive = (iter, isObject,accu, prev) => { // object를 인자로 던지는 이유는 모든 원소가 다 object상태를 가질 필요는 없기 때문이다
  const {done, value} = iter.next();
  console.log(done, value);
  if(!done) {
    // 수정전
    // const v = Array.isArray(value) ? value[1] : value;

    // 수정후
    const v = isObject ? value[1] : value;
    switch(true) {
      case Array.isArray(v):
        return recursive(v[Symbol.iterator](), false, null, {target:iter, isObject, accumulation: accu, prev: prev});
      case v && typeof v == "object":
        return recursive(objEntries(v), true, null, {target: iter, isObject, accu, k:value[0], prev});
      default:
        // 수정전
        // return recursive(iter, {
        //   prev: accu,
        //   isObject: Array.isArray(value),
        //   element:value,
        // }, prev);

        // 수정후
        return recursive(iter, isObject, {prev: accu, value}, prev);
    }
  } else {
    let accuStr = accuToString(isObject, accu);
    console.log(accuStr)
    if(prev) {
      return recursive(prev.target, prev.isObject, {prev: prev.accu, value: [prev.k, accuStr]}, prev.prev);

      // return recursive(prev.target, prev.isObject, {prev: prev.accumulation, value: accuStr}, prev.prev);
      // object일 경우 value의 키값을 보내야 하는데 단순히 value값만 보냈다
    } else {
      return accuStr;
    }
  }
};

const stringify = v=>recursive(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), !Array.isArray(v), null, null);
// 테스트1
//stringify({a:3, b:5});

// 테스트2
// 오류가 날 경우 단순화 작업을 한다
//stringify( {a:3, b:5, c[1,2,[3,4,{a:4, b:5}, 7], 3], d:3});
stringify({a:[1,2]});
/*
** return recursive(v[Symbol.iterator]
** return recursive(v[Symbol.iterator]() 수정
** 내가 원소의 배열을 보냈는데 배열로 보냈더니 그 iter에는 next가 없다
** 배열은 이터를 제대로 안보냈네? 찾았다
*/

/*
** return recursive(prev.target, prev.isObject, {prev: prev.accumulation, element: accuStr}, prev.prev);
** return recursive(prev.target, prev.isObject, {prev: prev.accumulation, value: accuStr}, prev.prev);
*/




// example2
// const accuToString = finalNode => {
//   if(!acc.prev) return acc.isObject ? "{}" : "[]";
//   /*
//   ** 처음에는 acc가 null인지 확인해봐야한다
//   ** (만약 null이면)으로 시작하고 싶지만 빈 오브젝트면 적용되지 않는다
//   ** 그래서 type을 주어야한다
//   ** prev를 null인지 검사하는것은 마지막이 null로 끝난다고 가정하고 있기 때문이다
//   ** 하지만 null로 끝나면 빈 오브젝트인지 빈 배열인지 알 수 없다
//   ** 내가 [], {} 무엇을 넣었는지 알 수 없다
//   */
//   let curr = acc, result = "";
//   convertor.convert(value);
//   do {
//     result = "," + (curr.isObject ? `"${curr.element[0]}" : ${convert(curr.element[1])}` : convert(curr.element))
//   } while(curr = curr.prev);
//   return curr.isObject ? "{" + str.substring(1) + "}" : "[" + result + "]";
// }

const _tailRecursionArrayStringify = (arr, accu, i, prev) =>{
  const {done, value} = iter.next();
  if(!done) {
    const v = Array.isArray(value) ? value[1] : value;

    /*
    ** value를 얻어올때 value가 2가지 있다
    ** 배열때문에 얻게된 value는 element가 있다
    ** object로 얻은 value는 2차원 배열이 들어있다

    */
    switch(true) {
      case Array.isArray(v): // 배열이라면??
        return _tailRecursionArrayStringify(v[Symbol.iterator], null, {target: iter, acccumulation: accu, prev:prev});  // 이번 원소를 새로운 배열로 해서 새롭게 간다
      case v && typeof v == "object":
        return _tailRecursionArrayStringify(objEntries(v), null, {target: iter, acccumulation: accu, prev:prev});  // 이번 원소를 새로운 배열로 해서 새롭게 간다
      default:
        return _tailRecursionArrayStringify(iter, {
          prev: accu,
          isObject:Array.isArray(value),
          element: value,
        }, prev);
    }
  } else {
    let accuStr = accuToString(accu); // 2pass 일단 쌓여있던 acc를 2pass돌려서 문자열로 해소해
    if(prev) { // 아직 스택남았나?? 거기로 복귀한다
      return _tailRecursionArrayStringify(prev.array, {prev: prev.acccumulation, element: accuStr}, prev.index, prev.prev);
    } else { // 일 끝났다
      return accuStr;
    }
  }
}

// example1
// const accuToString = finalNode => {
//   let arr = [];
//   let currNode = finalNode;
//   if(finalNode) {
//     do {
//       arr.unshift(currNode.element);
//     } while(currNode = currNode.prev);
//   }
//   let str = "";
//   for(const s of arr) str += "," + v;
//   return "[" + str.substring(1) + "]";
// }

// const _tailRecursionArrayStringify = (arr, accu, i, prev) =>{
//   if(i < arr.length) { // 아직 루프중이다
//     const el = arr[i]; // 현재원소이다
//     if(Array.isArray(el)) { // 배열이라면??
//       prev = {array: arr, acccumulation: accu, index:i+1, prev:prev}; // 되돌아갈 포인트를 검색하고
//       return _tailRecursionArrayStringify(arr, accu, i + 1, prev);  // 이번 원소를 새로운 배열로 해서 새롭게 간다
//     } else {
//       accu = {prev: accu, element: convertor.convert(el)}; // 배열아니면 acc를 갱신하자  1pass
//       return _tailRecursionArrayStringify(arr, accu, i + 1, prev);
//     }
//   } else {
//     let accuStr = accuToString(accu); // 2pass 일단 쌓여있던 acc를 2pass돌려서 문자열로 해소해
//     if(prev) { // 아직 스택남았나?? 거기로 복귀한다
//       return _tailRecursionArrayStringify(prev.array, {prev: prev.acccumulation, element: accuStr}, prev.index, prev.prev);
//     } else { // 일 끝났다
//       return accuStr;
//     }
//   }
// }


/*
** 배열, 오브젝트 둘 다 iterator를 만들 수 있다
*/

// 배열 iterator 만들기
// const iterator = [1,2,3,4,5][Symbol.iterator]();
// [...a] = [1,2,3,4,5][Symbol.iterator]();
// console.log(a)