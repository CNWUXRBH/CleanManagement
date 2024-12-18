import React, { useState } from 'react';
import { Item } from '../../../types';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import MovementForm from '../movement/MovementForm';
import { PlusCircle, MinusCircle, Edit, Trash2 } from 'lucide-react';

interface ItemActionsProps {
  item: Item;
}

const ItemActions: React.FC<ItemActionsProps> = ({ item }) => {
  const [showMovementForm, setShowMovementForm] = useState(false);
  const [movementType, setMovementType] = useState<'in' | 'out'>('in');

  const handleMovement = (type: 'in' | 'out') => {
    setMovementType(type);
    setShowMovementForm(true);
  };

  return (
    <div className="space-y-6">
      <Card title="快捷操作">
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full justify-center"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => handleMovement('in')}
          >
            入库登记
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-center"
            icon={<MinusCircle className="w-4 h-4" />}
            onClick={() => handleMovement('out')}
          >
            出库登记
          </Button>
        </div>
      </Card>

      <Card title="物品管理">
        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full justify-center"
            icon={<Edit className="w-4 h-4" />}
          >
            编辑信息
          </Button>
          <Button
            variant="danger"
            className="w-full justify-center"
            icon={<Trash2 className="w-4 h-4" />}
          >
            删除物品
          </Button>
        </div>
      </Card>

      {showMovementForm && (
        <Card title={movementType === 'in' ? '入库登记' : '出库登记'}>
          <MovementForm
            itemId={item.id}
            onSubmit={(movement) => {
              console.log('Movement submitted:', movement);
              setShowMovementForm(false);
            }}
            onCancel={() => setShowMovementForm(false)}
          />
        </Card>
      )}
    </div>
  );
}

export default ItemActions;