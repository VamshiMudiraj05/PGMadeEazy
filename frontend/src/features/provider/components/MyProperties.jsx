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
  Phone,
  BedDouble,
  ShieldAlert,
  Sparkles
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
      setError('Failed to load host PG catalog');
      toast.error('Failed to load host PG catalog');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return {
          bg: 'bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000]/40',
          icon: Clock,
          label: 'Awaiting Audit'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40',
          icon: CheckCircle2,
          label: 'Live & Boarding'
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-500/15 text-red-400 border border-red-500/40',
          icon: XCircle,
          label: 'Changes Required'
        };
      default:
        return {
          bg: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
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
        toast.error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} must be a valid number`);
        return false;
      }
    }
    
    if (editForm.ownerPhone && !/^[0-9]{10}$/.test(editForm.ownerPhone)) {
      toast.error('Warden phone number must be 10 digits');
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
      toast.success('PG listing updated successfully');
      loadProperties();
      setEditingProperty(null);
      setEditForm({});
    } catch {
      toast.error('Failed to update PG listing');
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
    if (window.confirm('Are you sure you want to delete this student PG listing from the departure board?')) {
      try {
        await propertyApi.deleteProperty(propertyId);
        toast.success('PG listing removed from platform');
        loadProperties();
      } catch {
        toast.error('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0a0a0c] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffb000]">
          SYNCING HOST PG MANIFEST...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Departure Terminal Header */}
        <div className="board p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/provider-dashboard')}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffb000] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
                    TERMINAL 02 // HOST ASSETS
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  Student PG & Hostel Inventory
                </h1>
              </div>
            </div>

            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="btn-solari-amber inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>List New Student PG</span>
            </button>
          </div>
        </div>

        {error ? (
          <div className="board p-8 text-center max-w-md mx-auto space-y-4">
            <AlertCircle className="w-8 h-8 text-[#ffb000] mx-auto" />
            <p className="text-xs font-mono font-semibold text-neutral-300">{error}</p>
            <button
              onClick={loadProperties}
              className="btn-solari-amber cursor-pointer"
            >
              Retry Sync
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="board p-12 text-center max-w-md mx-auto space-y-4">
            <Building2 className="w-8 h-8 text-neutral-500 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-['Big_Shoulders_Display'] uppercase">
                Zero Accommodations Listed
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                You haven't listed any student hostel or sharing PG under your warden profile yet.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="btn-solari-amber w-full cursor-pointer"
            >
              + List First Student PG
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
                  className="board flex flex-col justify-between overflow-hidden hover:border-[#ffb000]/60 transition-all duration-200"
                >
                  {/* Photo & Status Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-neutral-800">
                    <img
                      src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    
                    {/* Status Pill */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded ${statusInfo.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>

                    {/* Rent Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-black/90 text-[#ffb000] border border-[#ffb000]/40">
                        ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-neutral-400 font-normal">/bed/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Form Fields */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    {isEditing ? (
                      <div className="space-y-3.5 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                            Hostel / PG Title
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
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
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Campus Hub</label>
                            <input
                              type="text"
                              name="area"
                              value={editForm.area}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Bed Tariff (₹)</label>
                            <input
                              type="number"
                              name="rent"
                              value={editForm.rent}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Bed Units</label>
                            <input
                              type="number"
                              name="rooms"
                              value={editForm.rooms}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
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
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Deposit (₹)</label>
                            <input
                              type="number"
                              name="deposit"
                              value={editForm.deposit}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Warden Phone</label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            value={editForm.ownerPhone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#ffb000]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-wide truncate">
                            {property.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                            <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                            <span className="truncate">{property.city}, {property.area}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2 border-y border-neutral-800 text-xs font-mono">
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Sharing Capacity</span>
                            <span className="font-semibold text-white flex items-center gap-1 mt-0.5">
                              <BedDouble className="w-3.5 h-3.5 text-[#ffb000]" />
                              <span>{property.rooms} Bed Units</span>
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Security Deposit</span>
                            <span className="font-semibold text-white block mt-0.5">₹{property.deposit?.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Amenities Chips */}
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {property.amenities.slice(0, 3).map((amenity, aIdx) => (
                              <span
                                key={aIdx}
                                className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[10px] font-mono font-medium uppercase"
                              >
                                {amenity}
                              </span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="px-2 py-0.5 rounded bg-neutral-900 text-[#ffb000] border border-neutral-800 text-[10px] font-mono">
                                +{property.amenities.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Host Contact Box */}
                        <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 text-xs font-mono space-y-0.5">
                          <div className="font-semibold text-white truncate text-[11px] uppercase">
                            Warden: {property.ownerName}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                            <Phone className="w-3 h-3 text-[#ffb000] shrink-0" />
                            <span>{property.ownerPhone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(property.id)}
                            className="btn-solari-amber flex-1 py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="py-2 px-3 rounded bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-mono transition-all cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(property)}
                            className="btn-solari flex-1 py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Listing</span>
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer"
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