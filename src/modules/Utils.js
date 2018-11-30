export function make2DArray(cols, rows) {
  const arr = new Array(cols);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = new Array(rows);
  }
  return arr;
}
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
    if (color === '000000') {
      getRandomColor();
    }
  }
  return color;
}
