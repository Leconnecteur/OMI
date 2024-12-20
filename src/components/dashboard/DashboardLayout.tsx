import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, LayoutDashboard, Map, FileSpreadsheet, LogOut, Menu, X } from 'lucide-react';
import { signOut } from '../../services/auth';
import logo from '../../assets/logo.png';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#E5DED5] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex justify-center px-4 mb-6">
              <img className="h-16 w-auto" src={logo} alt="OMI Logo" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/dashboard"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#4A4238] hover:bg-[#4A4238] hover:text-[#E5DED5]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <LayoutDashboard className="mr-3 h-6 w-6" />
                Tableau de bord
              </Link>
              <Link
                to="/dashboard/map"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#4A4238] hover:bg-[#4A4238] hover:text-[#E5DED5]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Map className="mr-3 h-6 w-6" />
                Carte des ventes
              </Link>
              <Link
                to="/dashboard/search"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#4A4238] hover:bg-[#4A4238] hover:text-[#E5DED5]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Building2 className="mr-3 h-6 w-6" />
                Recherche
              </Link>
              <Link
                to="/dashboard/data"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#4A4238] hover:bg-[#4A4238] hover:text-[#E5DED5]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileSpreadsheet className="mr-3 h-6 w-6" />
                Saisie données
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-[#4A4238]/20 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-[#4A4238] hover:bg-[#4A4238] hover:text-[#E5DED5]"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="text-[#4A4238] hover:text-[#4A4238]/80"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <img className="h-8 w-auto" src={logo} alt="OMI Logo" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}