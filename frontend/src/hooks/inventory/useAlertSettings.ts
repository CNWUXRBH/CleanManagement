import { useState, useEffect } from 'react';

interface AlertSettings {
  lowStockThreshold: number;
  expiryWarningDays: number;
  consumptionAlertPercentage: number;
}

export const useAlertSettings = () => {
  const [settings, setSettings] = useState<AlertSettings>({
    lowStockThreshold: 20,
    expiryWarningDays: 30,
    consumptionAlertPercentage: 50
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, load from API
        const savedSettings = localStorage.getItem('alertSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Error loading alert settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: AlertSettings): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, save to API
      localStorage.setItem('alertSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Error updating alert settings:', error);
      return false;
    }
  };

  return {
    settings,
    isLoading,
    updateSettings
  };
};

export default useAlertSettings;