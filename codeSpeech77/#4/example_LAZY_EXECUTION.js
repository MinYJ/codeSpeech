// example2
const Stream = class{
  static get(v){return new Stream(v);}
  constructor(v){
    this.v = v;
    this.filters = [];
  }
  add(gene, ...arg){
    this.filters.push(v=>gene(v, ...org));
  }
  *gene(){
    let v = this.v;
    for(const f of this.filters) v = f(v);
    yield* v;
  }
}

const odd = function*(data){
  for(const v of data) if(v % 2) yield v;
};
const take = function*(data, n){
  for(const v of data) if(n--) yield v; else break;
}
for(const v of Stream.get([1,2,3,4]).add(odd).add(take, 2).gene())
console.log(v);


// // example1_2
// const take = function*(data, n){
//   console.log('data', data);
//   for(const v of data){
//     console.log('take_v', v);
//     console.log('take', take.cnt++);
//     if(n--) yield v; else break;
//   }
// }

// // for(const v of take([1,2,3,4], 2)) console.log(v);

// // example1_1
// const odd = function*(data){
//   for(const v of data){
//     console.log('odd_v', v);
//     console.log('odd', odd.cnt++);
//     if(v % 2) yield v;
//   }


// };
// odd.cnt = 0;
// take.cnt = 0;
// // for(const v of odd([1,2,3,4])) console.log(v);

// for(const v of take(odd([[1,2],2,3,4]), 2)) console.log(v);
