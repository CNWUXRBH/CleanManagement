import { useState, useEffect } from 'react';
import { OrderComment } from '../../types/procurement';

export const useOrderComments = (orderId: string) => {
  const [comments, setComments] = useState<OrderComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data
        const mockComments: OrderComment[] = [
          {
            id: '1',
            userId: 'USER001',
            content: '请尽快处理此采购申请',
            timestamp: new Date().toISOString(),
          }
        ];
        setComments(mockComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [orderId]);

  const addComment = async (content: string, attachments: File[] = []) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComment: OrderComment = {
        id: Date.now().toString(),
        userId: 'CURRENT_USER',
        content,
        timestamp: new Date().toISOString(),
        attachments: attachments.map(file => ({
          id: Date.now().toString(),
          name: file.name,
          url: URL.createObjectURL(file)
        }))
      };

      setComments(prev => [...prev, newComment]);
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    comments,
    isLoading,
    isSubmitting,
    addComment
  };
};

export default useOrderComments;