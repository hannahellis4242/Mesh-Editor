import Vector, { cross, subtract } from "./Vector";
import { Indices } from "./Triangle";
import Mesh from "./Mesh";
import getVertex from "./getVertex";

const calculateNormal = (p0: Vector, p1: Vector, p2: Vector) => {
  const p01 = subtract(p1, p0);
  const p02 = subtract(p2, p0);
  return cross(p01, p02);
};

export const calculateNormalForTriangle =
  (indices: Indices) =>
  (vertices: Vector[]): Vector | undefined => {
    const maybeVertices = indices.map((i) => vertices.at(i));
    if (maybeVertices.some((v) => !v)) {
      return undefined;
    }
    const [p0, p1, p2] = maybeVertices.map((v) => v!);
    return calculateNormal(p0, p1, p2);
  };

export default calculateNormal;
