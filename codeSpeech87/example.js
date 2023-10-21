// example6
class Test{
  map = new Map;
}

prop(Test.prototype, "name", new TestDelegate);
prop(Test.prototype, "company", new TestDelegate);

class TestDelegate{
  getValue(target, k){
    return target.map.get(k) ?? `no ${k}`;
  }
  setValue(target, k, v){
    target.map.set(k, v);
  }
}

const props = (target, key, delegator)=>{
  Object.defineProperty(target, key, {
    get() {
      return delegator.getValule(this, key);
    },
    set(v){
      delegator.setValue(this, key, v);
    }
  })
}


// example5
// class ValueDelegate{
//   #v;
//   constructor(v){
//     this.#v = v;
//   }
//   getValue(k){
//     return this.#v;
//   }
//   setValue(k, v){
//     this.#v = v;
//   }
// }

// class TestDelegate{
//   #map;
//   constructor(map){
//     this.#map = map;
//   }
//   getValue(k){
//     return this.#map.get(k) ?? `no ${k}`;
//   }
//   setValue(k, v){
//     this.#map.set(k,v);
//   }
// }

// const prop = (target, key, delegator)=>{
//   Object.defineProperties(target, key, {
//     get(){
//       return delegator.getValue(key);
//     },
//     set(v){
//       delegator.setValue(key, v);
//     }
//   })
// }

// class Test {
//   #map = new Map;

//   constructor(){
//     props(this, "name", new TestDelegate(this.#map));
//     props(this, "company", new TestDelegate(this.#map));
//   }
// }

// example4
// class ValueDelegate{
//   #v;
//   constructor(v){
//     this.#v = v;
//   }
//   getValue(k){
//     return this.#v;
//   }
//   setValue(k, v){
//     this.#v = v;
//   }
// }

// class TestDelegate{
//   #map;
//   constructor(map){
//     this.#map = map;
//   }
//   getValue(k){
//     return this.#map.get(k) ?? `no ${k}`;
//   }
//   setValue(k, v){
//     this.#map.set(k,v);
//   }
// }

// class Test{
//   #map = new Map;

//   constructor(){
//     const name = new TestDelegate(this.#map);
//     Object.defineProperties(this, "name", {
//       get(){
//         return name.getValue("name");
//       },
//       set(v){
//         name.setValue("name", v);
//       }
//     });
//     const company = new TestDelegate(this.#map);
//     Object.defineProperties(this, "name", {
//       get(){
//         return company.getValue("company");
//       },
//       set(v){
//         company.setValue("company", v);
//       }
//     });
//   }
// }

// example3
// class ValueDelegate{
//   #v;
//   constructor(v){
//     this.#v = v;
//   }
//   getValue(k){
//     return this.#v;
//   }
//   setValue(k, v){
//     this.#v = v;
//   }
// }

// class TestDelegate{
//   #map;
//   constructor(map){
//     this.#map = map;
//   }
//   getValue(k){
//     return this.#map.get(k) ?? `no ${k}`;
//   }
//   setValue(k, v){
//     this.#map.set(k,v);
//   }
// }

// class Test{
//   #map = new Map;

//   #delegate = new TestDelegate(this.#amp);

//   set name(v){
//     this.#delegate.setValue("name", v);
//   }
//   get name(){
//     return this.#delegate.getValue("name");
//   }
//   set company(v){
//     this.#delegate.setValue("company", v);
//   }
//   get company(){
//     return this.#delegate.getValue("company");
//   }
// }

// example2
// class Test{
//   #map = new Map;

//   _set(k, v){
//     this.#map.set(k,v);
//   }
//   _get(k){
//     return this.#map.get(k) ?? `no${k}`;
//   }
//   set name(v){
//     this._set("name", v);
//   }
//   get name(){
//     return this._get("name");
//   }
//   set company(v){
//     this._set("company", v);
//   }
//   get company(){
//     return this._get("company");
//   }
// }

// example1
// class Test {
//   #map = new Map;
//   set name(v){
//     this.#map.set("name", v);
//   }
//   get name(){
//     return this.#map.get("name") ?? "no name";
//   }
//   set company(v){
//     this.#map.set("company", v);
//   }
//   get company(){
//     return this.#map.get("company") ?? "no company";
//   }
// }