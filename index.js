const PI = Math.PI;
function getDifferenceRadiant(startAngle, wantedAngle) {
  const diff = wantedAngle - startAngle;
  return mod(diff + PI, 2 * PI) - PI;
}

const mod = (a, n) => ((a % n) + n) % n;
console.log(getDifferenceRadiant(PI, 0.001));
