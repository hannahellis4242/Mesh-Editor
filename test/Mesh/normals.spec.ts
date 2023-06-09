import { vec } from "../../src/Mesh2/Vector";
import addSurface from "../../src/Mesh2/addSurface";
import addVertex from "../../src/Mesh2/addVertex";
import unitMesh from "../../src/Mesh2/unitMesh";
import getNormal from "../../src/Mesh2/getNormal";

describe("normals", () => {
  describe("when getting the normal for a flat surface", () => {
    const mesh = addSurface([0, 1, 2])(
      addVertex(vec(0, 0, 0), vec(1, 0, 0), vec(0, 1, 0))(unitMesh())
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
    const mesh = addSurface([0, 1, 2])(
      addVertex(vec(1, 0, 0), vec(0, 1, 0), vec(0, 0, 1))(unitMesh())
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
