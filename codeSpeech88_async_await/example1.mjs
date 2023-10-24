// example5
const gene = function*(max, load, block){
  let i=0, curr=load;
  while(i < max){
    if(curr--){
      block();
      i++;
    }else{
      curr=load;
      console.log(i);
      yield;
    }
  }
}

const gene2 = function*(max, load, block){
  let i=0;
  while(i<max){
    yield new Promise(res=>{
      let curr=load;
      while(curr-- && i<max){
        block();
        i++;
      }
      console.log(i);
      timeout(res, 0);
    })
  }
}


// example4
// const nbFor = (max, load, block)=>{
//   const iterator = gene(max, load, block);
//   const f =_=>iterator.next().done||setTimeout(f);
//   setTimeout(f,0);
// }

// example3
// const gene = function*(max, load, block){
//   let i=0;, curr = load;
//   while(i<max){
//     if(curr--){
//       block();
//       i++;
//     }else{
//       curr=load;
//       console.log(i);
//       yield;
//     }
//   }
// }


// example2
// const infinity = (function*(){
//   let i=0;
//   while(true) yield i++;
// })();
// console.log(infinity.next());

// example1
// const working =_=>{};
// for(let i=0; i<100000; i++) working();

// const nbFor = (max, load, block)=>{
//   let i=0;
//   const f = time=>{
//     let curr = load;
//     while(curr-- && i<max){
//       block();
//       i++;
//     }
//     console.log(i);
//     // if (i < max - 1) requestAnimationFrame(f);
//     if (i < max - 1) console.log(f);
//   };
//   // requestAnimationFrame(f);
//   //timeout(f, 0);
//   console.log(f)
// }

// nbFor(100, 10, working());