import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RawMaterialMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LotRawMaterialMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SheduledMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormulaElementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LotProductionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PalletMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PackageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductionMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class RawMaterial {
  readonly id: string;
  readonly LotRawMaterials?: (LotRawMaterial | null)[] | null;
  readonly productionID: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<RawMaterial, RawMaterialMetaData>);
  static copyOf(source: RawMaterial, mutator: (draft: MutableModel<RawMaterial, RawMaterialMetaData>) => MutableModel<RawMaterial, RawMaterialMetaData> | void): RawMaterial;
}

export declare class LotRawMaterial {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly lotCode?: string | null;
  readonly quantity?: number | null;
  readonly notUsedQuantity?: number | null;
  readonly wasteQuantity?: number | null;
  readonly useQuantity?: number | null;
  readonly rawmaterialID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LotRawMaterial, LotRawMaterialMetaData>);
  static copyOf(source: LotRawMaterial, mutator: (draft: MutableModel<LotRawMaterial, LotRawMaterialMetaData>) => MutableModel<LotRawMaterial, LotRawMaterialMetaData> | void): LotRawMaterial;
}

export declare class Sheduled {
  readonly id: string;
  readonly Forms?: (Form | null)[] | null;
  readonly Productions?: (Production | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Sheduled, SheduledMetaData>);
  static copyOf(source: Sheduled, mutator: (draft: MutableModel<Sheduled, SheduledMetaData>) => MutableModel<Sheduled, SheduledMetaData> | void): Sheduled;
}

export declare class Form {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly planned?: boolean | null;
  readonly schedule?: string | null;
  readonly sent?: boolean | null;
  readonly expire?: boolean | null;
  readonly expirationDate?: string | null;
  readonly active?: boolean | null;
  readonly Production?: Production | null;
  readonly ProductionLeader?: ProductionMember | null;
  readonly sheduledID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly formProductionId?: string | null;
  readonly formProductionLeaderId?: string | null;
  constructor(init: ModelInit<Form, FormMetaData>);
  static copyOf(source: Form, mutator: (draft: MutableModel<Form, FormMetaData>) => MutableModel<Form, FormMetaData> | void): Form;
}

export declare class Production {
  readonly id: string;
  readonly name?: string | null;
  readonly expectedUnits?: number | null;
  readonly expectedPackages?: number | null;
  readonly expectedPallets?: number | null;
  readonly standard?: boolean | null;
  readonly extraUnits?: number | null;
  readonly notes?: string | null;
  readonly Product?: Product | null;
  readonly LotProductions?: (LotProduction | null)[] | null;
  readonly Pallets?: (Pallet | null)[] | null;
  readonly ProductionMembers?: (ProductionMember | null)[] | null;
  readonly sheduledID?: string | null;
  readonly RawMaterials?: (RawMaterial | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productionProductId?: string | null;
  constructor(init: ModelInit<Production, ProductionMetaData>);
  static copyOf(source: Production, mutator: (draft: MutableModel<Production, ProductionMetaData>) => MutableModel<Production, ProductionMetaData> | void): Production;
}

export declare class Product {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly FormulaElements?: (FormulaElement | null)[] | null;
  readonly unitsPerPackage?: number | null;
  readonly palletsPerPackage?: number | null;
  readonly code?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class FormulaElement {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly quantity?: number | null;
  readonly productID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FormulaElement, FormulaElementMetaData>);
  static copyOf(source: FormulaElement, mutator: (draft: MutableModel<FormulaElement, FormulaElementMetaData>) => MutableModel<FormulaElement, FormulaElementMetaData> | void): FormulaElement;
}

export declare class LotProduction {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly expirationDate?: string | null;
  readonly code?: string | null;
  readonly productionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LotProduction, LotProductionMetaData>);
  static copyOf(source: LotProduction, mutator: (draft: MutableModel<LotProduction, LotProductionMetaData>) => MutableModel<LotProduction, LotProductionMetaData> | void): LotProduction;
}

export declare class Pallet {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly units?: number | null;
  readonly productionID: string;
  readonly Packages?: (Package | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Pallet, PalletMetaData>);
  static copyOf(source: Pallet, mutator: (draft: MutableModel<Pallet, PalletMetaData>) => MutableModel<Pallet, PalletMetaData> | void): Pallet;
}

export declare class Package {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly code?: string | null;
  readonly palletID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Package, PackageMetaData>);
  static copyOf(source: Package, mutator: (draft: MutableModel<Package, PackageMetaData>) => MutableModel<Package, PackageMetaData> | void): Package;
}

export declare class ProductionMember {
  readonly id: string;
  readonly name?: string | null;
  readonly role?: string | null;
  readonly shift?: string | null;
  readonly cognitoId?: string | null;
  readonly productionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ProductionMember, ProductionMemberMetaData>);
  static copyOf(source: ProductionMember, mutator: (draft: MutableModel<ProductionMember, ProductionMemberMetaData>) => MutableModel<ProductionMember, ProductionMemberMetaData> | void): ProductionMember;
}