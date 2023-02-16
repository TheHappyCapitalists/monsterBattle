const string = 'This is gay';
const result = string
  .split(' ')
  .map((w) =>
    w
      .split('')
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join(''),
  )
  .join(' ');
console.log(result);
