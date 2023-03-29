import Colour from "../Colour";
import Triangle from "./Triangle";
import Vertex2 from "./Vertex2";

export default class Surface2 extends Triangle {
  public readonly vertexTags: [number, number, number];
  constructor(
    vertices: [Vertex2, Vertex2, Vertex2],
    public readonly tag: number,
    colour: Colour
  ) {
    super(vertices, colour);
    const [v1, v2, v3] = vertices;
    this.vertexTags = [v1.tag, v2.tag, v3.tag];
  }
}
