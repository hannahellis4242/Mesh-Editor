import Vector, { cross, dot, scale } from "../mesh/Vector";

type matrix3 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export default matrix3;

export const multiply = (a: matrix3, b: matrix3): matrix3 => {
  const a00 = a[0 * 3 + 0];
  const a01 = a[0 * 3 + 1];
  const a02 = a[0 * 3 + 2];
  const a10 = a[1 * 3 + 0];
  const a11 = a[1 * 3 + 1];
  const a12 = a[1 * 3 + 2];
  const a20 = a[2 * 3 + 0];
  const a21 = a[2 * 3 + 1];
  const a22 = a[2 * 3 + 2];
  const b00 = b[0 * 3 + 0];
  const b01 = b[0 * 3 + 1];
  const b02 = b[0 * 3 + 2];
  const b10 = b[1 * 3 + 0];
  const b11 = b[1 * 3 + 1];
  const b12 = b[1 * 3 + 2];
  const b20 = b[2 * 3 + 0];
  const b21 = b[2 * 3 + 1];
  const b22 = b[2 * 3 + 2];

  return [
    b00 * a00 + b01 * a10 + b02 * a20,
    b00 * a01 + b01 * a11 + b02 * a21,
    b00 * a02 + b01 * a12 + b02 * a22,
    b10 * a00 + b11 * a10 + b12 * a20,
    b10 * a01 + b11 * a11 + b12 * a21,
    b10 * a02 + b11 * a12 + b12 * a22,
    b20 * a00 + b21 * a10 + b22 * a20,
    b20 * a01 + b21 * a11 + b22 * a21,
    b20 * a02 + b21 * a12 + b22 * a22,
  ];
};

export const determinant = ([a, b, c, d, e, f, g, h, i]: matrix3): number => {
  const col0 = { x: a, y: d, z: g };
  const col1 = { x: b, y: e, z: h };
  const col2 = { x: c, y: f, z: i };
  const det = dot(col0, cross(col1, col2));
};

export const inverse = ([a, b, c, d, e, f, g, h, i]: matrix3): matrix3 => {
  const col0 = { x: a, y: d, z: g };
  const col1 = { x: b, y: e, z: h };
  const col2 = { x: c, y: f, z: i };
  const det = dot(col0, cross(col1, col2));
  const s = scale(1 / det);
  const row0 = s(cross(col1, col2));
  const row1 = s(cross(col2, col0));
  const row2 = s(cross(col0, col1));
  return [
    row0.x,
    row0.y,
    row0.z,
    row1.x,
    row1.y,
    row1.z,
    row2.x,
    row2.y,
    row2.z,
  ];
};

export const multiplyVec =
  ([a, b, c, d, e, f, g, h, i]: matrix3) =>
  ({ x, y, z }: Vector): Vector => {
    return {
      x: a * x + b * y + c * z,
      y: d * x + e * y + f * z,
      z: g * x + h * y + i * z,
    };
  };
