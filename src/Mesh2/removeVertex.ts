import Mesh from "./Mesh";
import { uses } from "./Triangle";
import buildMesh from "./buildMesh";

const removeVertex =
  (index: number) =>
  (mesh: Mesh): Mesh => {
    const found = mesh.vertices.at(index);
    return found
      ? buildMesh(
          mesh.vertices.filter((_, i) => i !== index),
          mesh.surfaces.filter((tri) => !uses(tri, index))
        )
      : mesh;
  };
export default removeVertex;
