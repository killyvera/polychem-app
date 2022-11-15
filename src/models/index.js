// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { FormulaElement, Product, Form, Production } = initSchema(schema);

export {
  RawMaterial,
  LotRawMaterial,
  Sheduled,
  Form,
  Production,
  Product,
  Form,
  Production,
};
