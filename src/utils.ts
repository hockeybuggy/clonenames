export function randomChoice<T>(choices: Array<T>): T {
  // Returns a random element from within the given choices
  return choices[Math.round(Math.random() * (choices.length - 1))];
}

export function randomBool(): boolean {
  return Math.random() > 0.5;
}

export function shuffle<T>(list: Array<T>): Array<T> {
  const a = list.slice(0);
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
