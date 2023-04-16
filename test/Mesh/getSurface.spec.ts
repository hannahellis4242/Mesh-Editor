import { vec } from "../../src/Mesh2/Vector";
import addSurfaces from "../../src/Mesh2/addSurfaces";
import addVertices from "../../src/Mesh2/addVertices";
import unitMesh from "../../src/Mesh2/unitMesh";
import getSurface from "../../src/Mesh2/getSurface";

describe("getSurface", () => {
  describe("getting a surface", () => {
    const mesh = addSurfaces(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertices(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0)
      )(unitMesh())
    );
    it("should give the first surface", () => {
      const value = getSurface(0)(mesh);
      expect(value).toBeDefined();
      if (value) {
        const [p0, p1, p2] = value.indices;
        expect(p0).toBe(0);
        expect(p1).toBe(1);
        expect(p2).toBe(2);
      }
    });
  });
  describe("getting a surface that doesn't exist", () => {
    const mesh = addSurfaces(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertices(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0)
      )(unitMesh())
    );
    it("should give the first surface", () => {
      const value = getSurface(2)(mesh);
      expect(value).toBeUndefined();
    });
  });
});
