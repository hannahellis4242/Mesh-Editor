import { equalVectors, vec } from "../../src/Mesh2/Vector";
import addSurfaces from "../../src/Mesh2/addSurfaces";
import addVertices from "../../src/Mesh2/addVertices";
import unitMesh from "../../src/Mesh2/unitMesh";
import Mesh from "../../src/Mesh2/Mesh";
import Vector from "../../src/Mesh2/Vector";

const getNormal =
  (index: number) =>
  (mesh: Mesh): Vector | undefined =>
    mesh.normals.at(index);
describe("normals", () => {
  describe("when getting the normal for a flat surface", () => {
    const mesh = addSurfaces([0, 1, 2])(
      addVertices(vec(0, 0, 0), vec(1, 0, 0), vec(0, 1, 0))(unitMesh())
    );
    const normal = getNormal(0)(mesh);
    it("should give an existing normal vector", () =>
      expect(normal).toBeDefined());
    if (normal) {
      it("should be of value (0,0,1)", () => {
        const { x, y, z } = normal;
        expect(x).toBe(0);
        expect(y).toBe(0);
        expect(z).toBe(1);
      });
    }
  });
  describe("when getting the normal for a angled surface", () => {
    const mesh = addSurfaces([0, 1, 2])(
      addVertices(vec(1, 0, 0), vec(0, 1, 0), vec(0, 0, 1))(unitMesh())
    );
    const normal = getNormal(0)(mesh);
    it("should give an existing normal vector", () =>
      expect(normal).toBeDefined());
    if (normal) {
      it("should be of value (1,1,1)", () => {
        const { x, y, z } = normal;
        expect(x).toBe(1);
        expect(y).toBe(1);
        expect(z).toBe(1);
      });
    }
  });
});
