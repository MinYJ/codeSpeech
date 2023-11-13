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

// 변수의 생명주기는 눈에 보이지 않는다
// 눈에 보이는 형태로 lifeCyle이 잡혀있지 않는다
// 왜냐하면 함수호출할때 참조로 보내거나 다른 자료구조의 참조로 잡혀있기 때문에 쉽게 파악되지 않는다.
// 문자열로 병합하는 로직에서는 병합로직을 독립시킬 방법이 없다
// 이전에는 문자열 ,와 ] 같은 것들을 흘리고 다녔다

// 왜 흘리고 다녔을까??
// 문자열과 알고리즘을 분리하는데 실패했기때문이다
// 왜 실패했을까??

//       return recursive(arr, acc + arr[i] + ',', i + 1, stack);
// 를 보면 + , 알고리즘이 섞여 있기 때문이다
// 연산하지만 도에민이기때문에 알고리즘이라고 한다

// 로직과 데이터를 분리하려면 결국 데이터 스토리지를 구성해야한다
// 이전에 만들었던 acc로는 로직과 데이터를 분리할 수 없다
// 결합해서 만들 수 밖에 없기때문에....
// 이것이 문자열을 스토리지 사용할 때 약점이다


/*
const arrToString = arr=>{
  let accStr = "";
  for(const v of acc) accStr += "," + v;
  accStr = `[${accStr.substring(1)}]`;
}
const recursive = (arr, acc, i, stack)=>{
  if(i < arr.length){
    // 각 원소를 문자열로 환원하여 다른 배열에 담아둔다.
    const currEl = arr[i];
    // 그런데 원소가 배열인 경우는 스택을 이용해서 일반화된 재귀가 모두 해결하게(스택머신을 이용해) 그 경우를 다끼워넣자
    if(Array.isArray(currEl)){
      stack.push([arr, acc, i + 1]);
      return recursive(currEl, [], 0, stack);
    } else {
      acc.push(""+arr[i]);
      return recursive(arr, acc, i + 1, stack);
    }
  }else{
    // 원소별 문자열로 환원된 배열을 이용해서 통합 문자열을 만든다.
    const accStr = arrToString(acc);
    const prev = stack.pop();
    if(prev){
      const [prevArr, prevAcc, prevIndex] = prev;
      prevAcc.push(accStr);
      return recursive(prevArr, prevAcc, prevIndex, stack);
    }else{
      return accStr;
    }
  }
}
*/


/*
** #정리
** 1. 변수의 라이프사이클은 코드의 형태와 일치하는 것은 아니다 
** 2. 설계에 일치한다 -> 3. 원하는 의도에 맞게 변수를 설정한다
** if, if-else, for, while의 의미정확하게 알기 + 변수의 스코프, 라이프사이클을 정확하게 알아야 한다.
*/


//(8) binary mandatory의 증거
const arrToString = arr=>{
  let accStr = "";
  for(const v of acc) accStr += "," + v;
  accStr = `[${accStr.substring(1)}]`;
}
const recursive = (arr, acc, i, stack)=>{
  if(i < arr.length){
    const currEl = arr[i];
    let [resultArr, resultAcc, resultIndex] = elementProcess(currEl, arr, acc, i, stack);
    return recursive(resultArr, resultAcc, resultIndex, stack);

    resultArr, resultAcc, resultIndex;
    if(Array.isArray(currEl)){
      stack.push([arr, acc, i + 1]);
      resultArr = arr[i];
      resultAcc = [];
      resultIndex = 0;
    } else {
      acc.push(""+arr[i]);
      resultArr = arr[i];
      resultAcc = [];
      resultIndex = i+1;
    }
    return recursive(resultArr, resultAcc, resultIndex, stack);

  } else{
    const accStr = arrToString(acc);
    const prev = stack.pop();
    if(prev){
      const [prevArr, prevAcc, prevIndex] = prev;
      prevAcc.push(accStr);
      return recursive(prevArr, prevAcc, prevIndex, stack);
    }else{
      return accStr;
    }
  }
}

/*
** if-else가 동등한 제어 레벨의 필수적인 항목을 기술한다는걸 이해하는 것만으로도 이 수준으로 올라 갈수 있다
*/


/*
** if를 제거하는방법
** 선행해서 모든 전략객체가 같은 인터페이스(인자의 모양과 반환값의 모양)를 갖도록 조정
*/

// 원래 분기해야할 경우의 수만큼 "전략객체"를 만들고
// 기준 상태를 판정하여 적합한 전략객체를 매칭하는 매퍼 == 라우터

/*
** 1. OCP
** 2. IOC
** 3. 복잡성정복 - 격리를 통해 한 번에 다룰 복잡성을 줄이기 => 응집도, 결합도가 낮은 독릭적인 모듈로 만들어서 정복
*/

// 문을 식(함수값, 전략객체, 커맨드객체)으로변경
// 원래 제어문이었던 것을, 함수라는 그릇에 담아 값으로 변경한 뒤 원하는 함수값을 필요시마다 선택해서 사용
// 장점은 ...문은 코드 작성시 확정되므로 변경하려면 코드를 변경하고 확인해야하나,
// 함수화된 값은 코드 실행시 원하는 함수를 선택할 수 있으므로 필요한 코드를 대입할때 사용하는 측의 코드는 변경할 필요가 없다

// 함수본질 문을 담아 식으로 사용할 수 있는 그릇

/*
** 일단 문을 식으로 만들면...
** 반복적으로 그 제어문을 사용할 수 있고
** 일반화만 시키면 인자에 따라 여러 문제를 하나의 로직으로 해결할 수 있고
** 필요할때까지 실행을 안 시킬 수 있고
** 여러개를 만들어 필요시마다 다른 제어문을 사용할 수 있다
*/

// 개발을 잘 못하는 이유는 함수, 제어문, 변수의 사용법을 잘 모르기 떄문이다

// 스코프: 변수를 인식할 수 있는 범위
// 라이프사이클: 변수가 살아있는 기간

// 변수의 스코프: 권한, 범위 x
// 이 변수를 인식할 수 있는 공간, 그 변수를 인식할 수 있는 범위


// 결합도의 무게를 줄이려면 컬렉션을 배제해야한다
/*
** 컬렉션의 책임은 단일 값보다 크다
** 반드시 필요한 경우가 아니면 컬렉션을 사용하지 않는다.
*/

// 1. parent.children = [child, child]

// 2.
// child1.parent = p1
// child2.parent = p1