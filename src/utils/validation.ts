export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName}不能为空`;
  }
  return null;
};

export const validateNumber = (value: any, fieldName: string): string | null => {
  if (isNaN(value) || value < 0) {
    return `${fieldName}必须是大于等于0的数字`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '请输入有效的电子邮箱地址';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return '请输入有效的手机号码';
  }
  return null;
};

export const validateLength = (
  value: string,
  fieldName: string,
  min: number,
  max: number
): string | null => {
  if (value.length < min || value.length > max) {
    return `${fieldName}长度必须在${min}到${max}个字符之间`;
  }
  return null;
};