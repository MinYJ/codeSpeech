const a = {
  get a() {
    console.log('Hello');
    return 1;
  },
  set a(v) {
    console.log('world');
    return 1+v;
  }
}
// 1. 자바스크립트 안에서 ()없이 함수를 호출할 수 있다.
//console.log(a.a);
//a.a = 3;

// 2.
function b() {

}

const test = b;
console.log(test);