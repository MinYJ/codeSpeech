// 사용자반복처리기
// #1직접 Iterator반복처리기를 구현

const loop = (iter, f) => {

  //Iterable이라면 Iterator를 얻음
  if(typeof iter[Symbol.iterator] == 'function') {
    iter = iter[Symbol.iterator]();
  }

  //IteratorObject가 아니라면 건너뜀
  if(typeof iter.next != 'function') return;

  while(true) {
    const v = iter.next();
    if(v.done) return; //종료처리
    console.log(v.value); //현재 값을 전달함
  }
}

// #2 iterable이자 iterator
const iter = {
  [Symbol.iterator](){return this;},
  arr:[1, 2, 3, 4],
  next(){
    return {
      done:this.arr.length == 0,
      value:this.arr.pop()
    };
  }
};

loop(iter, console.log);

const [k, ...l] = [1,2,3,4];
log(k);
log(l);