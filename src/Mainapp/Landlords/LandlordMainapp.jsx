import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Home, BarChart3, Users, Settings, Bell, LogOut } from 'lucide-react';
import logo from '../../assets/Landr.png';

// Import components
import DashboardStats from './components/DashboardStats';
import PropertyFilters from './components/PropertyFilters';
import PropertyCard from './components/PropertyCard';
import AddPropertyModal from './components/AddPropertyModal';
import PropertyDetailsModal from './components/PropertyDetailsModal';

// Mock data for demonstration
const mockProperties = [
  {
    id: 1,
    title: 'Modern 2BR Apartment',
    type: 'apartment',
    location: 'Victoria Island, Lagos',
    address: '123 Tiamiyu Savage Street',
    bedrooms: 2,
    bathrooms: 2,
    area: '95 sqm',
    price: 1800,
    priceUnit: 'month',
    status: 'occupied',
    monthlyRevenue: 1800,
    occupancyRate: 100,
    currentTenant: 'John Doe',
    leaseStart: '2024-01-01',
    leaseEnd: '2024-12-31',
    furnished: true,
    parking: true,
    petFriendly: false,
    description: 'Beautiful modern apartment with stunning city views.',
    amenities: ['Air Conditioning', 'Swimming Pool', 'Gym', 'Security'],
    utilities: { electricity: true, water: true, internet: true, gas: false },
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop' }
    ],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Executive Duplex',
    type: 'duplex',
    location: 'Lekki Phase 1, Lagos',
    address: '45 Admiralty Way',
    bedrooms: 4,
    bathrooms: 3,
    area: '200 sqm',
    price: 3500,
    priceUnit: 'month',
    status: 'vacant',
    monthlyRevenue: 0,
    occupancyRate: 0,
    furnished: false,
    parking: true,
    petFriendly: true,
    description: 'Spacious duplex in a gated estate with excellent security.',
    amenities: ['Generator', 'Security', 'Garden', 'Parking'],
    utilities: { electricity: false, water: true, internet: false, gas: true },
    images: [
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop' }
    ],
    availableFrom: '2024-08-01',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 3,
    title: 'Cozy Studio',
    type: 'studio',
    location: 'Ikeja GRA, Lagos',
    address: '78 Obafemi Awolowo Way',
    bedrooms: 1,
    bathrooms: 1,
    area: '45 sqm',
    price: 1200,
    priceUnit: 'month',
    status: 'maintenance',
    monthlyRevenue: 0,
    occupancyRate: 0,
    furnished: true,
    parking: false,
    petFriendly: false,
    description: 'Perfect for young professionals, fully furnished studio.',
    amenities: ['Air Conditioning', 'Security', 'Internet'],
    utilities: { electricity: true, water: true, internet: true, gas: false },
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' }
    ],
    createdAt: '2024-03-10T00:00:00Z'
  }
];

export default function LandlordMainapp() {
  const navigate = useNavigate();
  const [showKycModal, setShowKycModal] = useState(true);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showPropertyDetailsModal, setShowPropertyDetailsModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Property management state
  const [properties, setProperties] = useState(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Navigation state
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleCloseKycModal = () => {
    setShowKycModal(false);
  };

  const handleAddProperty = (newProperty) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setShowAddPropertyModal(true);
  };

  const handleDeleteProperty = (property) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== property.id));
    }
  };

  const handleViewPropertyDetails = (property) => {
    setSelectedProperty(property);
    setShowPropertyDetailsModal(true);
  };

  // Filter and sort properties
  const filteredAndSortedProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'revenue-high':
          return (b.monthlyRevenue || 0) - (a.monthlyRevenue || 0);
        default:
          return 0;
      }
    });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* KYC Modal */}
        {showKycModal && (
          <div className="fixed inset-0 bg-gray-600/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={handleCloseKycModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-left mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Complete your KYC</h2>
                <p className="text-[#02D482] font-Poppins">
                  To proceed & access your dashboard, you'd need to complete your KYC to verify your identity.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate("/LandlordsMainapp/kyc");
                  }}
                  className="bg-[#02D482] text-white py-3 rounded-full font-Poppins font-medium hover:bg-green-600 transition-colors"
                >
                  Proceed to KYC
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <img src={logo} alt="Landr Logo" className="w-20" />
          </div>
          
          <nav className="px-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#02D482] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'properties' && 'Properties'}
                  {activeTab === 'tenants' && 'Tenants'}
                  {activeTab === 'analytics' && 'Analytics'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
                <p className="text-gray-600">
                  {activeTab === 'dashboard' && 'Welcome back! Here\'s an overview of your properties.'}
                  {activeTab === 'properties' && 'Manage your property portfolio'}
                  {activeTab === 'tenants' && 'Manage your tenants and leases'}
                  {activeTab === 'analytics' && 'View detailed analytics and reports'}
                  {activeTab === 'settings' && 'Manage your account settings'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {activeTab === 'properties' && (
                  <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="flex items-center gap-2 bg-[#02D482] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Property
                  </button>
                )}
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Bell className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-8">
            {activeTab === 'dashboard' && (
              <div>
                <DashboardStats properties={properties} />
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[#02D482] rounded-lg flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Add Property</h3>
                    <p className="text-gray-600 text-sm">List a new property for rent</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('properties')}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">View Properties</h3>
                    <p className="text-gray-600 text-sm">Manage your property portfolio</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('tenants')}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manage Tenants</h3>
                    <p className="text-gray-600 text-sm">View and manage tenant information</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
                    <p className="text-gray-600 text-sm">Analyze your rental performance</p>
                  </button>
                </div>

                {/* Recent Properties */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Properties</h3>
                    <button
                      onClick={() => setActiveTab('properties')}
                      className="text-[#02D482] hover:text-green-600 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.slice(0, 3).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onEdit={handleEditProperty}
                        onDelete={handleDeleteProperty}
                        onViewDetails={handleViewPropertyDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <PropertyFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalProperties={filteredAndSortedProperties.length}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onEdit={handleEditProperty}
                      onDelete={handleDeleteProperty}
                      onViewDetails={handleViewPropertyDetails}
                    />
                  ))}
                </div>

                {filteredAndSortedProperties.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-gray-500 text-lg mb-2">No properties found</div>
                    <div className="text-gray-400 mb-4">Try adjusting your search criteria</div>
                    <button
                      onClick={() => setShowAddPropertyModal(true)}
                      className="bg-[#02D482] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add Your First Property
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tenants' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tenant Management</h3>
                <p className="text-gray-600">This feature is coming soon. You'll be able to manage all your tenants from here.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
                <p className="text-gray-600">Detailed analytics and reporting features are coming soon.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
                <p className="text-gray-600">Account settings and preferences will be available here.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <AddPropertyModal
        isOpen={showAddPropertyModal}
        onClose={() => {
          setShowAddPropertyModal(false);
          setSelectedProperty(null);
        }}
        onSubmit={handleAddProperty}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={showPropertyDetailsModal}
        onClose={() => {
          setShowPropertyDetailsModal(false);
          setSelectedProperty(null);
        }}
      />
    </>
  );
}