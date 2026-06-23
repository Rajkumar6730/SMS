import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export const exportToCSV = (students, filename = 'students.csv') => {
  const csv = Papa.unparse(students);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const importFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};