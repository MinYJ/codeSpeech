const valueTest = Symbol();
const valueConvert = Symbol();
class StringParser{
    #reg = /"([^"])\\")+"/;
    [valueTest](v){
        return this.#reg.test(v);
    }
    [valueConvert](v){
        return this.#reg.exec(v)[1];
    }
}

class NumberParser{
    #reg = /[0-9.]+/;
    [valueTest](v){
        return this.#reg.test(v);
    }
    [valueConvert](v){
        return this.#reg.exec(v)[1];
    }
}

// const DateParser{
//     //#reg = //
//     [valueTest](v){
//         return this.#reg.test(v);
//     }
//     [valueConvert](v){
//         return new Date(this.#reg.exec(v)[1]);
//     }
// }
// #1 라우터를 작성하는것이 문제가 아니라,
// OCP를 지키기위해서 라우터를 도입하는것이 문제이다
// 어디가 많이 변하고 어디가 덜 변하는지 인식해야한다

// class Test{
//     #a; #b; #c;
//     constructor(a, b, c){
//         this.#a = a;
//         this.#b = b;
//         this.#c = c;
//     }
//     toJSON(){
//         return `"@test{${this.#a},${this.#b},${this.#c}}"`;
//     }
//     #reg = /"@Test\{([0-9]), ([0-9]), ([0-9])}/;
//     [valueTest](v){
//         return this.#reg.test(v);
//     }
//     [valueConvert](v){
//         const [,...arg] =this.#reg.exec(v);
//         return new Test(...arg.map(it=>parseFloat(it)));
//     }
// }

// #2 분리
class Test{
    #a; #b; #c;
    constructor(a, b, c){
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }
    toJSON(){
        return new TestParser(this.#a, this.#b, this.#c);
    }
}
class TestParser{
    #reg = /"@Test\{([0-9+]),([0-9+]),([0-9+])}/;
    [valueTest](v){
        return this.#reg.test(v);
    }
    [valueTest](v){
        const [,...arg] = this.#reg.exec(v);
        return new Test(...arg.map(it=>parseFloat(it))); 
    }
    toJSON(a, b, c){
        return `"@Test{${a},${b},${c}}"`;
    }
}

const router = {
    type:[new StringParser,new NumberParser,new DateParser, new Test(1,2,3)],
    router(v){
        let result;
        if(this.type.some(converter=>{
            if(converter.test(v)){
                result = converter.convert(v);
                return true;
            }else{
                return false;
            }
        })) return result;
        else throw "invalid ValueType:"+v;
    }
}