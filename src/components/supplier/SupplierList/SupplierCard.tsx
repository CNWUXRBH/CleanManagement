import React from 'react';
import { Supplier } from '../../../types';
import Card from '../../shared/Card';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import Button from '../../shared/Button';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, value: supplier.phone },
    { icon: <Mail className="w-4 h-4" />, value: supplier.email },
    { icon: <MapPin className="w-4 h-4" />, value: supplier.address },
  ];

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">4.5/5</span>
          </div>
        </div>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          合作中
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600">
            <span className="mr-2">{info.icon}</span>
            {info.value}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <Button variant="secondary" size="sm">查看详情</Button>
          <Button variant="primary" size="sm">联系供应商</Button>
        </div>
      </div>
    </Card>
  );
};

export default SupplierCard;