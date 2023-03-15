import Triangle from "./Triangle";
import Vertex from "./Vertex";

export default class Surface extends Triangle {
  constructor(vertices: [Vertex, Vertex, Vertex], public readonly tag: string) {
    super(vertices);
  }
}
