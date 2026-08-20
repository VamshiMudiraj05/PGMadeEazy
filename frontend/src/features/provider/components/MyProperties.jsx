import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Edit3, 
  Trash2, 
  Plus, 
  ArrowLeft, 
  MapPin, 
  Users, 
  DollarSign, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  X,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const ownerProperties = await propertyApi.getPropertiesByOwner(user?.email || user?.name);
      setProperties(ownerProperties || []);
    } catch (err) {
      setError('Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: Clock,
          label: 'Awaiting Admin Review'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2,
          label: 'Live & Approved'
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-500/10 text-red-400 border-red-500/20',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          bg: 'bg-zinc-800 text-zinc-400 border-zinc-700',
          icon: AlertCircle,
          label: status || 'Draft'
        };
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property.id);
    setEditForm({
      name: property.name,
      city: property.city,
      area: property.area,
      rent: property.rent,
      rooms: property.rooms,
      buildingType: property.buildingType,
      deposit: property.deposit,
      ownerName: property.ownerName,
      ownerPhone: property.ownerPhone,
      ownerEmail: property.ownerEmail,
      amenities: property.amenities || [],
      rules: property.rules || []
    });
  };

  const validateForm = () => {
    const requiredFields = ['name', 'city', 'area', 'rent', 'rooms', 'buildingType'];
    
    for (const field of requiredFields) {
      if (!editForm[field] || editForm[field].toString().trim() === '') {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    const numericFields = ['rent', 'rooms', 'deposit'];
    for (const field of numericFields) {
      if (editForm[field] && isNaN(Number(editForm[field]))) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} must be a number`);
        return false;
      }
    }
    
    if (editForm.ownerPhone && !/^[0-9]{10}$/.test(editForm.ownerPhone)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    
    return true;
  };

  const handleSave = async (propertyId) => {
    if (!validateForm()) return;
    
    try {
      const formData = new FormData();
      formData.append('property', JSON.stringify(editForm));
      
      await propertyApi.updateProperty(propertyId, formData);
      toast.success('Property updated successfully');
      loadProperties();
      setEditingProperty(null);
      setEditForm({});
    } catch (error) {
      toast.error('Failed to update property');
    }
  };

  const handleCancel = () => {
    setEditingProperty(null);
    setEditForm({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setEditForm(prev => {
        const currentArray = prev[name] || [];
        return {
          ...prev,
          [name]: checked 
            ? [...currentArray, value]
            : currentArray.filter(item => item !== value)
        };
      });
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      try {
        await propertyApi.deleteProperty(propertyId);
        toast.success('Property deleted successfully');
        loadProperties();
      } catch (err) {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading your listed properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                My Property Catalog
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Manage live listings, edit details, and monitor approval status</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider-dashboard/add-property')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>List New Property</span>
          </button>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={loadProperties}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <Building2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">No Properties in Catalog</h2>
            <p className="text-xs text-zinc-400 mb-6">You haven't listed any accommodations under your host profile yet.</p>
            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
            >
              + List Your First PG Stay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, pIdx) => {
              const isEditing = editingProperty === property.id;
              const statusInfo = getStatusBadge(property.status || property.approvalStatus);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={property.id || pIdx}
                  className="rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5 glow-orange-sm"
                >
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                      src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    {/* Status Pill */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Rent Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-zinc-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-zinc-400 font-normal">/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Form Fields */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    {isEditing ? (
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400">Property Title</label>
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">City</label>
                            <input
                              type="text"
                              name="city"
                              value={editForm.city}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">Area</label>
                            <input
                              type="text"
                              name="area"
                              value={editForm.area}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">Rent (₹)</label>
                            <input
                              type="number"
                              name="rent"
                              value={editForm.rent}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">Rooms</label>
                            <input
                              type="number"
                              name="rooms"
                              value={editForm.rooms}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">Building Type</label>
                            <input
                              type="text"
                              name="buildingType"
                              value={editForm.buildingType}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-400">Deposit (₹)</label>
                            <input
                              type="number"
                              name="deposit"
                              value={editForm.deposit}
                              onChange={handleInputChange}
                              className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-400">Host Phone</label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            value={editForm.ownerPhone}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-base font-bold text-white truncate mb-1">
                          {property.name}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-zinc-800/80 text-xs text-zinc-300">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Total Rooms</span>
                            <span className="font-semibold">{property.rooms} Rooms</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Deposit</span>
                            <span className="font-semibold">₹{property.deposit?.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Amenities Chips */}
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                              {property.amenities.slice(0, 3).map((amenity, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="px-2 py-0.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-semibold"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {property.amenities.length > 3 && (
                                <span className="px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-400 text-[10px]">
                                  +{property.amenities.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Host Contact Box */}
                        <div className="mt-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                          <div className="font-semibold text-white truncate">{property.ownerName}</div>
                          <div className="flex items-center gap-1.5 text-zinc-400 mt-1">
                            <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                            <span>{property.ownerPhone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(property.id)}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Changes</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="py-2 px-3 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-semibold transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(property)}
                            className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-orange-500/40 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                            <span>Edit Listing</span>
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyProperties;