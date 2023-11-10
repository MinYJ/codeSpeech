// 1차원 배열의 stringify
// const a = [1, "ab\"c", 'ture', 'null',_=>3];
// console.log(JSON.stringify(a));
// console.log(a[1]);

// 과제
const a = [1, "ab\"c", true, null, _=>3];
JSON.stringify(a) === arrayStringify(a);