const generator = function*(a) {
  a++;
  yield a;
  a++;
  yield a;
  a++;
  yield a;
}
const coroutine = generator(3);

let result = 0;
result += coroutine().value;
console.log(result);