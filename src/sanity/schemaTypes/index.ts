import { type SchemaTypeDefinition } from "sanity";
import foods from "./foods";
import order from "./order";
import reservation from "./reservation";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foods, order, reservation],
};
