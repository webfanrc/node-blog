const a = [1,2,3];

const b = a.map(function (n) {
  return n + n;
});


b.map((n) => {
  console.log(n);
});