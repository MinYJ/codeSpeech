function MakeReference() {
  
  return [1,2,3];
}

const a = MakeReference();
const b = a;
a[0] = 2;
console.log(a);
console.log(b);