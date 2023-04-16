import Mesh from "./Mesh";
import { Indices, triangle } from "./Triangle";
import buildMesh from "./buildMesh";
import surfaceCanBeAdded from "./surfaceCanBeAdded";

export interface ReplaceSurface {
  index: number;
  value: Indices;
}
const replaceSurface =
  ({ index, value }: ReplaceSurface) =>
  (mesh: Mesh): Mesh => {
    const found = mesh.surfaces.at(index);
    if (!found) {
      return mesh;
    }
    return surfaceCanBeAdded(value)(mesh)
      ? buildMesh(
          mesh.vertices,
          mesh.surfaces.map((v, i) => (i === index ? triangle(value) : v))
        )
      : mesh;
  };
export default replaceSurface;
