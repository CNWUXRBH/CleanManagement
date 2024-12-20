import React from 'react';
import { Supplier } from '../../../types';
import { Building2, Phone, Mail, MapPin, User } from 'lucide-react';

interface SupplierInfoProps {
  supplier: Supplier;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({ supplier }) => {
  const details = [
    { icon: <Building2 className="w-5 h-5" />, label: '公司名称', value: supplier.name },
    { icon: <User className="w-5 h-5" />, label: '联系人', value: supplier.contact },
    { icon: <Phone className="w-5 h-5" />, label: '联系电话', value: supplier.phone },
    { icon: <Mail className="w-5 h-5" />, label: '电子邮箱', value: supplier.email },
    { icon: <MapPin className="w-5 h-5" />, label: '公司地址', value: supplier.address },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1 text-gray-400">{detail.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{detail.label}</p>
              <p className="mt-1 font-medium text-gray-900">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">供应商评价</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">综合评分</p>
            <p className="text-2xl font-semibold text-gray-900">4.5</p>
            <p className="text-sm text-gray-500">满分 5.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">合作订单</p>
            <p className="text-2xl font-semibold text-gray-900">128</p>
            <p className="text-sm text-gray-500">笔</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">合作金额</p>
            <p className="text-2xl font-semibold text-gray-900">¥286,420</p>
            <p className="text-sm text-gray-500">累计</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;