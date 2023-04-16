import { getSurface, removeSurface, replaceSurface } from "../src/Mesh2/Mesh";
import unitMesh from "../src/Mesh2/unitMesh";
import addVertices from "../src/Mesh2/addVertices";
import { vec } from "../src/Mesh2/Vector";
import addSurfaces from "../src/Mesh2/addSurfaces";

describe("Mesh", () => {
  describe("surface operations", () => {
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
        const value = getSurface(mesh, 0);
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
        const value = getSurface(mesh, 2);
        expect(value).toBeUndefined();
      });
    });
    describe("editing a surface", () => {
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
      const mesh = replaceSurface(init, { index: 1, value: [0, 2, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should have updated the last surface to be new value", () => {
        const found = getSurface(mesh, 1);
        expect(found).toBeTruthy();
        if (found) {
          const [p0, p1, p2] = found.indices;
          expect(p0).toBe(0);
          expect(p1).toBe(2);
          expect(p2).toBe(4);
        }
      });
    });
    describe("editing a surface that doesn't exist", () => {
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
      const mesh = replaceSurface(init, { index: 5, value: [0, 2, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
    describe("replacing a surface with a new surface that uses a vertex that doesn't exist", () => {
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
      const mesh = replaceSurface(init, { index: 1, value: [0, 5, 4] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
    describe("replacing a surface with an existing surface", () => {
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
      const mesh = replaceSurface(init, { index: 1, value: [0, 1, 2] });
      it("should have two surfaces", () => {
        expect(mesh.surfaces).toHaveLength(2);
      });
      it("should give back the same mesh", () => expect(mesh).toBe(init));
    });
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
