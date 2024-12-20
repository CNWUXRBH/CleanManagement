import React, { useState } from 'react';
import { X, Upload, FileDown, AlertTriangle } from 'lucide-react';
import Button from '../../shared/Button';
import { parseImportFile, downloadImportTemplate } from '../../../utils/import/inventoryImport';

interface ImportModalProps {
  onClose: () => void;
  onImport: (data: any[]) => Promise<boolean>;
}

const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors([]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setErrors([]);

    try {
      const result = await parseImportFile(file);
      if (!result.success) {
        setErrors(result.errors || ['导入失败']);
        return;
      }

      const success = await onImport(result.data!);
      if (success) {
        onClose();
      } else {
        setErrors(['导入失败，请重试']);
      }
    } catch (error) {
      setErrors(['导入过程中发生错误']);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">导入库存数据</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <Button
                variant="secondary"
                icon={<FileDown className="w-4 h-4" />}
                onClick={downloadImportTemplate}
              >
                下载导入模板
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white rounded-md font-medium 
                      text-blue-600 hover:text-blue-500"
                  >
                    选择文件
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {file ? file.name : '支持 .csv 格式文件'}
                </p>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="bg-red-50 p-4 rounded-md">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      导入错误
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            variant="primary"
            icon={<Upload className="w-4 h-4" />}
            onClick={handleImport}
            disabled={!file || isProcessing}
            isLoading={isProcessing}
          >
            开始导入
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;