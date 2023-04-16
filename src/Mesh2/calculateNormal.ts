import Vector, { cross, subtract } from "./Vector";

const calculateNormal = (p0: Vector, p1: Vector, p2: Vector) => {
  const p01 = subtract(p1, p0);
  const p02 = subtract(p2, p0);
  return cross(p01, p02);
};

export default calculateNormal;
