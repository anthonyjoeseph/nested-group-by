export type NEA<A> = [A, ...A[]];

// https://github.com/remeda/remeda/blob/main/packages/remeda/src/groupBy.ts
export const groupBy = <T, Key extends PropertyKey = PropertyKey>(
  data: ReadonlyArray<T>,
  callbackfn: (value: T, index: number, data: ReadonlyArray<T>) => Key | undefined,
): Record<Key, NEA<T>> => {
  const output: Record<Key, NEA<T>> = Object.create(null);

  for (let index = 0; index < data.length; index++) {
    // Accessing the object directly instead of via an iterator on the `entries` showed significant performance benefits while benchmarking.
    const item = data[index];

    // @ts-expect-error [ts2345] -- TypeScript is not able to infer that the index wouldn't overflow the array and that it shouldn't add `undefined` to the type. We don't want to use the `!` operator here because it's semantics are different because it changes the type of `item` to `NonNullable<T>` which is inaccurate because T itself could have `undefined` as a valid value.
    const key = callbackfn(item, index, data);
    if (key !== undefined) {
      // Once the prototype chain is fixed, it is safe to access the prop directly without needing to check existence or types.
      const items = output[key];

      if (items === undefined) {
        // It is more performant to create a 1-element array over creating an empty array and falling through to a unified the push. It is also more performant to mutate the existing object over using spread to continually create new objects on every unique key.
        // @ts-expect-error [ts2322] -- In addition to the typing issue we have for `item`, this line also creates a typing issue for the whole object, as TypeScript is having a hard time inferring what values could be adding to the object.
        output[key] = [item];
      } else {
        // It is more performant to add the items to an existing array over continually creating a new array every time we add an item to it.
        // @ts-expect-error [ts2345] -- See comment above about the effective typing for `item` here.
        items.push(item);
      }
    }
  }

  // Set the prototype as if we initialized our object as a normal object (e.g. `{}`). Without this none of the built-in object methods like `toString` would work on this object and it would act differently than expected.
  Object.setPrototypeOf(output, Object.prototype);

  return output;
};

// https://github.com/remeda/remeda/blob/main/packages/remeda/src/pick.ts
export function pick<T extends object, Keys extends ReadonlyArray<keyof T>>(
  object: T,
  keys: Keys,
): Pick<T, Keys[number]> {
  const out: Partial<Pick<T, Keys[number]>> = {};
  for (const key of keys) {
    if (key in object) {
      out[key] = object[key];
    }
  }
  // @ts-expect-error [ts2322] - We build the type incrementally, there's no way to make typescript infer that we "finished" building the object and to treat it as such.
  return out;
}
