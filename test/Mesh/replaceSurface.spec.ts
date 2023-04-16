import { vec } from "../../src/Mesh2/Vector";
import addSurface from "../../src/Mesh2/addSurface";
import addVertex from "../../src/Mesh2/addVertex";
import getSurface from "../../src/Mesh2/getSurface";
import unitMesh from "../../src/Mesh2/unitMesh";
import replaceSurface from "../../src/Mesh2/replaceSurface";

describe("replaceSurface", () => {
  describe("when editing a surface", () => {
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = replaceSurface({ index: 1, value: [0, 2, 4] })(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
    it("should have updated the last surface to be new value", () => {
      const found = getSurface(1)(mesh);
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
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = replaceSurface({ index: 5, value: [0, 2, 4] })(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
    it("should give back the same mesh", () => expect(mesh).toBe(init));
  });
  describe("replacing a surface with a new surface that uses a vertex that doesn't exist", () => {
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = replaceSurface({ index: 1, value: [0, 5, 4] })(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
    it("should give back the same mesh", () => expect(mesh).toBe(init));
  });
  describe("replacing a surface with an existing surface", () => {
    const init = addSurface(
      [0, 1, 2],
      [0, 2, 3]
    )(
      addVertex(
        vec(-1, -1, 0),
        vec(1, -1, 1),
        vec(1, 1, -1),
        vec(-1, 1, 0),
        vec(0, 2, 0)
      )(unitMesh())
    );
    const mesh = replaceSurface({ index: 1, value: [0, 1, 2] })(init);
    it("should have two surfaces", () => {
      expect(mesh.surfaces).toHaveLength(2);
    });
    it("should give back the same mesh", () => expect(mesh).toBe(init));
  });
});
