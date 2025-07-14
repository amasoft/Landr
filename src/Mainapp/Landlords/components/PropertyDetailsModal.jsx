import React from 'react';
import { X, MapPin, Bed, Bath, Ruler, DollarSign, Calendar, Users, Wrench, CheckCircle } from 'lucide-react';

const PropertyDetailsModal = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

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
      case 'occupied': return <Users className="w-4 h-4" />;
      case 'vacant': return <Calendar className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(property.status)}`}>
              {getStatusIcon(property.status)}
              {property.status}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Property Images */}
          {property.images && property.images.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Property Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.images.slice(0, 6).map((image, index) => (
                  <div key={index} className="h-48 rounded-lg overflow-hidden">
                    <img
                      src={typeof image === 'string' ? image : image.url || URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Address: {property.address || property.location}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Pricing & Revenue</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      Rent: ${property.price?.toLocaleString()}/{property.priceUnit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">
                      Monthly Revenue: ${property.monthlyRevenue?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">
                      Occupancy Rate: {property.occupancyRate || 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.furnished && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Furnished</span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Parking</span>
                    </div>
                  )}
                  {property.petFriendly && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Pet Friendly</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description || 'No description available.'}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Utilities */}
              {property.utilities && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Utilities Included</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(property.utilities).map(([utility, included]) => (
                      included && (
                        <div key={utility} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700 capitalize">{utility}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Tenant Information */}
              {property.status === 'occupied' && property.currentTenant && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Current Tenant</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {property.currentTenant}
                    </p>
                    {property.leaseStart && (
                      <p className="text-gray-700">
                        <strong>Lease Start:</strong> {new Date(property.leaseStart).toLocaleDateString()}
                      </p>
                    )}
                    {property.leaseEnd && (
                      <p className="text-gray-700">
                        <strong>Lease End:</strong> {new Date(property.leaseEnd).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Availability */}
              {property.status === 'vacant' && property.availableFrom && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Availability</h3>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Available From:</strong> {new Date(property.availableFrom).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-3 bg-[#02D482] text-white rounded-lg hover:bg-green-600 transition-colors">
            Edit Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;