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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                List New Property
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Publish your PG accommodation or shared flat</p>
            </div>
          </div>
        </div>

        {errors.global && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-orange-400" />
              <span>1. Basic Property Identification</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Listing Title / Property Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.name}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'name')}
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Skyline Luxury Executive PG"
                />
                {errors.basicInfo?.name && <p className="text-[11px] text-red-400 mt-1">{errors.basicInfo.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Building Structure Type *
                </label>
                <select
                  value={formData.basicInfo.buildingType || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'buildingType')}
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select structure type</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Dedicated PG Building">Dedicated PG Building</option>
                  <option value="Hostel Complex">Hostel Complex</option>
                </select>
                {errors.basicInfo?.buildingType && <p className="text-[11px] text-red-400 mt-1">{errors.basicInfo.buildingType}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Resident Category *
                </label>
                <select
                  value={formData.basicInfo.category || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'category')}
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select resident category</option>
                  <option value="Men / Boys Only">Men / Boys Only</option>
                  <option value="Women / Girls Only">Women / Girls Only</option>
                  <option value="Co-Living (Unisex)">Co-Living (Unisex)</option>
                  <option value="Working Professionals Only">Working Professionals Only</option>
                </select>
                {errors.basicInfo?.category && <p className="text-[11px] text-red-400 mt-1">{errors.basicInfo.category}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Host / Manager Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.ownerName}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerName')}
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Host Contact Phone *
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.ownerPhone}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerPhone')}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.basicInfo?.ownerPhone && <p className="text-[11px] text-red-400 mt-1">{errors.basicInfo.ownerPhone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Host Registered Email
                </label>
                <input
                  type="email"
                  value={formData.basicInfo.ownerEmail}
                  readOnly
                  className="w-full px-3.5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>2. Property Location & Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">City *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange(e, 'location', 'city')}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.location?.city && <p className="text-[11px] text-red-400 mt-1">{errors.location.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Locality / Area *</label>
                <input
                  type="text"
                  value={formData.location.area}
                  onChange={(e) => handleInputChange(e, 'location', 'area')}
                  placeholder="e.g. Madhapur, Hitec City"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.location?.area && <p className="text-[11px] text-red-400 mt-1">{errors.location.area}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Pincode *</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) => handleInputChange(e, 'location', 'pincode')}
                  placeholder="500081"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.location?.pincode && <p className="text-[11px] text-red-400 mt-1">{errors.location.pincode}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Physical Address *</label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleInputChange(e, 'location', 'address')}
                  placeholder="Street name, plot number, landmark, nearby metro station"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.location?.address && <p className="text-[11px] text-red-400 mt-1">{errors.location.address}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Capacity & Pricing */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange-400" />
              <span>3. Capacity & Pricing Breakdown</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Total Rooms *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.rooms}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'rooms')}
                  placeholder="e.g. 8"
                  min="1"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.propertyDetails?.rooms && <p className="text-[11px] text-red-400 mt-1">{errors.propertyDetails.rooms}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Floor Area (Sq. Ft.) *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.area}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'area')}
                  placeholder="e.g. 2400"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.propertyDetails?.area && <p className="text-[11px] text-red-400 mt-1">{errors.propertyDetails.area}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Monthly Rent (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.rent}
                  onChange={(e) => handleInputChange(e, 'pricing', 'rent')}
                  placeholder="e.g. 8500"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.pricing?.rent && <p className="text-[11px] text-red-400 mt-1">{errors.pricing.rent}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Security Deposit (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.deposit}
                  onChange={(e) => handleInputChange(e, 'pricing', 'deposit')}
                  placeholder="e.g. 15000"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                />
                {errors.pricing?.deposit && <p className="text-[11px] text-red-400 mt-1">{errors.pricing.deposit}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Photo Dropzone */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-orange-400" />
                <span>4. Property Photos & Gallery</span>
              </h2>
              <span className="text-xs text-zinc-400">{previewImages.length} photo(s) selected</span>
            </div>

            {/* Dropzone Container */}
            <div className="relative border-2 border-dashed border-zinc-800 hover:border-orange-500/50 rounded-2xl p-8 text-center bg-zinc-900/40 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="imageUpload"
              />
              <UploadCloud className="w-10 h-10 text-orange-500 mx-auto mb-2 pointer-events-none" />
              <p className="text-sm font-semibold text-white pointer-events-none">
                Drag and drop your photos here or click to browse
              </p>
              <p className="text-xs text-zinc-500 mt-1 pointer-events-none">
                Supports JPG, PNG, WEBP up to 5MB each. High resolution photos increase booking rates by 3x.
              </p>
            </div>

            {/* Thumbnail Preview Grid */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-3">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 group bg-zinc-900">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-zinc-950/80 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Inclusions & Amenities Chips */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>5. Verified Amenities & Facilities</span>
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {AMENITIES_OPTIONS.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
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
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 glow-orange-sm">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>6. House Rules & Guidelines</span>
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {RULES_OPTIONS.map((rule) => {
                const isSelected = formData.rules.includes(rule);
                return (
                  <button
                    key={rule}
                    type="button"
                    onClick={() => handleRuleToggle(rule)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
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
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isLoading ? 'Submitting Property...' : 'Publish Property Listing'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

