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
  AlertCircle,
  Plus,
  Home,
  Info
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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                List New Accommodation
              </h1>
              <p className="text-xs text-[#7A7A85] mt-0.5">Submit your verified PG residence or co-living property for compliance audit.</p>
            </div>
          </div>
        </div>

        {errors.global && (
          <div className="p-4 rounded-sm bg-[#121217] border border-red-500/30 text-xs text-red-400 flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <Building className="w-3.5 h-3.5" />
                <span>1. Property Identification</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Listing Title / Accommodation Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.name}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'name')}
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                  placeholder="e.g. Skyline Luxury Executive PG"
                />
                {errors.basicInfo?.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.basicInfo.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Structure Category *
                </label>
                <select
                  value={formData.basicInfo.buildingType || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'buildingType')}
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
                >
                  <option value="">Select structure type</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Dedicated PG Building">Dedicated PG Building</option>
                  <option value="Hostel Complex">Hostel Complex</option>
                </select>
                {errors.basicInfo?.buildingType && <p className="text-[11px] text-red-400 mt-0.5">{errors.basicInfo.buildingType}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Resident Target Category *
                </label>
                <select
                  value={formData.basicInfo.category || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'category')}
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors cursor-pointer"
                >
                  <option value="">Select resident category</option>
                  <option value="Men / Boys Only">Men / Boys Only</option>
                  <option value="Women / Girls Only">Women / Girls Only</option>
                  <option value="Co-Living (Unisex)">Co-Living (Unisex)</option>
                  <option value="Working Professionals Only">Working Professionals Only</option>
                </select>
                {errors.basicInfo?.category && <p className="text-[11px] text-red-400 mt-0.5">{errors.basicInfo.category}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Host Legal Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.ownerName}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerName')}
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Host Contact Line *
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.ownerPhone}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerPhone')}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.basicInfo?.ownerPhone && <p className="text-[11px] text-red-400 mt-0.5">{errors.basicInfo.ownerPhone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Host Email Record
                </label>
                <input
                  type="email"
                  value={formData.basicInfo.ownerEmail}
                  readOnly
                  className="w-full px-3 py-2 bg-[#0B0B0E]/50 border border-[#1E1E26] rounded-sm text-xs text-[#7A7A85] cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>2. Geographical Location</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">City / Metropolitan *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange(e, 'location', 'city')}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.location?.city && <p className="text-[11px] text-red-400 mt-0.5">{errors.location.city}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">District / Locality *</label>
                <input
                  type="text"
                  value={formData.location.area}
                  onChange={(e) => handleInputChange(e, 'location', 'area')}
                  placeholder="e.g. Madhapur, Hitec City"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.location?.area && <p className="text-[11px] text-red-400 mt-0.5">{errors.location.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Postal Code *</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) => handleInputChange(e, 'location', 'pincode')}
                  placeholder="500081"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.location?.pincode && <p className="text-[11px] text-red-400 mt-0.5">{errors.location.pincode}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Complete Street Address *</label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleInputChange(e, 'location', 'address')}
                  placeholder="Street name, plot number, landmark, nearby metro station"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.location?.address && <p className="text-[11px] text-red-400 mt-0.5">{errors.location.address}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Capacity & Pricing */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5" />
                <span>3. Inventory & Rental Tariff</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Total Room Units *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.rooms}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'rooms')}
                  placeholder="e.g. 8"
                  min="1"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.propertyDetails?.rooms && <p className="text-[11px] text-red-400 mt-0.5">{errors.propertyDetails.rooms}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Floor Area (Sq. Ft.) *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.area}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'area')}
                  placeholder="e.g. 2400"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.propertyDetails?.area && <p className="text-[11px] text-red-400 mt-0.5">{errors.propertyDetails.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Monthly Rent (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.rent}
                  onChange={(e) => handleInputChange(e, 'pricing', 'rent')}
                  placeholder="e.g. 8500"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.pricing?.rent && <p className="text-[11px] text-red-400 mt-0.5">{errors.pricing.rent}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">Security Deposit (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.deposit}
                  onChange={(e) => handleInputChange(e, 'pricing', 'deposit')}
                  placeholder="e.g. 15000"
                  className="w-full px-3 py-2 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs text-white focus:outline-none focus:border-[#FF5A36] transition-colors"
                />
                {errors.pricing?.deposit && <p className="text-[11px] text-red-400 mt-0.5">{errors.pricing.deposit}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Photo Dropzone */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>4. Photography Gallery</span>
              </h2>
              <span className="text-xs text-[#7A7A85]">{previewImages.length} photo(s) selected</span>
            </div>

            {/* Dropzone Container */}
            <div className="relative border border-dashed border-[#22222A] hover:border-[#FF5A36] rounded-sm p-8 text-center bg-[#0B0B0E] transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="imageUpload"
              />
              <UploadCloud className="w-8 h-8 text-[#FF5A36] mx-auto mb-2 pointer-events-none" />
              <p className="text-xs font-bold text-white pointer-events-none uppercase tracking-wider">
                Select high resolution photography
              </p>
              <p className="text-[11px] text-[#7A7A85] mt-1 pointer-events-none">
                JPG, PNG, or WEBP up to 5MB each. Clear accommodation photos increase reservation velocity by 300%.
              </p>
            </div>

            {/* Thumbnail Preview Grid */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#1E1E26] group bg-[#0B0B0E]">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 rounded-xs bg-black/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Inclusions & Amenities */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>5. Verified Amenities</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {AMENITIES_OPTIONS.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#FF5A36] text-white'
                        : 'bg-[#0B0B0E] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#383848]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: House Rules */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
            <div className="border-b border-[#1E1E26] pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#FF5A36] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>6. Resident Code & Rules</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {RULES_OPTIONS.map((rule) => {
                const isSelected = formData.rules.includes(rule);
                return (
                  <button
                    key={rule}
                    type="button"
                    onClick={() => handleRuleToggle(rule)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#FF5A36] text-white'
                        : 'bg-[#0B0B0E] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#383848]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
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
              className="px-5 py-2.5 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Submitting Property...' : 'Publish Listing'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

