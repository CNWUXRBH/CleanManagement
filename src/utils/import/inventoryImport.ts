import { Item } from '../../types';
import Papa from 'papaparse';

interface ImportResult {
  success: boolean;
  data?: Item[];
  errors?: string[];
}

export const validateImportData = (data: any[]): string[] => {
  const errors: string[] = [];
  
  data.forEach((row, index) => {
    if (!row.code) errors.push(`第${index + 1}行: 物品编码不能为空`);
    if (!row.name) errors.push(`第${index + 1}行: 物品名称不能为空`);
    if (!row.category) errors.push(`第${index + 1}行: 物品类别不能为空`);
    if (!row.specification) errors.push(`第${index + 1}行: 规格型号不能为空`);
    if (!row.unit) errors.push(`第${index + 1}行: 计量单位不能为空`);
    if (isNaN(row.currentStock)) errors.push(`第${index + 1}行: 当前库存必须为数字`);
    if (isNaN(row.minStock)) errors.push(`第${index + 1}行: 最小库存必须为数字`);
    if (isNaN(row.price)) errors.push(`第${index + 1}行: 单价必须为数字`);
  });

  return errors;
};

export const parseImportFile = (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const errors = validateImportData(results.data);
        if (errors.length > 0) {
          resolve({ success: false, errors });
          return;
        }

        const items = results.data.map((row: any) => ({
          code: row.code,
          name: row.name,
          category: row.category,
          specification: row.specification,
          unit: row.unit,
          currentStock: parseInt(row.currentStock),
          minStock: parseInt(row.minStock),
          price: parseFloat(row.price),
          supplierId: row.supplierId || ''
        }));

        resolve({ success: true, data: items });
      },
      error: (error) => {
        resolve({ 
          success: false, 
          errors: [`文件解析错误: ${error.message}`] 
        });
      }
    });
  });
};

export const generateImportTemplate = (): string => {
  const headers = [
    '物品编码',
    '物品名称',
    '类别',
    '规格',
    '单位',
    '当前库存',
    '最小库存',
    '单价',
    '供应商ID'
  ];

  const example = [
    'CL001',
    '洗手液',
    '清洁用品',
    '500ml/瓶',
    '瓶',
    '100',
    '20',
    '12.5',
    'SUP001'
  ];

  return [headers.join(','), example.join(',')].join('\n');
};

export const downloadImportTemplate = () => {
  const template = generateImportTemplate();
  const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', '库存导入模板.csv');
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};