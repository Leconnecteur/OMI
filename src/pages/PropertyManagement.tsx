import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import PropertyForm from '../components/dashboard/PropertyForm';
import PropertyHistory from '../components/history/PropertyHistory';
import { useNavigate, useLocation } from 'react-router-dom';

const PropertyManagement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultTab = location.pathname === '/dashboard/history' ? 'history' : 'form';

  const handleTabChange = (value: string) => {
    navigate(value === 'history' ? '/dashboard/history' : '/dashboard/data');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Tabs defaultValue={defaultTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="form">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
              </svg>
              <span>Saisie d'un bien</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>Historique</span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="space-y-4">
          <PropertyForm />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <PropertyHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyManagement;
