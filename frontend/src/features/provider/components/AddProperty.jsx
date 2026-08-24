import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  Building, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

const validationSchema = {
  basicInfo: {
    name: { required: true, minLength: 3 },
    buildingType: { required: true },
    category: { required: true },
    ownerName: { required: true },
    ownerPhone: { required: true },
  },
  location: {
    address: { required: true },
    city: { required: true },
    area: { required: true },
    pincode: { required: true },
  },
  propertyDetails: {
    area: { required: true },
    rooms: { required: true },
  },
  pricing: {
    rent: { required: true },
    deposit: { required: true },
  },
};

const AMENITIES_OPTIONS = [
  'Wi-Fi',
  'AC',
  'TV',
  'Refrigerator',
  'Washing Machine',
  'Parking',
  'Security',
  'Power Backup',
  'Water Supply 24/7',
  'Lift',
  'CCTV',
  'Gym',
  'Swimming Pool',
  'Garden',
  'Housekeeping'
];

const RULES_OPTIONS = [
  'No Smoking',
  'No Pets',
  'No Parties',
  'No Guests Overnight',
  'Vegetarians Only',
  'No Alcohol',
  'No Loud Music',
  'Gate Closing Time',
  'ID Proof Mandatory',
  'Background Verification'
];

export default function AddProperty() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    basicInfo: {
      name: '',
      buildingType: '',
      category: '',
      ownerName: user?.name || '',
      ownerPhone: '',
      ownerEmail: user?.email || '',
    },
    location: {
      city: '',
      area: '',
      address: '',
      pincode: '',
    },
    propertyDetails: {
      rooms: '',
      area: '',
    },
    pricing: {
      rent: '',
      deposit: '',
    },
    amenities: [],
    rules: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (section, field, value) => {
    const rules = validationSchema[section]?.[field];
    if (!rules) return {};

    const fieldErrors = {};
    if (rules.required && !value) {
      fieldErrors[field] = 'This field is required';
    }
    if (rules.minLength && value.length < rules.minLength) {
      fieldErrors[field] = `Minimum length is ${rules.minLength} characters`;
    }
    return fieldErrors;
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const fieldErrors = validateField(section, field, value);
    
    setErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...fieldErrors
      }
    }));

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => f.name).join(', ');
      setErrors({
        global: `Files exceeding 5MB limit: ${fileNames}. Please optimize photos.`
      });
      return;
    }
    
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setErrors({
        global: `Only image files (.jpg, .png, .webp) are accepted.`
      });
      return;
    }
    
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleRuleToggle = (rule) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.includes(rule)
        ? prev.rules.filter(r => r !== rule)
        : [...prev.rules, rule]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validationErrors = {};
      Object.entries(validationSchema).forEach(([section, fields]) => {
        Object.entries(fields).forEach(([field, rules]) => {
          const value = formData[section][field];
          if (rules.required && (!value || String(value).trim() === '')) {
            validationErrors[section] = {
              ...validationErrors[section],
              [field]: 'Required'
            };
          }
        });
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      const submitData = new FormData();
      
      const propertyData = {
        name: formData.basicInfo.name,
        buildingType: formData.basicInfo.buildingType,
        category: formData.basicInfo.category,
        ownerName: formData.basicInfo.ownerName,
        ownerPhone: formData.basicInfo.ownerPhone,
        ownerEmail: formData.basicInfo.ownerEmail,
        city: formData.location.city,
        area: formData.location.area,
        address: formData.location.address,
        pincode: formData.location.pincode,
        rooms: parseInt(formData.propertyDetails.rooms),
        areaInSqft: parseFloat(formData.propertyDetails.area),
        rent: parseFloat(formData.pricing.rent),
        deposit: parseFloat(formData.pricing.deposit),
        amenities: formData.amenities,
        rules: formData.rules,
      };

      submitData.append('property', JSON.stringify(propertyData));

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          submitData.append('images', file);
        });
      }

      await propertyApi.createProperty(submitData);
      toast.success('Property submitted for admin approval!');
      navigate('/provider-dashboard/my-properties');
    } catch (error) {
      console.error('Error creating property:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to submit property.';
      setErrors({ global: errMsg });
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                List New Accommodation
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">Submit your verified PG residence or co-living property for compliance audit.</p>
            </div>
          </div>
        </div>

        {errors.global && (
          <div className="p-4 rounded-xl bg-red-600/15 border border-red-600/30 text-xs text-red-400 flex items-center gap-2 font-semibold shadow-lg">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E50914]" />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <Building className="w-3.5 h-3.5" />
                <span>1. PROPERTY IDENTIFICATION</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Listing Title / Accommodation Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.name}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'name')}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  placeholder="e.g. Skyline Luxury Executive PG"
                />
                {errors.basicInfo?.name && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.basicInfo.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Structure Category *
                </label>
                <select
                  value={formData.basicInfo.buildingType || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'buildingType')}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#141414]">Select structure type</option>
                  <option value="Independent House" className="bg-[#141414]">Independent House</option>
                  <option value="Apartment / Flat" className="bg-[#141414]">Apartment / Flat</option>
                  <option value="Dedicated PG Building" className="bg-[#141414]">Dedicated PG Building</option>
                  <option value="Hostel Complex" className="bg-[#141414]">Hostel Complex</option>
                </select>
                {errors.basicInfo?.buildingType && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.basicInfo.buildingType}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Resident Target Category *
                </label>
                <select
                  value={formData.basicInfo.category || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'category')}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#141414]">Select resident category</option>
                  <option value="Men / Boys Only" className="bg-[#141414]">Men / Boys Only</option>
                  <option value="Women / Girls Only" className="bg-[#141414]">Women / Girls Only</option>
                  <option value="Co-Living (Unisex)" className="bg-[#141414]">Co-Living (Unisex)</option>
                  <option value="Working Professionals Only" className="bg-[#141414]">Working Professionals Only</option>
                </select>
                {errors.basicInfo?.category && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.basicInfo.category}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Host Legal Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.ownerName}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerName')}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Host Contact Line *
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.ownerPhone}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerPhone')}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.basicInfo?.ownerPhone && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.basicInfo.ownerPhone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Host Email Record
                </label>
                <input
                  type="email"
                  value={formData.basicInfo.ownerEmail}
                  readOnly
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-xs text-neutral-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>2. GEOGRAPHICAL LOCATION</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">City / Metropolitan *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange(e, 'location', 'city')}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.location?.city && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.location.city}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">District / Locality *</label>
                <input
                  type="text"
                  value={formData.location.area}
                  onChange={(e) => handleInputChange(e, 'location', 'area')}
                  placeholder="e.g. Madhapur, Hitec City"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.location?.area && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.location.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Postal Code *</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) => handleInputChange(e, 'location', 'pincode')}
                  placeholder="500081"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.location?.pincode && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.location.pincode}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Complete Street Address *</label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleInputChange(e, 'location', 'address')}
                  placeholder="Street name, plot number, landmark, nearby metro station"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.location?.address && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.location.address}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Capacity & Pricing */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5" />
                <span>3. INVENTORY & RENTAL TARIFF</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Total Room Units *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.rooms}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'rooms')}
                  placeholder="e.g. 8"
                  min="1"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.propertyDetails?.rooms && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.propertyDetails.rooms}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Floor Area (Sq. Ft.) *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.area}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'area')}
                  placeholder="e.g. 2400"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.propertyDetails?.area && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.propertyDetails.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Monthly Rent (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.rent}
                  onChange={(e) => handleInputChange(e, 'pricing', 'rent')}
                  placeholder="e.g. 8500"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.pricing?.rent && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.pricing.rent}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">Security Deposit (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.deposit}
                  onChange={(e) => handleInputChange(e, 'pricing', 'deposit')}
                  placeholder="e.g. 15000"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                />
                {errors.pricing?.deposit && <p className="text-[11px] text-red-400 mt-0.5 font-semibold">{errors.pricing.deposit}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Photo Dropzone */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>4. PHOTOGRAPHY GALLERY</span>
              </h2>
              <span className="text-xs text-neutral-400 font-medium">{previewImages.length} photo(s) selected</span>
            </div>

            {/* Dropzone Container */}
            <div className="relative border border-dashed border-white/15 hover:border-[#E50914] rounded-xl p-8 text-center bg-black/60 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="imageUpload"
              />
              <UploadCloud className="w-8 h-8 text-[#E50914] mx-auto mb-2 pointer-events-none" />
              <p className="text-xs font-bold text-white pointer-events-none uppercase tracking-wider">
                Select high resolution photography
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 pointer-events-none">
                JPG, PNG, or WEBP up to 5MB each. Clear accommodation photos increase reservation velocity by 300%.
              </p>
            </div>

            {/* Thumbnail Preview Grid */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group bg-black">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/80 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Inclusions & Amenities */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>5. VERIFIED AMENITIES</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {AMENITIES_OPTIONS.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E50914] text-white shadow-md'
                        : 'bg-black/60 border border-white/10 text-neutral-400 hover:text-white hover:border-[#E50914]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: House Rules */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>6. RESIDENT CODE & RULES</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {RULES_OPTIONS.map((rule) => {
                const isSelected = formData.rules.includes(rule);
                return (
                  <button
                    key={rule}
                    type="button"
                    onClick={() => handleRuleToggle(rule)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E50914] text-white shadow-md'
                        : 'bg-black/60 border border-white/10 text-neutral-400 hover:text-white hover:border-[#E50914]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{rule}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Submitting Property...' : 'Publish Listing'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


