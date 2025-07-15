import React, { useState } from 'react';
import { Plus, Edit, Eye, Home, MapPin, Bed, Bath, DollarSign, X } from 'lucide-react';
import EditPropertyForm from './EditPropertyForm';
import AddPropertyForm from './AddPropertyForm';
import { mockProperties } from './mockProperties';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusColors = {
    vacant: 'bg-green-100 text-green-800',
    occupied: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <span>
  {status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
</span>
  );
};

// Property Card Component
const PropertyCard = ({ property, onSelect, onEdit, onDelete }) => {

   const images = property.images || [];
  const mainImage = images[0] || { 
    url: '/placeholder-property.jpg', 
    description: 'Property image' 
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
             <img
          src={mainImage.url}
          alt={mainImage.description}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-property.jpg';
            e.target.alt = 'Property image';
          }}
        />
        <div className="absolute bg-[#02D482] text-white rounded-full px-4 py-2 top-2 right-2">
          <StatusBadge status={property.status} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{property.type}</h3>
          <p className="text-gray-900 font-medium flex items-center">
            <DollarSign size={16} className="mr-1" />
            {property.price}/{property.priceUnit}
          </p>
        </div>
        
        <p className="text-gray-600 flex items-center mb-2">
          <MapPin size={14} className="mr-1" />
          {property.location}
        </p>

    <div className="flex space-x-4 text-sm text-gray-600">
             <span className="flex items-center">
              <Bed size={14} className="mr-1" />
              {property.bedrooms}
            </span>
            <span className="flex items-center">
              <Bath size={14} className="mr-1" />
              {property.bathrooms}
            </span>
          </div>
       
        
        <div className="flex justify-between items-center mt-4">
      
          
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(property);
              }}
              className="px-3 bg-red-600 font-Poppins rounded text-white hover:bg-red-700 "
              aria-label="delete property"
            >
              Delete lease
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(property);
              }}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
              aria-label="Edit property"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(property);
              }}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full"
              aria-label="View details"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search and Filter Component
const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search properties..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <select 
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onFilter('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
        
        <select 
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onFilter('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
        </select>
      </div>
    </div>
  );
};

const DetailModal = ({ property, onClose, onEdit, onDelete }) => {
  if (!property) return null;
  
  // Safely handle images array
  const images = property.images || [];
  const mainImage = images[0] || { 
    url: '/placeholder-property.jpg', 
    description: 'Property image' 
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{property.type} Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img 
                src={mainImage.url} 
                alt={mainImage.description || 'Property image'} 
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-property.jpg';
                  e.target.alt = 'Property image';
                }}
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {images.slice(0, 3).map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img.url} 
                    alt={img.description || `Property image ${idx + 1}`} 
                    className="h-20 w-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/placeholder-property.jpg';
                      e.target.alt = `Property image ${idx + 1}`;
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{property.type}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {property.location}
                  </p>
                </div>
                <StatusBadge status={property.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    {property.price}/{property.priceUnit}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium flex items-center">
                    <Bed size={16} className="mr-1" />
                    {property.bedrooms}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium flex items-center">
                    <Bath size={16} className="mr-1" />
                    {property.bathrooms}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">{property.squareFootage || property.area || 'N/A'} sqft</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{property.description || 'No description provided.'}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities?.length > 0 ? (
                    property.amenities.map((amenity, idx) => (
                      <span key={idx} className="bg-blue-50 text-[#02D482] px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No amenities listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onEdit(property)}
              className="px-4 py-2 bg-[#02D482] text-white rounded-lg hover:bg-[#02D482] transition-colors"
            >
              Edit Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const LandlordDashboard = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = (term) => {
    if (!term) {
      setFilteredProperties(properties);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = properties.filter(property => 
      property.type.toLowerCase().includes(lowerTerm) || 
      property.location.toLowerCase().includes(lowerTerm) ||
      property.description?.toLowerCase().includes(lowerTerm)
    );
    
    setFilteredProperties(filtered);
  };

  const handleFilter = (field, value) => {
    if (!value) {
      setFilteredProperties(properties);
      return;
    }
    
    const filtered = properties.filter(property => property[field] === value);
    setFilteredProperties(filtered);
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleUpdateProperty = (updatedProperty) => {
    setProperties(prev => 
      prev.map(prop => prop.id === updatedProperty.id ? updatedProperty : prop)
    );
    setFilteredProperties(prev => 
      prev.map(prop => prop.id === updatedProperty.id ? updatedProperty : prop)
    );
    setSelectedProperty(updatedProperty);
    setIsEditing(false);
  };

  const handleAddProperty = (newProperty) => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    const propertyWithId = { ...newProperty, id: newId };
    setProperties(prev => [...prev, propertyWithId]);
    setFilteredProperties(prev => [...prev, propertyWithId]);
    setSelectedProperty(propertyWithId);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setSelectedProperty(null);
    setIsEditing(false);
  };

  const handleDelete = (propertyToDelete) => {
    setProperties(prev => prev.filter(prop => prop.id !== propertyToDelete.id))
    setFilteredProperties(prev => prev.filter(prop => prop.id !== propertyToDelete.id))
  }

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Properties</h1>
            <p className="text-gray-600">{filteredProperties.length} properties listed</p>
          </div>
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-2 bg-[#02D482] text-white px-4 py-2 rounded-lg hover:bg-[#72cf7a] transition-colors"
          >
            <Plus size={20} />
            Add Property
          </button>
        </div>

        <SearchAndFilter 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
        />

        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <Home size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or add a new property</p>
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={handleSelectProperty}
                onEdit={handleEditProperty}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {selectedProperty && !isEditing && !isAdding && (
          <DetailModal
            property={selectedProperty}
            onClose={handleCloseDetail}
            onEdit={handleEditProperty}
          />
        )}

        {isEditing && selectedProperty && (
          <EditPropertyForm
            property={selectedProperty}
            onClose={handleCloseDetail}
            onUpdate={handleUpdateProperty}
          />
        )}

        {isAdding && (
          <AddPropertyForm
            onClose={() => setIsAdding(false)}
            onAdd={handleAddProperty}
          />
        )}
      </div>
    </div>
  );
};

export default LandlordDashboard;