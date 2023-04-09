export type Indices = [number, number, number];
export default interface Triangle {
  readonly indices: Indices;
}

export const triangle = (indices: Indices): Triangle => ({
  indices,
});

const rotate = ([a, b, c]: Indices): Indices => {
  return [b, c, a];
};

const equal =
  (a: Indices) =>
  (b: Indices): boolean =>
    a.map((v, i) => [v, b[i]]).every(([x, y]) => x === y);

export const equalTriangles = (a: Triangle, b: Triangle): boolean => {
  const rotations = [a.indices, rotate(a.indices), rotate(rotate(a.indices))];
  const equalTo = equal(b.indices);
  return rotations.some(equalTo);
};
