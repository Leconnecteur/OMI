import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
      <CheckCircle className="h-5 w-5 mr-2" />
      <span>Bien immobilier ajouté avec succès !</span>
    </div>
  );
};

export default SuccessMessage;