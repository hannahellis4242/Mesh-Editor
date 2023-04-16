import Mesh from "./Mesh";
import { Indices, equalTriangles, triangle } from "./Triangle";

const surfaceCanBeAdded =
  (indices: Indices) =>
  (mesh: Mesh): boolean => {
    const allExist = indices.every((x) => mesh.vertices.at(x));
    if (!allExist) {
      //mesh does not contain all the vertices in indices
      return false;
    }
    const surface = triangle(indices);
    return !mesh.surfaces.find((x) => equalTriangles(x, surface));
  };
export default surfaceCanBeAdded;
