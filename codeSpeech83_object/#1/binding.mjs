const y = {name: 'kim'};
const z = {name: 'lee'};

let a = y;
const b = a;
const c = a;
console.log(a);
console.log(b);
console.log(c);

a = z;
console.log(a);
console.log(b);
console.log(c);