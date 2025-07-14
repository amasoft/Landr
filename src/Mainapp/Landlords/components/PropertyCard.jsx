import React from 'react';
import { MapPin, Bed, Bath, Ruler, DollarSign, Users, Wrench, Eye, Edit, Trash2 } from 'lucide-react';

const PropertyCard = ({ property, onEdit, onDelete, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-green-100 text-green-800';
      case 'vacant': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied': return <Users className="w-3 h-3" />;
      case 'vacant': return <DollarSign className="w-3 h-3" />;
      case 'maintenance': return <Wrench className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={property.images?.[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(property.status)}`}>
          {getStatusIcon(property.status)}
          {property.status}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{property.title}</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewDetails(property)}
              className="p-1 text-gray-500 hover:text-[#02D482] transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(property)}
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(property)}
              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm truncate">{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            <span>{property.area}</span>
          </div>
        </div>

        {/* Price and Revenue */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              ${property.price?.toLocaleString()}/{property.priceUnit}
            </div>
            <div className="text-sm text-gray-500">
              Monthly Revenue: ${property.monthlyRevenue?.toLocaleString() || 0}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Occupancy</div>
            <div className="text-sm font-medium text-gray-900">
              {property.occupancyRate || 0}%
            </div>
          </div>
        </div>

        {/* Tenant Info */}
        {property.status === 'occupied' && property.currentTenant && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Current Tenant: <span className="font-medium">{property.currentTenant}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;