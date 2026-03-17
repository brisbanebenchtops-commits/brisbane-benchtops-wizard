import { STORAGE_KEY } from '../utils/constants';

export const loadProspects = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load prospects:', e);
    return [];
  }
};

export const saveProspects = (prospects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects));
  } catch (e) {
    console.error('Failed to save prospects:', e);
  }
};

export const exportProspectJSON = (prospect) => {
  const data = JSON.stringify(prospect, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BB_${prospect.firstName}_${prospect.lastName}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importProspectJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const prospect = JSON.parse(e.target.result);
        resolve(prospect);
      } catch (err) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
