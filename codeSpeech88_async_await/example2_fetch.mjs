const api = async(url, timeout = 5000, info = {})=>{
  try{
    let id = -1;
    const v = await Promise.race([
      new Promise(res=>id = window.setTimeout(_=>res(), timeout)),
      fetch(new Request(url, info))
    ]);
    if(v instanceof Response){
      clearTimeout(id);
      return v.status === 404 ? new Error("404") : await v.text();
    } else return new Error('timeout');
  } catch(e){
    return e;
  }
};
(async()=>{
  const v = await api("200.html", 1);
  if(v instanceof Error) console.log(`error : ${v}`);
  else console.log(`contents: ${v}`);
})