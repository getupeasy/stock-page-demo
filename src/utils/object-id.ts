
const weakMap = new WeakMap();
export default function objectId(value: Exclude<object, null | undefined | number | string | boolean | bigint>) {
  if (weakMap.has(value)) {
    return weakMap.get(value);
  }
  const id = Math.random().toString(36).slice(2);
  weakMap.set(value, id);
  return id;
}