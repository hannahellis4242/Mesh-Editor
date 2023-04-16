import Mesh from "./Mesh";
import Triangle from "./Triangle";
import Vector from "./Vector";
import { calculateNormalForTriangle } from "./calculateNormal";
import unitMesh from "./unitMesh";

const buildMesh = (vertices: Vector[], surfaces: Triangle[]): Mesh => {
  const normals = surfaces.map(({ indices }) =>
    calculateNormalForTriangle(indices)(vertices)
  );
  if (normals.some((n) => !n)) {
    return unitMesh();
  }
  return { vertices, surfaces, normals: normals.map((n) => n!) };
};

export default buildMesh;
