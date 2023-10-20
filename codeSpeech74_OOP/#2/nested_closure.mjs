window.a = 3;
if(a == 3) {
  const b = 5;
  const f1 = v => {
    const c = 7;
    if(a + b > c) {
      return p => v + p + a + b + c;
    } else {
      return p => v + p + a + b;
    }
  }
}