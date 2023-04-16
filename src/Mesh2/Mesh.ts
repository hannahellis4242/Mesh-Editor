import Triangle from "./Triangle";
import Vector from "./Vector";
import buildMesh from "./buildMesh";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
}

//surface crud

//delete
export const removeSurface = (mesh: Mesh, index: number): Mesh => {
  const found = mesh.surfaces.at(index);
  if (!found) {
    return mesh;
  }
  return buildMesh(
    mesh.vertices,
    mesh.surfaces.filter((_, i) => i !== index)
  );
};
