import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} - 保洁耗材管理系统`;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default usePageTitle;