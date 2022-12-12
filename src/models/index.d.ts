import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type TeamMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProdutionLotMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MaterialRawMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RawMaterialLotMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FormulaElementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PalletMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PackageMetaData = {
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

type EagerTeamMember = {
  readonly id: string;
  readonly cognitoId?: string | null;
  readonly shift?: string | null;
  readonly productionID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamMember = {
  readonly id: string;
  readonly cognitoId?: string | null;
  readonly shift?: string | null;
  readonly productionID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TeamMember = LazyLoading extends LazyLoadingDisabled ? EagerTeamMember : LazyTeamMember

export declare const TeamMember: (new (init: ModelInit<TeamMember, TeamMemberMetaData>) => TeamMember) & {
  copyOf(source: TeamMember, mutator: (draft: MutableModel<TeamMember, TeamMemberMetaData>) => MutableModel<TeamMember, TeamMemberMetaData> | void): TeamMember;
}

type EagerProdutionLot = {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly expirationDate?: string | null;
  readonly code?: string | null;
  readonly productionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProdutionLot = {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly expirationDate?: string | null;
  readonly code?: string | null;
  readonly productionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProdutionLot = LazyLoading extends LazyLoadingDisabled ? EagerProdutionLot : LazyProdutionLot

export declare const ProdutionLot: (new (init: ModelInit<ProdutionLot, ProdutionLotMetaData>) => ProdutionLot) & {
  copyOf(source: ProdutionLot, mutator: (draft: MutableModel<ProdutionLot, ProdutionLotMetaData>) => MutableModel<ProdutionLot, ProdutionLotMetaData> | void): ProdutionLot;
}

type EagerMaterialRaw = {
  readonly id: string;
  readonly name?: string | null;
  readonly RawMaterialLots?: (RawMaterialLot | null)[] | null;
  readonly productionID: string;
  readonly formulaelementID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMaterialRaw = {
  readonly id: string;
  readonly name?: string | null;
  readonly RawMaterialLots: AsyncCollection<RawMaterialLot>;
  readonly productionID: string;
  readonly formulaelementID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MaterialRaw = LazyLoading extends LazyLoadingDisabled ? EagerMaterialRaw : LazyMaterialRaw

export declare const MaterialRaw: (new (init: ModelInit<MaterialRaw, MaterialRawMetaData>) => MaterialRaw) & {
  copyOf(source: MaterialRaw, mutator: (draft: MutableModel<MaterialRaw, MaterialRawMetaData>) => MutableModel<MaterialRaw, MaterialRawMetaData> | void): MaterialRaw;
}

type EagerRawMaterialLot = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly lotCode?: string | null;
  readonly quantity?: number | null;
  readonly notUsedQuantity?: number | null;
  readonly wasteQuantity?: number | null;
  readonly useQuantity?: number | null;
  readonly materialrawID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRawMaterialLot = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly lotCode?: string | null;
  readonly quantity?: number | null;
  readonly notUsedQuantity?: number | null;
  readonly wasteQuantity?: number | null;
  readonly useQuantity?: number | null;
  readonly materialrawID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RawMaterialLot = LazyLoading extends LazyLoadingDisabled ? EagerRawMaterialLot : LazyRawMaterialLot

export declare const RawMaterialLot: (new (init: ModelInit<RawMaterialLot, RawMaterialLotMetaData>) => RawMaterialLot) & {
  copyOf(source: RawMaterialLot, mutator: (draft: MutableModel<RawMaterialLot, RawMaterialLotMetaData>) => MutableModel<RawMaterialLot, RawMaterialLotMetaData> | void): RawMaterialLot;
}

type EagerFormulaElement = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly quantity?: string | null;
  readonly productID?: string | null;
  readonly MaterialRaws?: (MaterialRaw | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFormulaElement = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly quantity?: string | null;
  readonly productID?: string | null;
  readonly MaterialRaws: AsyncCollection<MaterialRaw>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FormulaElement = LazyLoading extends LazyLoadingDisabled ? EagerFormulaElement : LazyFormulaElement

export declare const FormulaElement: (new (init: ModelInit<FormulaElement, FormulaElementMetaData>) => FormulaElement) & {
  copyOf(source: FormulaElement, mutator: (draft: MutableModel<FormulaElement, FormulaElementMetaData>) => MutableModel<FormulaElement, FormulaElementMetaData> | void): FormulaElement;
}

type EagerPallet = {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly units?: string | null;
  readonly productionID?: string | null;
  readonly Packages?: (Package | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPallet = {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly units?: string | null;
  readonly productionID?: string | null;
  readonly Packages: AsyncCollection<Package>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pallet = LazyLoading extends LazyLoadingDisabled ? EagerPallet : LazyPallet

export declare const Pallet: (new (init: ModelInit<Pallet, PalletMetaData>) => Pallet) & {
  copyOf(source: Pallet, mutator: (draft: MutableModel<Pallet, PalletMetaData>) => MutableModel<Pallet, PalletMetaData> | void): Pallet;
}

type EagerPackage = {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly code?: string | null;
  readonly palletID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPackage = {
  readonly id: string;
  readonly name?: string | null;
  readonly units?: number | null;
  readonly code?: string | null;
  readonly palletID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Package = LazyLoading extends LazyLoadingDisabled ? EagerPackage : LazyPackage

export declare const Package: (new (init: ModelInit<Package, PackageMetaData>) => Package) & {
  copyOf(source: Package, mutator: (draft: MutableModel<Package, PackageMetaData>) => MutableModel<Package, PackageMetaData> | void): Package;
}

type EagerSheduled = {
  readonly id: string;
  readonly Forms?: (Form | null)[] | null;
  readonly Productions?: (Production | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySheduled = {
  readonly id: string;
  readonly Forms: AsyncCollection<Form>;
  readonly Productions: AsyncCollection<Production>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Sheduled = LazyLoading extends LazyLoadingDisabled ? EagerSheduled : LazySheduled

export declare const Sheduled: (new (init: ModelInit<Sheduled, SheduledMetaData>) => Sheduled) & {
  copyOf(source: Sheduled, mutator: (draft: MutableModel<Sheduled, SheduledMetaData>) => MutableModel<Sheduled, SheduledMetaData> | void): Sheduled;
}

type EagerForm = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly planned?: boolean | null;
  readonly schedule?: string | null;
  readonly sent?: boolean | null;
  readonly expire?: boolean | null;
  readonly expirationDate?: string | null;
  readonly active?: boolean | null;
  readonly sheduledID?: string | null;
  readonly leadProduction?: string | null;
  readonly Production?: Production | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly formProductionId?: string | null;
}

type LazyForm = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly planned?: boolean | null;
  readonly schedule?: string | null;
  readonly sent?: boolean | null;
  readonly expire?: boolean | null;
  readonly expirationDate?: string | null;
  readonly active?: boolean | null;
  readonly sheduledID?: string | null;
  readonly leadProduction?: string | null;
  readonly Production: AsyncItem<Production | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly formProductionId?: string | null;
}

export declare type Form = LazyLoading extends LazyLoadingDisabled ? EagerForm : LazyForm

export declare const Form: (new (init: ModelInit<Form, FormMetaData>) => Form) & {
  copyOf(source: Form, mutator: (draft: MutableModel<Form, FormMetaData>) => MutableModel<Form, FormMetaData> | void): Form;
}

type EagerProduction = {
  readonly id: string;
  readonly name?: string | null;
  readonly expectedUnits?: number | null;
  readonly expectedPackages?: number | null;
  readonly expectedPallets?: number | null;
  readonly standard?: boolean | null;
  readonly extraUnits?: number | null;
  readonly notes?: string | null;
  readonly Product?: Product | null;
  readonly sheduledID?: string | null;
  readonly Pallets?: (Pallet | null)[] | null;
  readonly ProdutionLots?: (ProdutionLot | null)[] | null;
  readonly MaterialRaws?: (MaterialRaw | null)[] | null;
  readonly TeamMembers?: (TeamMember | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productionProductId?: string | null;
}

type LazyProduction = {
  readonly id: string;
  readonly name?: string | null;
  readonly expectedUnits?: number | null;
  readonly expectedPackages?: number | null;
  readonly expectedPallets?: number | null;
  readonly standard?: boolean | null;
  readonly extraUnits?: number | null;
  readonly notes?: string | null;
  readonly Product: AsyncItem<Product | undefined>;
  readonly sheduledID?: string | null;
  readonly Pallets: AsyncCollection<Pallet>;
  readonly ProdutionLots: AsyncCollection<ProdutionLot>;
  readonly MaterialRaws: AsyncCollection<MaterialRaw>;
  readonly TeamMembers: AsyncCollection<TeamMember>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productionProductId?: string | null;
}

export declare type Production = LazyLoading extends LazyLoadingDisabled ? EagerProduction : LazyProduction

export declare const Production: (new (init: ModelInit<Production, ProductionMetaData>) => Production) & {
  copyOf(source: Production, mutator: (draft: MutableModel<Production, ProductionMetaData>) => MutableModel<Production, ProductionMetaData> | void): Production;
}

type EagerProduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly unitsPerPackage?: number | null;
  readonly packagesPerPallets?: number | null;
  readonly code?: string | null;
  readonly image?: string | null;
  readonly FormulaElements?: (FormulaElement | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly unitsPerPackage?: number | null;
  readonly packagesPerPallets?: number | null;
  readonly code?: string | null;
  readonly image?: string | null;
  readonly FormulaElements: AsyncCollection<FormulaElement>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product, ProductMetaData>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}