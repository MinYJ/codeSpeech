let arr = [1,2,3,4];
while(arr.length > 0) {
  console.log(arr.pop());
}

// while(계속반복할지 판단) {
//   반복시마다 처리할 것
// }

{
  arr:[1,2,3,4],
  next() 
    return {
      done: this.arr.length == 0,
      value: console.log(this.arr.pop())
    }
}