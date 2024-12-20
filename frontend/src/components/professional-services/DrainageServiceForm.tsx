import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DrainageServiceFormData } from '../../types/services';
import { cn } from '../../utils/cn';

interface DrainageServiceFormProps {
  onSubmit: (data: DrainageServiceFormData) => void;
  initialData?: Partial<DrainageServiceFormData>;
  isLoading?: boolean;
}

const DrainageServiceForm: React.FC<DrainageServiceFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<DrainageServiceFormData>({
    defaultValues: {
      location: initialData?.location || '',
      drainageType: initialData?.drainageType || 'mixed',
      pipelineType: initialData?.pipelineType || 'main',
      blockageLevel: initialData?.blockageLevel || 5,
      pipelineDiameter: initialData?.pipelineDiameter || 100,
      estimatedLength: initialData?.estimatedLength || 10,
      priority: initialData?.priority || 'medium',
      description: initialData?.description || '',
      requester: initialData?.requester || {
        id: '',
        name: '',
        department: '',
        contact: '',
      },
      estimatedCost: initialData?.estimatedCost || 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 基本信息 */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 位置 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              位置 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: '请输入位置' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.location ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="例如：A栋1楼男厕所"
                />
              )}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* 管道类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              管道类型 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="drainageType"
              control={control}
              rules={{ required: '请选择管道类型' }}
              render={({ field }) => (
                <select
                  {...field}
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.drainageType ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="rainwater">雨水管</option>
                  <option value="sewage">污水管</option>
                  <option value="mixed">雨污合流管</option>
                </select>
              )}
            />
            {errors.drainageType && (
              <p className="mt-1 text-sm text-red-500">{errors.drainageType.message}</p>
            )}
          </div>

          {/* 管线类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              管线类型 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="pipelineType"
              control={control}
              rules={{ required: '请选择管线类型' }}
              render={({ field }) => (
                <select
                  {...field}
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.pipelineType ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="main">主管道</option>
                  <option value="branch">支管道</option>
                  <option value="connection">连接管</option>
                </select>
              )}
            />
            {errors.pipelineType && (
              <p className="mt-1 text-sm text-red-500">{errors.pipelineType.message}</p>
            )}
          </div>

          {/* 堵塞程度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              堵塞程度 (1-10) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="blockageLevel"
              control={control}
              rules={{
                required: '请输入堵塞程度',
                min: { value: 1, message: '最小值为1' },
                max: { value: 10, message: '最大值为10' },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  min="1"
                  max="10"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.blockageLevel ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.blockageLevel && (
              <p className="mt-1 text-sm text-red-500">{errors.blockageLevel.message}</p>
            )}
          </div>

          {/* 管径 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              管径 (mm) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="pipelineDiameter"
              control={control}
              rules={{
                required: '请输入管径',
                min: { value: 50, message: '最小值为50mm' },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  min="50"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.pipelineDiameter ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.pipelineDiameter && (
              <p className="mt-1 text-sm text-red-500">{errors.pipelineDiameter.message}</p>
            )}
          </div>

          {/* 预计长度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              预计长度 (米) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="estimatedLength"
              control={control}
              rules={{
                required: '请输入预计长度',
                min: { value: 1, message: '最小值为1米' },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  min="1"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.estimatedLength ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.estimatedLength && (
              <p className="mt-1 text-sm text-red-500">{errors.estimatedLength.message}</p>
            )}
          </div>

          {/* 优先级 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              优先级 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="priority"
              control={control}
              rules={{ required: '请选择优先级' }}
              render={({ field }) => (
                <select
                  {...field}
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.priority ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                  <option value="urgent">紧急</option>
                </select>
              )}
            />
            {errors.priority && (
              <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>
            )}
          </div>

          {/* 预计费用 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              预计费用 (元) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="estimatedCost"
              control={control}
              rules={{
                required: '请输入预计费用',
                min: { value: 0, message: '费用不能为负' },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  min="0"
                  step="0.01"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.estimatedCost ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.estimatedCost && (
              <p className="mt-1 text-sm text-red-500">{errors.estimatedCost.message}</p>
            )}
          </div>
        </div>

        {/* 问题描述 */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            问题描述 <span className="text-red-500">*</span>
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: '请输入问题描述' }}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className={cn(
                  "w-full px-3 py-2 border rounded-md",
                  errors.description ? "border-red-500" : "border-gray-300"
                )}
                placeholder="请详细描述问题..."
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* 申请人信息 */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">申请人信息</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              姓名 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="requester.name"
              control={control}
              rules={{ required: '请输入申请人姓名' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.requester?.name ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.requester?.name && (
              <p className="mt-1 text-sm text-red-500">{errors.requester.name.message}</p>
            )}
          </div>

          {/* 部门 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              部门 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="requester.department"
              control={control}
              rules={{ required: '请输入申请人部门' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.requester?.department ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.requester?.department && (
              <p className="mt-1 text-sm text-red-500">{errors.requester.department.message}</p>
            )}
          </div>

          {/* 联系方式 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              联系方式 <span className="text-red-500">*</span>
            </label>
            <Controller
              name="requester.contact"
              control={control}
              rules={{ required: '请输入联系方式' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    errors.requester?.contact ? "border-red-500" : "border-gray-300"
                  )}
                />
              )}
            />
            {errors.requester?.contact && (
              <p className="mt-1 text-sm text-red-500">{errors.requester.contact.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isLoading ? '提交中...' : '提交申请'}
        </button>
      </div>
    </form>
  );
};

export default DrainageServiceForm; 