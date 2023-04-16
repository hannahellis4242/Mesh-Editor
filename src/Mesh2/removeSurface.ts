import Mesh from "./Mesh";
import buildMesh from "./buildMesh";

const removeSurface =
  (index: number) =>
  (mesh: Mesh): Mesh => {
    const found = mesh.surfaces.at(index);
    if (!found) {
      return mesh;
    }
    return buildMesh(
      mesh.vertices,
      mesh.surfaces.filter((_, i) => i !== index)
    );
  };
export default removeSurface;
