import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Building2, Users, FileText, CreditCard, LayoutDashboard, LogOut } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Imóveis', path: '/properties' },
  { icon: Users, label: 'Inquilinos', path: '/tenants' },
  { icon: FileText, label: 'Contratos', path: '/contracts' },
  { icon: CreditCard, label: 'Pagamentos', path: '/payments' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">PropManager</h1>
        </div>
        <ul className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                    isActive ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-0 w-full p-6">
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </nav>
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}