import React from 'react';
import { Department } from '../../types';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { Users, Phone, Package, Edit } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>12 名员工</span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Edit className="w-4 h-4" />}
        >
          编辑
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          {department.contactNumber}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Package className="w-4 h-4 mr-2" />
          本月领用：235件
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">库存总值</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">¥12,580</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">月度预算</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">¥20,000</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DepartmentCard;