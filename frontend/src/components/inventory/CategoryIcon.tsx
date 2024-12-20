import React from 'react';
import { 
  Package,
  FileText,
  Wrench,
  Box
} from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = '' }) => {
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'cleaning':
        return <Package className={className} />;
      case 'paper':
        return <FileText className={className} />;
      case 'tools':
        return <Wrench className={className} />;
      default:
        return <Box className={className} />;
    }
  };

  return getIcon();
};

export default CategoryIcon;