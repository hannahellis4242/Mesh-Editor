import Triangle, { Indices, equalTriangles, triangle } from "./Triangle";
import Vector from "./Vector";
import addSurface from "./addSurface";
import buildMesh from "./buildMesh";
import surfaceCanBeAdded from "./surfaceCanBeAdded";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
}

//surface crud

//update
export interface ReplaceSurface {
  index: number;
  value: Indices;
}
export const replaceSurface = (
  mesh: Mesh,
  { index, value }: ReplaceSurface
): Mesh => {
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
