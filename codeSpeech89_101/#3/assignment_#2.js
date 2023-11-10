//example6 tail recursive
const stringCheck = [[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]];
const el = {
  number:v=>v.toString(),
  boolean:v=>v.toString(),
  string:v=>`"${stringCheck.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v)}"`,
  stringify(v){
    return this[typeof v]?.(v) ?? "null";
  }
}

const arrValidator =arr=>{if(!Array.isArray(arr)) throw "invalid arr";}
const EMPTY = {};
const recursive = (arr, acc, i)=>i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1) : `[${acc.substr(1)}]`;

const stringify = arr=>{
  arrValidator(arr)
  if(arr.length == 0) return "[]";
  else {
    //recursive(arr, "", 0);
    let acc = "", i = 0;
    while(i < arr.length) {
      acc = acc + `,${el.stringify(arr[i])}`;
      i = i + 1;
    }
    return `[${acc.substring(1)}]`;
  }
};


//example5
// const stringCheck = [[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]];
// const el = {
//   number:v=>v.toString(),
//   boolean:v=>v.toString(),
//   string:v=>`"${stringCheck.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v)}"`,
//   stringify(v){
//     return this[typeof v]?.(v) ?? "null";
//   }
// }

// const arrValidator =arr=>{if(!Array.isArray(arr)) throw "invalid arr";}
// const EMPTY = {};
// const recursive = (arr, acc, i)=>i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1) : `[${acc.substr(1)}]`;

// const stringify = arr=>{
//   let result = EMPTY;
//   if(arr.length == 0) result = "[]";
//   else {
//     //recursive(arr, "", 0);
//     let acc = "", i = 0;
//     while(i < arr.length) {
//       acc = acc + `,${el.stringify(arr[i])}`;
//       i = i + 1;
//     }
//     result = `[${acc.substring(1)}]`;
//   }
//   if(result === EMPTY) throw `no processed`;
//   return result;
// };




//example4
// const stringCheck = [[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]];
// const el = {
//   number:v=>v.toString(),
//   boolean:v=>v.toString(),
//   string:v=>`"${stringCheck.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v)}"`,
//   stringify(v){
//     return this[typeof v]?.(v) ?? "null";
//   }
// }
// const recursive = (arr, acc, i) => i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1) : `[${acc.substr(1)}]`;
// const stringify = arr=>{
//   if(!Array.isArray(arr)) throw `invalid arr`;
//   return arr.length == 0 ? "[]" : recursive(arr, "", 0);
// };

// stringify([1,"a",3])

//example3
// const rNewLine = /[\r\n\l]/g;
// const rQuat = /"/g;
// const el = {
//   number:v=>v.toString(),
//   boolean:v=>v.toString(),
//   string:v=>`"${v.replace(rNewLine, "\\n").replace(rQuat, "\\\"")}"`,
//   stringify(v){
//     console.log(this);
//     console.log(typeof(v));
//     console.log(this[typeof(v)]);
//     return this[typeof v]?.(v) ?? "null";
//   }
// }

// // const recursive = (arr, acc, i) => i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}]`, i + 1) : `[${acc,substr(1)}]`;
// // const stringify = arr=>{
// //   if(!Array.isArray(arr)) throw `invalid arr`;
// //   return arr.length == 0 ? "[]" : recursive(arr, "", 0);
// // };

//example2
// const stringify_example = arr=>{
//   if(!Array.isArray(arr)) throw `invalid arr`;
//   let acc = `EMPTY`;
//   if(arr.length == 0) acc = `[]`;
//   else {
//     acc = recursive(arr, "", 0);
//   }

//   if(acc === `EMPTY`) thorw `io.....`;
//   return acc;
// }


//example1
// const recursive = (arr, acc, i) => i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}]`, i + 1) : `[${acc,substr(1)}]`;
// const stringify = arr=>{
//   if(!Array.isArray(arr)) throw `invalid arr`;
//   if(arr.length == 0) return `[]`;
//   else return recursive(arr, "", 0);

//   // let acc;
//   // if(acc.length == 0) acc = `[]`;
//   // else acc = recursive(arr, '', 0);
//   // return acc;
// }