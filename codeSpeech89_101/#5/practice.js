// example1
// const k = 1;
// const v = 2;
// const acc = 3;
// {prev:acc, k, v};
// console.log(prev);

// exampl2
// const el = {}
// switch(true) {
//   case Array.isArray(el):
//     break;
//   case el && typeof el == "object":
//     console.log(`aaaaa`);
//     break;
// }

//example3
const acc = {};

const test = ()=>{if(!acc) return acc.isObject ? "{}" : "[]";}

console.log(test(acc));

