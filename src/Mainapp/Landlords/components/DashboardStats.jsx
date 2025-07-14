import React from 'react';
import { Home, DollarSign, Users, Wrench, TrendingUp, Calendar } from 'lucide-react';

const DashboardStats = ({ properties }) => {
  // Calculate statistics from properties
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status === 'occupied').length;
  const vacantProperties = properties.filter(p => p.status === 'vacant').length;
  const maintenanceProperties = properties.filter(p => p.status === 'maintenance').length;
  
  const totalRevenue = properties.reduce((sum, property) => {
    return sum + (property.monthlyRevenue || 0);
  }, 0);
  
  const averageOccupancy = totalProperties > 0 
    ? Math.round((occupiedProperties / totalProperties) * 100)
    : 0;

  const stats = [
    {
      title: 'Total Properties',
      value: totalProperties,
      icon: Home,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Occupied Units',
      value: occupiedProperties,
      icon: Users,
      color: 'bg-[#02D482]',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Vacant Units',
      value: vacantProperties,
      icon: Calendar,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Maintenance',
      value: maintenanceProperties,
      icon: Wrench,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Occupancy Rate',
      value: `${averageOccupancy}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;