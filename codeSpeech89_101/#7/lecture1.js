// #1 객체지향은 각각의 역할을 각각의 객체에게 부임할 수 있다
class ValueParser{
    test(v){}
    convert(v){}
}
class StringParser extends ValueParser{
    #reg = /"([^"])\\")+"/
    isValid(v){
        return this.#reg.test(v);
    }
    convert(v){
        return this.#reg.exec(v)[1];
    }
}

class NumberParser extends ValueParser{
    #reg = /[0-9.]+/
    test(v){
        return this.#reg.test(v);
    }
    convert(v){
        return this.#reg.exec(v)[1];
    }
}

const router = {
    type:[new StringParser,new NumberParser],
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