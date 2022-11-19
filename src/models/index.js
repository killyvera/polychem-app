// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TeamMember, ProdutionLot, MaterialRaw, RawMaterialLot, FormulaElement, Pallet, Package, Sheduled, Form, Production, Product } = initSchema(schema);

export {
  TeamMember,
  ProdutionLot,
  MaterialRaw,
  RawMaterialLot,
  FormulaElement,
  Pallet,
  Package,
  Sheduled,
  Form,
  Production,
  Product
};