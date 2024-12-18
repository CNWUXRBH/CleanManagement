import { Category, Unit, Specification, ValidationResult } from '../../types/basicData';

export const validateCategory = (category: Partial<Category>): ValidationResult => {
  const errors: string[] = [];
  
  if (!category.name?.trim()) {
    errors.push('分类名称不能为空');
  }
  
  if (!category.code?.trim()) {
    errors.push('分类编码不能为空');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUnit = (unit: Partial<Unit>): ValidationResult => {
  const errors: string[] = [];
  
  if (!unit.name?.trim()) {
    errors.push('单位名称不能为空');
  }
  
  if (!unit.code?.trim()) {
    errors.push('单位编码不能为空');
  }

  if (!unit.isBase && !unit.baseUnitId) {
    errors.push('非基本单位必须指定基本单位');
  }

  if (!unit.isBase && (!unit.conversionRate || unit.conversionRate <= 0)) {
    errors.push('换算率必须大于0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSpecification = (spec: Partial<Specification>): ValidationResult => {
  const errors: string[] = [];
  
  if (!spec.name?.trim()) {
    errors.push('规格名称不能为空');
  }
  
  if (!spec.code?.trim()) {
    errors.push('规格编码不能为空');
  }

  if (!spec.categoryId) {
    errors.push('必须选择所属分类');
  }

  if (!spec.attributes || spec.attributes.length === 0) {
    errors.push('至少需要添加一个规格属性');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};