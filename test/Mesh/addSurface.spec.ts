import { vec } from "../../src/Mesh2/Vector";
import addSurface from "../../src/Mesh2/addSurface";
import addVertices from "../../src/Mesh2/addVertices";
import unitMesh from "../../src/Mesh2/unitMesh";

describe("addSurface", () => {
  describe("when adding a surface", () => {
    const init = addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(
      unitMesh()
    );
    const mesh = addSurface([0, 1, 2])(init);
    it("should have one surface", () => {
      expect(mesh.surfaces).toHaveLength(1);
    });
    it("should have value [0,1,2]", () => {
      const [triangle] = mesh.surfaces;
      const [p0, p1, p2] = triangle.indices;
      expect(p0).toBe(0);
      expect(p1).toBe(1);
      expect(p2).toBe(2);
    });
  });
  describe("when adding a surface with and index that doesn't exist", () => {
    const init = addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(
      unitMesh()
    );
    const mesh = addSurface([0, 1, 3])(init);
    it("should have no surfaces", () => {
      expect(mesh.surfaces).toHaveLength(0);
    });
  });
  describe("when adding a surface that already exists", () => {
    const init = addSurface([0, 1, 2])(
      addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(unitMesh())
    );
    const mesh = addSurface([0, 1, 2])(init);
    it("should have one surface", () => {
      expect(mesh.surfaces).toHaveLength(1);
    });
  });
  describe("when adding a surface that already exists but is just a rotation", () => {
    const init = addSurface([0, 1, 2])(
      addVertices([vec(5, -4, 0), vec(4, 2, 0), vec(-1, 5, 0)])(unitMesh())
    );
    const mesh = addSurface([1, 2, 0])(init);
    it("should have one surface", () => {
      expect(mesh.surfaces).toHaveLength(1);
    });
  });
  describe("when adding a new surface", () => {
    const init = addSurface([0, 1, 2])(
      addVertices([
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
      ])(unitMesh())
    );
    const mesh = addSurface([0, 2, 3])(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
  });
});
