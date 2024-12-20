export interface Category {
  id: string;
  name: string;
  code: string;
  description?: string;
  parentId?: string;
  order?: number;
  isActive: boolean;
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  description?: string;
  isBase: boolean;
  conversionRate?: number;
  baseUnitId?: string;
  isActive: boolean;
}

export interface Specification {
  id: string;
  name: string;
  code: string;
  description?: string;
  categoryId: string;
  attributes: {
    name: string;
    value: string;
  }[];
  isActive: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}