import React from 'react';
import { Building2, Users, Wallet, AlertCircle } from 'lucide-react';

const stats = [
  {
    label: 'Total Properties',
    value: '24',
    icon: Building2,
    change: '+2 this month',
    changeType: 'positive',
  },
  {
    label: 'Active Tenants',
    value: '18',
    icon: Users,
    change: '+3 this month',
    changeType: 'positive',
  },
  {
    label: 'Monthly Revenue',
    value: 'R$ 45.280',
    icon: Wallet,
    change: '+12% vs last month',
    changeType: 'positive',
  },
  {
    label: 'Pending Payments',
    value: '3',
    icon: AlertCircle,
    change: '-2 vs last month',
    changeType: 'negative',
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm">{stat.label}</h3>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500">No recent activities to display</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Payments</h2>
          <div className="space-y-4">
            {/* Payment items would go here */}
            <p className="text-gray-500">No upcoming payments to display</p>
          </div>
        </div>
      </div>
    </div>
  );
}