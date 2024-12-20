export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `PO${year}${month}${day}${random}`;
};

export const parseOrderNumber = (orderNumber: string): {
  date: Date;
  sequence: number;
} | null => {
  try {
    const matches = orderNumber.match(/^PO(\d{4})(\d{2})(\d{2})(\d{4})$/);
    if (!matches) return null;

    const [, year, month, day, sequence] = matches;
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    return {
      date,
      sequence: parseInt(sequence)
    };
  } catch {
    return null;
  }
};

export const isValidOrderNumber = (orderNumber: string): boolean => {
  return parseOrderNumber(orderNumber) !== null;
};