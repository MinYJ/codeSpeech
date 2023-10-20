// example8
// const Operator = class{
//   static factory(v){
//     if(v instanceof Object) {
//       if(!Array.isArray(v)) v = Object.values(v);
//       return new ArrayOp(v.map(v=>Operator.factory(v)));
//     } else return typeof v == 'string' ? new StringOp(v) : new PrimaOp(v);
//   }
//   constructor(v){this.v = v;}
//   operation(f){throw 'override';}
// };
// const StringOp = class extends Operator{
//   constructor(v){super(v);}
//   operation(f){for( const a of this.v) f(a);}
// }
// const PrimaOp = class extends Operator{
//   constructor(v){super(v);}
//   operation(f){f(this.v);}
// }

// const ArrayOp = class extends Operator{
//   constructor(v){super(v);}
//   operation(f){for(const v of this.v) v.operation(f);}
// }
// // Operator.factory([1,2,3,{a:4, b:5},6,7]).operation(console.log)

// const array = [1,2,3, {a:4, b:5}];

// const obj = {'a': 1, 'b': 2}
// array.map(value => console.log(value));

// example7 title: if를 제거하려면??
// (data, f)=>{
//   let v;
//   while(v = data.shift()){
//     if(!(v instanceof Object)) {
//       f(v);
//     } else {
//       if(!Array.isArray(v)) v = Object.values(v);
//       data.unshift(...v);
//     }
//   }
// }

// example6
const Operator = class{
  static factory(v){
    if(v instanceof Object){
      if(!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map(v=>Operator.factory(v)));
    }else return new PrimaOp(v);
  }
  constructor(v){this.v = v;}
  *gene(){throw 'override';}
};

const PrimaOp = class extends Operator{
  constructor(v){super(v);}
  *gene(){yield this.v;}
}

const ArrayOp = class extends Operator{
  constructor(v){super(v);}
  *gene(){for(const v of this.v) yield * v.gene();}
};

for(const v of  Operator.factory([1,2,3,{a:4, b:5},6,7]).gene()) console.log(v)

// example5
// const Compx = class{
//   constructor(data){this.data = data;}
//   *gene(){
//     const data = JSON.parse(JSON.stringify(this.data));
//     let v;
//     while(v = data.shift()){
//       if(!(v instanceof Object)) yield v;
//       else{
//         if(!Array.isArray(v)) v = Object.values(v);
//         data.unshift(...v);
//       }
//     }
//   }
// }
// const a = new Compx([{a:[1,2,3,4], b:'-'}, [5,6,7], 8,9]);
// console.log(a.gene());



//example4
// const Compx = class{
//   constructor(data){this.data = data;}
//   [Symbol.iterator](){
//     const data = JSON.parse(JSON.stringify(this.data));
//     return {
//       next(){
//         let v;
//         while(v = data.shift()){
//           if(!(v instanceof Object)) return {value:v};
//           if(!Array.isArray(v)) v = Object.values(v);
//           data.unshift(...v);
//         }
//         return {done:true};
//       }
//     }
//   }
// }

// const a = new Compx([{a:[1,2,3,4], b:'-'}, [5,6,7], 8,9]);
// console.log(...a);



// example3
// const obj3 = {
//   [Symbol.iterator]() {return this;},
//   data:[{a:[1,2,3,4], b: '-'}, [5,6,7], 8, 9],
//   next(){
//     let v;
//     while(v = this.data.shift()){
//       if(!(v instanceof Object)) return {value:v};
//       if(!Array.isArray(v)) v = Object.values(v);
//       this.data.unshift(...v);
//     }
//     return {done:true};
//   }
// }

// 객체의 키는 없애고 값들만 모아서 배열로 만든다
// const object = {a:[1,2,3,4], b: '-', c: [-1, -2, -3]}
// console.log(Object.values(object));

// null은 !v로 표현가능
// const v = null
// console.log( !v);
// console.log( v);





// example2
// const obj2 = {
//   [Symbol.iterator]() {return this;},
//   data:[{a:[1,2,3,4], b: '-'}, [5,6,7], 8, 9],
//   // data:[{}],
//   next() {
//     let v;
//     while(v = this.data.shift()){
//       switch(true) {
//       case Array.isArray(v):
//         this.data.unshift(...v);
//         break;
//       case v && typeof v == 'object':
//         for(var k in v) this.data.unshift(v[k]);
//         break;
//       default:
//         return {value:v, done:false};
//       }
//     }
//     return {done:true};
//   }
// }

// console.log(obj2.next());
// const data = [{a:[1,2,3,4]}]
// let v = data.shift();
// for(var k in v) {
//   console.log('v: ', v);
//   console.log('k: ', k);
//   console.log('v[k]: ', v[k]);
//   data.unshift(v[k]);
// }
// console.log(data);

// v = data.shift();
// console.log(`v: `, v);
// Array.isArray(v);
// console.log(...v);

// data.unshift(...v)
// console.log(data);





// example1
// const obj = {
//   [Symbol.iterator]() {return this;},
//   data: [1,2,3,4],
//   next(){
//     return {
//       done: this.data.length == 0,
//       value: this.data.shift()
//     }
//   }
// }