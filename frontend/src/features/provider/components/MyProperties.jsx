import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Edit3, 
  Trash2, 
  Plus, 
  ArrowLeft, 
  MapPin, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  X,
  Phone
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
          bg: 'bg-amber-500 text-black shadow-md',
          icon: Clock,
          label: 'Awaiting Audit'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500 text-black shadow-md',
          icon: CheckCircle2,
          label: 'Live & Approved'
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-600 text-white shadow-md',
          icon: XCircle,
          label: 'Changes Required'
        };
      default:
        return {
          bg: 'bg-white/10 text-neutral-400',
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
    setTimeout(() => {
      const el = document.getElementById(`property-card-${property.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
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
    } catch {
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
      } catch {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading property catalog...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">INVENTORY MANAGEMENT</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Host Property Catalog
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider-dashboard/add-property')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#E50914] hover:bg-[#b80710] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>List New Property</span>
          </button>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={loadProperties}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <Building2 className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Properties in Catalog</h2>
              <p className="text-xs text-neutral-400">You haven't listed any accommodations under your host profile yet.</p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="w-full py-3 px-4 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              + List Your First Accommodation
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
                  id={`property-card-${property.id}`}
                  className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-red-600/10"
                >
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                    
                    {/* Status Pill */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Rent Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-neutral-400 font-normal">/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Form Fields */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    {isEditing ? (
                      <div className="space-y-3.5 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Accommodation Title</label>
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">City</label>
                            <input
                              type="text"
                              name="city"
                              value={editForm.city}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Area</label>
                            <input
                              type="text"
                              name="area"
                              value={editForm.area}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Rent (₹)</label>
                            <input
                              type="number"
                              name="rent"
                              value={editForm.rent}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Rooms</label>
                            <input
                              type="number"
                              name="rooms"
                              value={editForm.rooms}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Structure</label>
                            <input
                              type="text"
                              name="buildingType"
                              value={editForm.buildingType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Deposit (₹)</label>
                            <input
                              type="number"
                              name="deposit"
                              value={editForm.deposit}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Host Phone</label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            value={editForm.ownerPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white truncate">
                            {property.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                            <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                            <span className="truncate">{property.city}, {property.area}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2 border-y border-white/10 text-xs text-white">
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Inventory</span>
                            <span className="font-semibold">{property.rooms} Units</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Security Deposit</span>
                            <span className="font-semibold">₹{property.deposit?.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Amenities Chips */}
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {property.amenities.slice(0, 3).map((amenity, aIdx) => (
                              <span
                                key={aIdx}
                                className="px-2.5 py-0.5 rounded-md bg-[#141414] text-neutral-300 border border-white/10 text-[10px] font-semibold uppercase tracking-wider"
                              >
                                {amenity}
                              </span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="px-2.5 py-0.5 rounded-md bg-[#141414] text-neutral-400 text-[10px] font-semibold">
                                +{property.amenities.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Host Contact Box */}
                        <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-0.5">
                          <div className="font-semibold text-white truncate text-[11px]">{property.ownerName}</div>
                          <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                            <Phone className="w-3 h-3 text-[#E50914] shrink-0" />
                            <span>{property.ownerPhone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(property.id)}
                            className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="py-2.5 px-3 rounded-lg bg-[#141414] text-neutral-400 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(property)}
                            className="flex-1 py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#E50914] hover:bg-[#E50914] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="p-2.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-600/10 transition-all cursor-pointer"
                            title="Delete listing"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
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