//example11
const el = {
  data:{
    number:v=>v.toString(),
    boolean:v=>v.toString(),
    string:v=>`"${stringCheck.convert(v)}"`,
    symbol:v=>"null",
    "null":v=>"null",
    array:v=>{},
    objecet:v=>{}
  },
  stringify(v){
    let target = this.data[typeof v];
    if(target == null) {
      switch(true){
        case v === null: target = this.data["null"]; break;
        case Array.isArray(v): target = this.table["array"]; break;
        default: target = this.table["object"];
      }
    }
    if(target === null) return "null";
    else return target(v);
    
    //return (this.data[typeof v] ?? this.table[!v ? "null" : Array.isArray(v) ? "array" : "object"])?.(v) ?? "null";
  }
};

//example10
// const el = {
//   data:{
//     number:v=>v.toString(),
//     boolean:v=>v.toString(),
//     string:v=>`"${stringCheck.convert(v)}"`,
//     symbol:v=>"null",
//     "null":v=>"null",
//     array:v=>{},
//     objecet:v=>{}
//   },
//   stringify(v){
//     return (this.data[typeof v] ?? this.table[!v ? "null" : Array.isArray(v) ? "array" : "object"])?.(v) ?? "null";
//   }
// };


//example9
// const stringCheck = {
//   data:[[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]],
//   convert(v){
//     return this.data.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v);
//   }
// };

// stringCheck.convert(undefined);

// const el = {
//   data:{
//     number:v=>v.toString(),
//     boolean:v=>v.toString(),
//     string:v=>`"${stringCheck.convert(v)}"`,
//     symbol:v=>"null",
//   },
//   stringify(v){
//     return this.data[typeof v]?.(v) ?? "null";
//   }
// };

// const arrValidator = arr=>{if(!Array.isArray(arr)) throw `invalid arr`;};
// const EMPTY = {};

// const recursive = (arr, acc, i)=>i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1) : `[${acc.substring(1)}]`;
// const err = v=>{throw v;};

// const resultProcess = {
//   data:{
//     "true": (arr)=>"[]",
//     "false":(arr)=>{
//       let acc = "", i = 0;
//       while(i < arr.length){
//         acc = acc + `,${el.stringify(arr[i])}`;
//         i = i + 1;
//       }
//       return `[${acc.substring(1)}]`;
//     }
//   },
//   process(arr){
//     return this.data[arr.length == 0]?.(arr) ?? err(`no case`);
//     // return this.data[arr.length == 0]?.(arr) ?? "";
//     //this.data[arr.length == 0](arr);
//   }
// }
// const stringify = arr =>{
//   arrValidator(arr);
//   return resultProcess.process(arr);
// }

//example8
// const stringCheck = {
//   data:[[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]],
//   convert(v){
//     return this.data.reduce((acc, curr)=>acc.replace(curr[0], curr[1], v));
//   }
// };

// const el = {
//   data:{
//     number:v=>v.toString(),
//     boolean:v=>v.toString(),
//     string:v=>`"${stringCheck.convert(v)}"`,
//     symbol:v=>"null",
//   },
//   stringify(v){
//     return this.data[typeof v]?.(v) ?? "null";
//   }
// };

// const arrValidator = arr=>{if(!Array.isArray(arr)) throw `invalid arr`;};
// const EMPTY = {};

// const recursive = (arr, acc, i)=>i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1) : `[${acc.substring(1)}]`;

// const stringify = arr =>{
//   arrValidator(arr);

//   let result = EMPTY;

//   if(arr.length == 0) retuslt = `[]`;
//   else {
//     let acc = "", i = 0;
//     while(i < arr.length){
//       acc = acc + `,${el.stringify(arr[i])}`;
//       i = i + 1;
//     }
//     result = `[${acc.substring(1)}]`;
//   }

//   if(result === EMPTY) throw "no processed";

//   return result;
// }

//example7 -> OCP
// const stringCheck = {
//   data:[[/[\r\n\l]/g, "\\n"], [/"/g, "\\\""], [/\t/g, "\\t"]],
//   convert(v){
//     return this.data.reduce((acc, curr)=>acc.replace(curr[0], curr[1], v));
//   }
// };

//   const el = {
//   number:v=>v.toString(),
//   boolean:v=>v.toString(),
//   string:v=>`"${stringCheck.convert(v)}"`,
//   symbol:v=>"null",
//   stringify(v){
//     switch(typeof v){
//       case "number":  v=v.toString(); break;
//       case "boolean": v=v.toString(); break;
//       case "symbol":  v = "null"; break;
//       case "string":  v=`"${stringCheck.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v)}"`; break;
//       default: v = "null";
//     }
//     return v;
//   }
// }

// const _stringCheck = [['a', 'A'], ['b', 'B']];
// const arr = 'ab';

// const a = _stringCheck.reduce((acc, curr)=>{
//   return acc.replace(curr[0], curr[1]);
// }, arr);

// console.log(a);