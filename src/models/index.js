// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RawMaterial, LotRawMaterial, Sheduled, Form, Production, Product, FormulaElement, LotProduction, Pallet, Package, ProductionMember } = initSchema(schema);

export {
  RawMaterial,
  LotRawMaterial,
  Sheduled,
  Form,
  Production,
  Product,
  FormulaElement,
  LotProduction,
  Pallet,
  Package,
  ProductionMember
};