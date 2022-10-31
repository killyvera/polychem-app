import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type FormulaElementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerFormulaElement = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFormulaElement = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly productID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FormulaElement = LazyLoading extends LazyLoadingDisabled ? EagerFormulaElement : LazyFormulaElement

export declare const FormulaElement: (new (init: ModelInit<FormulaElement, FormulaElementMetaData>) => FormulaElement) & {
  copyOf(source: FormulaElement, mutator: (draft: MutableModel<FormulaElement, FormulaElementMetaData>) => MutableModel<FormulaElement, FormulaElementMetaData> | void): FormulaElement;
}

type EagerProduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly FormulaElements?: (FormulaElement | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly FormulaElements: AsyncCollection<FormulaElement>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product, ProductMetaData>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

type EagerForm = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly planned?: boolean | null;
  readonly schedule?: boolean | null;
  readonly sent?: boolean | null;
  readonly expiration?: string | null;
  readonly expirationDate?: string | null;
  readonly active?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyForm = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly planned?: boolean | null;
  readonly schedule?: boolean | null;
  readonly sent?: boolean | null;
  readonly expiration?: string | null;
  readonly expirationDate?: string | null;
  readonly active?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Form = LazyLoading extends LazyLoadingDisabled ? EagerForm : LazyForm

export declare const Form: (new (init: ModelInit<Form, FormMetaData>) => Form) & {
  copyOf(source: Form, mutator: (draft: MutableModel<Form, FormMetaData>) => MutableModel<Form, FormMetaData> | void): Form;
}