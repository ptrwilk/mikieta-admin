type Groupable = {
  [key: string]: any;
};

export function groupBy<T extends Groupable>(
  items: T[],
  keyFunction: (item: T) => any
): T[][] {
  const groups: Record<string, T[]> = {};

  items?.forEach((item) => {
    const key = keyFunction(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });

  return Object.values(groups);
}

export const merge = <T,>(array: T[][]) => {
  return [].concat.apply([], array as any) as T[];
};

export const isNill = (value: any) =>
  value === undefined || value === null || value === "";

export const isNumber = (value: any) => Number.isFinite(value);

export const orderBy = <T,>(
  array: T[],
  prop: string,
  direction: "asc" | "desc"
) => {
  const asString = (value: any) => (isNill(value) ? "" : value).toString();

  const getValue = (obj: any, path: any) => {
    return path?.split(".").reduce((acc: any, key: any) => acc[key], obj);
  };

  if (direction === "asc") {
    return [...array].sort((a, b) =>
      isNumber(getValue(a, prop)) && isNumber(getValue(b, prop))
        ? (getValue(a, prop) as number) - (getValue(b, prop) as number)
        : asString(getValue(a, prop)).localeCompare(getValue(b, prop))
    );
  }

  return [...array].sort((a, b) =>
    isNumber(getValue(a, prop)) && isNumber(getValue(b, prop))
      ? (getValue(b, prop) as number) - (getValue(a, prop) as number)
      : asString(getValue(b, prop)).localeCompare(asString(getValue(a, prop)))
  );
};
