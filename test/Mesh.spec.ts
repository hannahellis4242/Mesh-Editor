import Colour from "../src/RayTrace/Scene/Colour";
import Mesh from "../src/RayTrace/Scene/mesh/Mesh";
import Ray from "../src/RayTrace/Scene/Ray";
import { vec, zeroVec } from "../src/RayTrace/Scene/Vector";
describe("Mesh", () => {
  const mesh = new Mesh(new Colour(256, 0, 0));
  const p1 = mesh.addVertex(vec(3, 5, 6));
  const p2 = mesh.addVertex(vec(8, 6, 7));
  const p3 = mesh.addVertex(vec(11, 10, 5));
  const p4 = mesh.addVertex(vec(4, 10, 6));

  const face1 = mesh.addTrangle([p1, p2, p4]);
  const face2 = mesh.addTrangle([p3, p4, p2]);
  const face3 = mesh.addTrangle([p1, p4, p3]);
  const face4 = mesh.addTrangle([p1, p3, p2]);
  it("should have the correct number of points and faces", () => {
    expect(mesh.vertices).toHaveLength(4);
    expect(mesh.surfaces).toHaveLength(4);
  });
  describe("intersecting with a ray", () => {
    const canvasPix = { x: 2.8, y: 3.3, z: 2 };
    const ray = new Ray(zeroVec(), canvasPix);
    it("should have some intersections", () => {
      const allIntersections = mesh.intersections(ray);
      expect(allIntersections).toHaveLength(2);
    });
  });
});
