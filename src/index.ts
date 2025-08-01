import { type NEA, groupBy, pick } from "./util";

export type IsNonNullish<A> = null extends A ? false : undefined extends A ? false : true;

export type ValueOf<A> = A[keyof A];

export type ChooseArrayType<A, IsNonEmpty extends boolean> = true extends IsNonEmpty
  ? NEA<A>
  : A[];

export type NestedJoins<A> = {
  groupBy: (keyof A)[];
  select: (keyof A)[];
  joins?: Record<string, NestedJoins<A>>;
};
export type FromJoins<A, Joins extends NestedJoins<A>> = undefined extends Joins["joins"]
  ? {
      [K in Joins["select"][number]]: K extends Joins["groupBy"][number]
        ? NonNullable<A[K]>
        : A[K];
    }
  : {
      [K in
        | Joins["select"][number]
        | keyof Joins["joins"]]: K extends keyof Joins["joins"]
        ? ChooseArrayType<
            FromJoins<A, NonNullable<Joins["joins"]>[K]>,
            ValueOf<{
              [G in NonNullable<Joins["joins"]>[K]["groupBy"][number]]: IsNonNullish<
                A[G]
              >;
            }>
          >
        : K extends Joins["select"][number]
          ? K extends Joins["groupBy"][number]
            ? NonNullable<A[K]>
            : A[K]
          : never;
    };

export const nestedGroupBy = <A, Joins extends NestedJoins<A>>(
  a: A[],
  joins: Joins,
): FromJoins<A, Joins>[] => {
  type SimplifiedJoins = {
    groupBy: string[];
    select: string[];
    joins?: Record<string, SimplifiedJoins>;
  };
  const recurse = (something: Record<string, unknown>[], meta: SimplifiedJoins): any => {
    const grouped = groupBy(
      something.filter(
        (s) => !meta.groupBy.some((id) => s[id] == null || s[id] === undefined),
      ),
      (s) => `${meta.groupBy.map((id) => String(s[id])).join("|")}`,
    );
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
