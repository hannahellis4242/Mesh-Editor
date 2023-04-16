import { vec } from "../../src/Mesh2/Vector";
import addSurfaces from "../../src/Mesh2/addSurfaces";
import addVertices from "../../src/Mesh2/addVertices";
import unitMesh from "../../src/Mesh2/unitMesh";
import removeSurface from "../../src/Mesh2/removeSurface";

describe("removeSurface", () => {
  describe("remove a surface", () => {
    const init = addSurfaces(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertices(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = removeSurface(1)(init);
    it("should have one surface", () => {
      expect(mesh.surfaces).toHaveLength(1);
    });
  });
  describe("remove a surface that doesn't exist", () => {
    const init = addSurfaces(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertices(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = removeSurface(4)(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
    it("should still be the same mesh", () => expect(mesh).toBe(init));
  });
});
