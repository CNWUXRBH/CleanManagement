import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Button from '../shared/Button';
import { Plus, Trash2, Save, X } from 'lucide-react';
import useStore from '../../store';

interface ServiceFormData {
  date: string;
  area: string;
  areaSize: number;
  amount: number;
  department: string;
  verifier: string;
  supplies: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  notes: string;
}

const ServiceForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors, isDirty } } = useForm<ServiceFormData>({
    defaultValues: {
      supplies: [{ name: '', quantity: 1, unit: '瓶' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "supplies"
  });

  const { showToast } = useStore();

  const onSubmit = async (data: ServiceFormData) => {
    try {
      // TODO: Implement API call to save the service record
      console.log('Form data:', data);
      showToast({
        type: 'success',
        message: '服务记录已保存'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: '保存失败，请重试'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">服务日期</label>
              <input
                type="date"
                {...register('date', { required: '请选择日期' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">服务区域</label>
              <input
                type="text"
                {...register('area', { required: '请输入服务区域' })}
                placeholder="例：办公区域A"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">面积（平方米）</label>
              <input
                type="number"
                {...register('areaSize', { required: '请输入面积', min: { value: 0, message: '面积必须大于0' } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.areaSize && <p className="mt-1 text-sm text-red-600">{errors.areaSize.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">金额（元）</label>
              <input
                type="number"
                {...register('amount', { required: '请输入金额', min: { value: 0, message: '金额必须大于0' } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">所属部门</label>
              <select
                {...register('department', { required: '请选择所属部门' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">请选择部门</option>
                <option value="行政部">行政部</option>
                <option value="研发部">研发部</option>
                <option value="销售部">销售部</option>
                <option value="财务部">财务部</option>
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">验收人</label>
              <input
                type="text"
                {...register('verifier', { required: '请输入验收人' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.verifier && <p className="mt-1 text-sm text-red-600">{errors.verifier.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">使用清洁用品</label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => append({ name: '', quantity: 1, unit: '瓶' })}
                icon={<Plus className="w-4 h-4" />}
              >
                添加用品
              </Button>
            </div>
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <input
                      {...register(`supplies.${index}.name` as const, { required: '请输入用品名称' })}
                      placeholder="用品名称"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.supplies?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.supplies[index]?.name?.message}</p>
                    )}
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      {...register(`supplies.${index}.quantity` as const, { 
                        required: '请输入数量',
                        min: { value: 1, message: '数量必须大于0' }
                      })}
                      placeholder="数量"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.supplies?.[index]?.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.supplies[index]?.quantity?.message}</p>
                    )}
                  </div>
                  <div className="w-24">
                    <select
                      {...register(`supplies.${index}.unit` as const)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="瓶">瓶</option>
                      <option value="桶">桶</option>
                      <option value="包">包</option>
                      <option value="个">个</option>
                      <option value="箱">箱</option>
                    </select>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => remove(index)}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      删除
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">备注</label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="请输入备注信息（选填）"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="secondary" icon={<X className="w-4 h-4" />}>
              取消
            </Button>
            <Button type="submit" variant="primary" icon={<Save className="w-4 h-4" />} disabled={!isDirty}>
              保存记录
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm; 