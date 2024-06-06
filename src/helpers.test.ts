import { orderBy } from "./helpers";

enum Direction {
  Left,
  Right,
}

test("orderBy", () => {
  expect(orderBy([{ value: true }, { value: false }], "value", "asc")).toEqual([
    { value: false },
    { value: true },
  ]);

  expect(orderBy([{ value: true }, { value: false }], "value", "desc")).toEqual(
    [{ value: true }, { value: false }]
  );

  expect(
    orderBy(
      [{ direction: Direction.Left }, { direction: Direction.Right }],
      "direction",
      "asc"
    )
  ).toEqual([{ direction: Direction.Left }, { direction: Direction.Right }]);

  expect(
    orderBy(
      [{ direction: Direction.Left }, { direction: Direction.Right }],
      "direction",
      "desc"
    )
  ).toEqual([{ direction: Direction.Right }, { direction: Direction.Left }]);

  expect(orderBy([{ name: "2" }, { name: "1" }], "name", "asc")).toEqual([
    { name: "1" },
    { name: "2" },
  ]);

  expect(orderBy([{ name: "2" }, { name: "1" }], "name", "desc")).toEqual([
    { name: "2" },
    { name: "1" },
  ]);

  expect(orderBy([{ name: "2" }, { name: undefined }], "name", "asc")).toEqual([
    { name: undefined },
    { name: "2" },
  ]);

  expect(orderBy([{ name: "2" }, { name: undefined }], "name", "desc")).toEqual(
    [{ name: "2" }, { name: undefined }]
  );

  expect(orderBy([{ name: 2 }, { name: 1 }], "name", "asc")).toEqual([
    { name: 1 },
    { name: 2 },
  ]);

  expect(orderBy([{ name: 2 }, { name: 1 }], "name", "desc")).toEqual([
    { name: 2 },
    { name: 1 },
  ]);

  expect(
    orderBy([{ data: { name: 2 } }, { data: { name: 1 } }], "data.name", "desc")
  ).toEqual([{ data: { name: 2 } }, { data: { name: 1 } }]);
});
