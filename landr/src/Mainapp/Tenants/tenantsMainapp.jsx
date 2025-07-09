import React, { useState, useEffect } from 'react';
import logo from '../../assets/Landr.png'
import { MapPin, User, CheckCircle, Search, Star, Heart } from 'lucide-react';

const TenantsMainapp = () => {
  // State for properties data
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
 
  
  // State for filters
  const [activeCategory, setActiveCategory] = useState('homes');
  const [sortBy, setSortBy] = useState('recency');
  
  // Mock data with enhanced properties
  const mockProperties = [
    {
      id: 1,
      type: 'Modern Bungalow',
      price: 2000,
      priceUnit: 'year',
      location: 'Philip Adesanya Crescent, Lagos',
      landlordName: 'Mr Dimeji Obioma',
      landlordAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      documentationStatus: 'Verified',
      rating: 4.8,
      reviewCount: 24,
      bedrooms: 3,
      bathrooms: 2,
      images: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      category: 'homes',
      sponsored: true,
      availableFrom: '2025-08-01'
    },
    {
      id: 2,
      type: 'Luxury Apartment',
      price: 1800,
      priceUnit: 'year',
      location: 'Victoria Island, Lagos',
      landlordName: 'Mrs Adunni Okafor',
      landlordAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b86fb13c?w=100&h=100&fit=crop&crop=face',
      documentationStatus: 'Verified',
      rating: 4.9,
      reviewCount: 18,
      bedrooms: 2,
      bathrooms: 2,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      category: 'homes',
      sponsored: false,
      availableFrom: '2025-07-15'
    },
    {
      id: 3,
      type: 'Executive Duplex',
      price: 3500,
      priceUnit: 'year',
      location: 'Lekki Phase 1, Lagos',
      landlordName: 'Mr Tunde Adebayo',
      landlordAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      documentationStatus: 'Verified',
      rating: 4.7,
      reviewCount: 31,
      bedrooms: 4,
      bathrooms: 3,
      images: [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      category: 'homes',
      sponsored: false,
      availableFrom: '2025-09-01'
    },
    {
      id: 4,
      type: 'Cozy Studio',
      price: 1200,
      priceUnit: 'year',
      location: 'Ikeja GRA, Lagos',
      landlordName: 'Mrs Kemi Adeleke',
      landlordAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      documentationStatus: 'Verified',
      rating: 4.6,
      reviewCount: 15,
      bedrooms: 1,
      bathrooms: 1,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      category: 'homes',
      sponsored: false,
      availableFrom: '2025-08-15'
    }
  ];

  // Categories configuration
  const categories = [
    { id: 'homes', label: 'Homes', active: true },
    { id: 'properties', label: 'Properties', active: false },
    { id: 'lands', label: 'Lands', active: false },
    { id: 'shops', label: 'Shops', active: false },
    { id: 'flats', label: 'Flats', active: false }
  ];

  // Sort options
  const sortOptions = [
    { value: 'recency', label: 'Recency' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'price', label: 'Price' }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProperties(mockProperties);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [activeCategory, sortBy]);

  // Handler functions
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const handleContactLandlord = async (propertyId) => {
    try {
      console.log(`Contacting landlord for property ${propertyId}`);
    } catch (err) {
      console.error('Failed to contact landlord:', err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleLike = (propertyId) => {
    setLikedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  // Filter properties based on search query
  const filteredProperties = properties.filter(property =>
    property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.landlordName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        {/* Navbar */}
        <nav className='flex justify-between items-center bg-white px-8 py-4 shadow-sm border-b'>
          <div className="h-10 w-20 bg-gray-300 rounded animate-pulse"></div>
          <div className='flex items-center gap-4'>
            <div className="h-6 w-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-64 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </nav>
        
        <div className="p-8 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="flex space-x-4 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-300 rounded-full w-20"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-gray-300 rounded-xl"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#02D482] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className='flex justify-between items-center bg-white px-8 py-4 shadow-sm border-b sticky top-0 z-50'>
        <div className="flex items-center">
         <img src={logo} className='w-20' alt="Logo" />
        </div>
        <div className='flex items-center gap-6'>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              placeholder='Search properties, locations, or landlords'
              value={searchQuery}
              onChange={handleSearch}
              className='bg-gray-50 border border-gray-200 rounded-full pl-12 pr-6 py-3 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-[#02D482] focus:border-transparent'
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-medium">CJ</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Find your perfect home</h1>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#02D482] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium text-gray-900">
            {filteredProperties.length} properties available
          </h2>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    sortBy === option.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden mb-3">
                <img
                  src={property.images[0]}
                  alt={`${property.type} in ${property.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
               
                {/* Sponsored Badge */}
                {property.sponsored && (
                  <div className="absolute top-3 left-3 bg-[#02D482] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Sponsored
                  </div>
                )}

                {/* Verification Badge */}
                {property.documentationStatus === 'Verified' && (
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#02D482]" />
                    <span className="text-xs text-gray-700">Verified</span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="space-y-2">
                {/* Location and Rating */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{property.location}</span>
                  </div>
                 
                </div>

                {/* Property Type */}
                <h3  className="font-medium font-Poppins text-gray-900 group-hover:text-[#02D482] transition-colors">
                  {property.type}
                </h3>

                {/* Landlord Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <img 
                    src={property.landlordAvatar} 
                    alt={property.landlordName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Hosted by {property.landlordName}</span>
                </div>

                {/* Property Features */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span>{property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${property.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">/{property.priceUnit}</span>
                  </div>
                   <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactLandlord(property.id);
                    }}
                    className="border-[#02D482] border-1 text-[#02D482] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#02D482] hover:text-amber-50 transition-colors"
                  >
                    More info
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactLandlord(property.id);
                    }}
                    className="bg-[#02D482] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-2">No properties found</div>
            <div className="text-gray-400">Try adjusting your search criteria</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="bg-[#02D482] text-white text-center py-4 rounded-lg">
            <div className="text-sm font-medium animate-pulse">
              🏠 Special offers available on selected properties - Limited time only!
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TenantsMainapp;