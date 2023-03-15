import Colour from "../Colour";
import Triangle from "./Triangle";
import Vertex from "./Vertex";

export default class Surface extends Triangle {
  public readonly vertexTags: [string, string, string];
  constructor(
    vertices: [Vertex, Vertex, Vertex],
    public readonly tag: string,
    colour: Colour
  ) {
    super(vertices, colour);
    const [v1, v2, v3] = vertices;
    this.vertexTags = [v1.tag, v2.tag, v3.tag];
  }
}
