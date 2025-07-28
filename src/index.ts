import { type NEA, groupBy, pick } from "./util";

export type IsNonNullish<A> = null extends A ? false : undefined extends A ? false : true;

export type ChooseArrayType<A, IsNonEmpty extends boolean> = true extends IsNonEmpty ? NEA<A> : A[];

export type StringKeys<A> = keyof {
  [K in keyof A as string extends A[K] ? K : never]: never;
};

export type NestedJoins<A> = {
  id: StringKeys<A>;
  fields: (keyof A)[];
  joins?: Record<string, NestedJoins<A>>;
};
export type FromJoins<A, Joins extends NestedJoins<A>> = undefined extends Joins["joins"]
  ? ChooseArrayType<{ [K in Joins["fields"][number]]: A[K] }, IsNonNullish<A[Joins["id"]]>>
  : ChooseArrayType<
      {
        [K in Joins["fields"][number] | keyof Joins["joins"]]: K extends keyof Joins["joins"]
          ? FromJoins<A, NonNullable<Joins["joins"]>[K]>
          : K extends Joins["fields"][number]
            ? A[K]
            : never;
      },
      IsNonNullish<A[Joins["id"]]>
    >;

export const nestedGroupBy = <A, Joins extends NestedJoins<A>>(a: A[], joins: Joins): FromJoins<A, Joins> => {
  type SimplifiedJoins = { id: string; fields: string[]; joins?: Record<string, SimplifiedJoins> };
  const recurse = (something: Record<string, unknown>[], meta: SimplifiedJoins): any => {
    const grouped = groupBy(something, (s) => s[meta.id] as string);
    return Object.values(grouped).map((b) => {
      const select = pick(b[0], meta.fields);
      const joins = Object.fromEntries(
        Object.entries(meta.joins ?? {}).map(([customName, subMeta]) => {
          return [customName, recurse(b, subMeta)];
        }),
      );
      return {
        ...select,
        ...joins,
      };
    });
  };
  return recurse(a as Record<string, unknown>[], joins as SimplifiedJoins);
};
