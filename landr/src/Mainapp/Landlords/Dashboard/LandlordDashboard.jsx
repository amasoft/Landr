import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PropertyDetailView from './PropertyDetailView';
import EditPropertyForm from './EditPropertyForm';
import AddPropertyForm from './AddPropertyForm';
import { mockProperties } from './mockProperties';

const LandlordDashboard = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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
    setProperties((prev) =>
      prev.map((prop) => (prop.id === updatedProperty.id ? updatedProperty : prop))
    );
    setSelectedProperty(updatedProperty);
    setIsEditing(false);
  };

  const handleAddProperty = (newProperty) => {
    const newId = properties.length > 0 ? Math.max(...properties.map((p) => p.id)) + 1 : 1;
    const propertyWithId = { ...newProperty, id: newId };
    setProperties((prev) => [...prev, propertyWithId]);
    setSelectedProperty(propertyWithId);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setSelectedProperty(null);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Landlord Dashboard</h1>
        <button
          onClick={handleStartAdd}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSelectProperty(property)}
          >
            <img
              src={property.images[0]?.url}
              alt={property.images[0]?.description || 'Property image'}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{property.type}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-600 font-semibold">${property.price}/{property.priceUnit}</p>
            <p className="text-gray-600">{property.bedrooms} bd | {property.bathrooms} ba</p>
          </div>
        ))}
      </div>

      {selectedProperty && !isEditing && !isAdding && (
        <PropertyDetailView
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
  );
};

export default LandlordDashboard;
