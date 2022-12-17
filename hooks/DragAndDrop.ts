export function listToObject(list: {id: number; title: any; order: number}[]) {
  const values = Object.values(list);
  const object: any = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}
export function objectMove(object: any, from: any, to: any) {
  "worklet";
  const newObject = Object.assign({}, object);
  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }
    if (object[id] === to) {
      newObject[id] = from;
    }
  }
  return newObject;
}

export function clamp(value: number, lowerBound: number, upperBound: number) {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
}
