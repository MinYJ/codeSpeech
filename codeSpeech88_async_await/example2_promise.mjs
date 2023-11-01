const timeout =(f,ms)=> new Promise(res=>setTimeout(_=>res(f()), ms));
const f1 =_=>"abc";
const f2 =_=>"def";
const start = performance.now();

// example3
// (async ()=>{
//   const [v1, v2] = await Promimse.all([timeout(f1, 500), timeout(f2, 1000)]);
//   console.log(v1, v2, performance.now() - start);
// })
(async ()=>{
  const v = await Promise.race([timeout(f1, 500), timeout(f2, 1000)]);
  console.log(v, performance.now() - start);
})


// example2
// (()=>{
//   timeout(f1,500)
//     .then(v=>{
//       console.log(v, performance.now() - start);
//       return timeout(f2, 1000);
//     })
//     .then(v=>console.log(v, performance.now() - start));
// })();
// // (async ()=>{
// //   console.log(await timeout(f1, 500), performance.now() - start);
// //   console.log(await timeout(f2, 1000), performance.now() - start);
// // })
// (async ()=>{
//   console.log(
//     await timeout(f1, 500), performance.now() - start,
//     await timeout(f2, 1000), performance.now() - start,

//   );
// })();




// example1
// (()=>{
//   timeout(f1, 500).then(v=>console.log(v, performance.now() - start))
// })();
// (()=>{
//   timeout(f2, 1000).then(v=>console.log(v, performance.now() - start))
// })();

// (async ()=>{
//   console.log(await timeout(f1, 500), performance.now() - start);
// })