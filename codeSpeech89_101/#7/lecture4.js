const rNum = /^,*([0-9]+)\s*[,]?/;
const rKey = /^\s*"((?:[^"]|\\")+)"\s*:\s*/;
const checkTrailingComma = v=>{
    if(v[0] == ","){
        v = v.substr(1).trim();
        if("]}".indexOf(v[0]) != -1) throw "invalid json" + v;
    }
    return v;
}
const parser = (str, acc, k, stack)=>{
    let v = checkTrailingComma(str.trim());
    if(!v.length) return acc;
    switch(v[0]){
        case"[":case"{":
            stack.push({acc, k});
            return parser(v.substr(1), v[0] == "[" ? [] : {}, null, stack);
        case"]":case"}":
            if(!stack.length) throw "invalid json" + v;
            // 처음에 null이 나올 수 있기에, null은 해체가 되지않아 객체를 만들어준다
            const {acc:prev, k:key} = stack.pop();
            if(!prev) return acc;
            else{
                if(prev instanceof Array) prev.push(acc);
                else prev[key] = acc;
                v = v.substr(1).trim();
                if(v[0] == ","){
                    v = v.substr(1).trim();
                    if("]}".indexOf(v[0]) != -1) throw "invalid json" + v;
                }
                return parser(checkTrailingComma(v.substr(1).trim()), prev, null, stack);
            }
        defalut:
            if(acc instanceof Array){
                const value = rNum.exec(v);
                if(!value) throw "invalid array value:" + v;
                acc.push(parseFloat(value[1]));
                return parser(v.substr(value[0].length), acc, null, stack);
            } else {
                // 한 번은 키를 파싱하고
                // 다른 한 번은 값을 파싱해야한다
                // 키를 파싱할 차례인지, 값을 파싱할 차례인지 어떻게 알 수 있나??
                if(k == null){
                    const key = rKey.exec(v);
                    if(!key) throw "invalid key:" + v;
                    return parser(v.substr(value[0].length), acc, key[1], stack);
                }else{
                    const value = rNum.exec(v);
                    if(!value) throw "invalid object value:" + v;
                    acc[k] = parseFloat(value[1]);
                    return parser(v.substr(value[0].length), acc, null, stack);
                }
            }
            return
    }
};

parser(`{"a":[1,2,[3,4],5], "b":{"a":123, "b":456}}`, null, null, []);

// stack = [];
// const test = stack.pop() ?? 'a';
// console.log(test);