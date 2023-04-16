import { removeSurface } from "../src/Mesh2/Mesh";
import unitMesh from "../src/Mesh2/unitMesh";
import addVertices from "../src/Mesh2/addVertices";
import { vec } from "../src/Mesh2/Vector";
import addSurfaces from "../src/Mesh2/addSurfaces";

describe("Mesh", () => {
  describe("surface operations", () => {
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
      const mesh = removeSurface(init, 1);
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
      const mesh = removeSurface(init, 4);
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should still be the same mesh", () => expect(mesh).toBe(init));
    });
  });
  describe("interaction between vertex and surface operations", () => {});
  describe("surface normals", () => {
    it("placeholder", () => expect(true).toBeTruthy());
  });
});
