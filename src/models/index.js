// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FormulaElement, Product, Form } = initSchema(schema);

export {
  FormulaElement,
  Product,
  Form
};