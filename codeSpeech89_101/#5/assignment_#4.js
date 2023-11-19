//example
Object.entries({a:3, b:4});
const stringify = obj => recursive(Object.entries(obj), "", 0);

/*
** stringify({a:3, b:"abc"})
** routine
** 한 번 입장하면 무조건 반환된다
** 반복적으로 사용할 수 있다
** 인자를 받아들여 내부 로직에 활용할 수 있다
*/

/*
** co-routine
** 여러번 진입할 수 있고 여러번 반환할 수 있다
** 특수한 반환을 통해 그 다음 진입을 지정할 수 있다
** 원래 명령은 적재되면 한 번에 다 실행된다.
*/

/*
**  suspend: 동기명령을 일시적으로 멈춘다
**  resume: 다시 진입해서 그 다음부터 실행한다
*/

function * test(){
  for(let i=0; i<100000000; i++) if(i%1000 == 0) yield i;
}

const iterator = test();
console.log(iterator.next());

/*
** 원래는 동기명령중간에 멈출 수 없다
** 코루틴은 동기명령 중간에 멈출 수 있다
** 멈춘 시점에 모든 메모리상태를 기억하고 있다
*/

/*
** async await은 코루틴은 아니지만
** suspend & resume으로 구현하고 있다
*/

const infinityScroll = async function*(){
  let page = 1;
  while(true){
    const json = loadPage(page);
    if(json.isEnd) break;
    else{
      yield json;
      page++;
    }
  }
  const loadPage = page=>fetch(URL + "?page=" + page).then(res=>res.json());
  const pageLoader = infinityScroll();
  const pageLoad = async ()=>{
    const {done, value} = await pageLoader();
    if(!done) render(value);
  }
}