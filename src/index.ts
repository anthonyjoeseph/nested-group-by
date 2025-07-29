import { type NEA, groupBy, pick } from "./util";

export type IsNonNullish<A> = null extends A ? false : undefined extends A ? false : true;

export type ValueOf<A> = A[keyof A];

export type ChooseArrayType<A, IsNonEmpty extends boolean> = true extends IsNonEmpty ? NEA<A> : A[];

export type NestedJoins<A> = {
  groupBy: (keyof A)[];
  select: (keyof A)[];
  joins?: Record<string, NestedJoins<A>>;
};
export type FromJoins<A, Joins extends NestedJoins<A>> = undefined extends Joins["joins"]
  ? ChooseArrayType<
      {
        [K in Joins["select"][number]]: K extends Joins["groupBy"][number] ? NonNullable<A[K]> : A[K];
      },
      ValueOf<{
        [G in Joins["groupBy"][number]]: IsNonNullish<A[G]>;
      }>
    >
  : ChooseArrayType<
      {
        [K in Joins["select"][number] | keyof Joins["joins"]]: K extends keyof Joins["joins"]
          ? FromJoins<A, NonNullable<Joins["joins"]>[K]>
          : K extends Joins["select"][number]
            ? K extends Joins["groupBy"][number]
              ? NonNullable<A[K]>
              : A[K]
            : never;
      },
      ValueOf<{
        [G in Joins["groupBy"][number]]: IsNonNullish<A[G]>;
      }>
    >;

export const nestedGroupBy = <A, Joins extends NestedJoins<A>>(a: A[], joins: Joins): FromJoins<A, Joins> => {
  type SimplifiedJoins = { groupBy: string[]; select: string[]; joins?: Record<string, SimplifiedJoins> };
  const recurse = (something: Record<string, unknown>[], meta: SimplifiedJoins): any => {
    const grouped = groupBy(something, (s) => `${meta.groupBy.map((id) => String(s[id])).join("|")}`);
    return Object.values(grouped).map((b) => {
      const select = pick(b[0], meta.select);
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

// TODO: lines 17 and 29 should check if "any individual key"
// is non-nullable
// the existence of just *one* non-nullable individual group by key
// is enough to render it a non-empty array
