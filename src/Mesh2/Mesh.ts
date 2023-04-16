import Triangle, { Indices, equalTriangles, triangle, uses } from "./Triangle";
import Vector, { equalVectors } from "./Vector";
import buildMesh from "./buildMesh";

export default interface Mesh {
  readonly vertices: Vector[];
  readonly surfaces: Triangle[];
}

export const unit = (): Mesh => ({
  vertices: [],
  surfaces: [],
});
//read
export const getVertex = (mesh: Mesh, index: number): Vector | undefined =>
  mesh.vertices.at(index);
//edit
export interface ReplaceVertex {
  index: number;
  value: Vector;
}
export const replaceVertex = (
  mesh: Mesh,
  { index, value }: ReplaceVertex
): Mesh => {
  const found = getVertex(mesh, index);
  if (!found) {
    return mesh;
  }
  return buildMesh(
    mesh.vertices.map((v, i) => (i === index ? value : v)),
    mesh.surfaces
  );
};
//delete
export const removeVertex = (mesh: Mesh, index: number): Mesh => {
  const found = mesh.vertices.at(index);
  return found
    ? buildMesh(
        mesh.vertices.filter((_, i) => i !== index),
        mesh.surfaces.filter((tri) => !uses(tri, index))
      )
    : mesh;
};

//surface crud
const surfaceCanBeAdded = (mesh: Mesh, indices: Indices): boolean => {
  const allExist = indices.every((x) => mesh.vertices.at(x));
  if (!allExist) {
    //mesh does not contain all the vertices in indices
    return false;
  }
  const surface = triangle(indices);
  const found = mesh.surfaces.find((x) => equalTriangles(x, surface));
  if (found) {
    //mesh already contains this triangle
    return false;
  }
  return true;
};

//create
export const addSurface = (mesh: Mesh, indices: Indices) => {
  return surfaceCanBeAdded(mesh, indices)
    ? buildMesh(mesh.vertices, mesh.surfaces.concat(triangle(indices)))
    : mesh;
};
export const addSurfaces = (mesh: Mesh, indices: Indices[]) =>
  indices.reduce((acc, x) => addSurface(acc, x), mesh);
//read
export const getSurface = (mesh: Mesh, index: number): Triangle | undefined =>
  mesh.surfaces.at(index);
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
  return surfaceCanBeAdded(mesh, value)
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
