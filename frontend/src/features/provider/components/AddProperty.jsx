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
  'Wi-Fi 100Mbps+',
  '3x Daily Mess Food',
  'Air Conditioning',
  'Washing Machine',
  'Refrigerator',
  '24/7 RO Drinking Water',
  'Power Backup / Inverter',
  'Biometric Gate Access',
  'CCTV Surveillance',
  'Study Desk & Lamp',
  'Geyser / Hot Water',
  'Housekeeping Daily',
  'Attached Washroom',
  'Two Wheeler Parking',
  'Elevator / Lift'
];

const RULES_OPTIONS = [
  'Gate Curfew 10:00 PM',
  'Strictly No Alcohol',
  'Strictly No Smoking',
  'College ID Mandatory',
  'Govt ID Verification',
  'Quiet Hours 10PM - 6AM',
  'Day Visitors Allowed in Lounge Only',
  'No Overnight Guests in Dorm',
  'Advance Rent by 5th',
  'Warden Contact Logged'
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
        toast.error('Please complete all mandatory manifest fields');
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
      toast.success('Student PG submitted for admin audit queue!');
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
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="board p-6">
          <div className="flex items-center justify-between">
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
                    MANIFEST INGESTION // AUDIT QUEUE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  List New Student PG / Hostel
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Register verified student accommodation for compliance audit & student booking roster.
                </p>
              </div>
            </div>
          </div>
        </div>

        {errors.global && (
          <div className="board p-4 text-xs font-mono text-red-400 border-red-500/40 flex items-center gap-2 bg-red-950/20">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Hostel Identification */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center gap-2 text-[#ffb000]">
              <Building className="w-4 h-4" />
              <span>01 // HOSTEL IDENTIFICATION & WARDEN DETAILS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Hostel / PG Title *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.name}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'name')}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] font-mono"
                  placeholder="e.g. Skyline Scholar Heights Student PG"
                />
                {errors.basicInfo?.name && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.basicInfo.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Structure Category *
                </label>
                <select
                  value={formData.basicInfo.buildingType || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'buildingType')}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono cursor-pointer"
                >
                  <option value="" className="bg-neutral-900">Select structure type</option>
                  <option value="Dedicated PG Building" className="bg-neutral-900">Dedicated Student PG Building</option>
                  <option value="Hostel Complex" className="bg-neutral-900">University Hostel Complex</option>
                  <option value="Apartment / Flat" className="bg-neutral-900">Student Shared Apartment</option>
                  <option value="Independent House" className="bg-neutral-900">Independent Villa / House</option>
                </select>
                {errors.basicInfo?.buildingType && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.basicInfo.buildingType}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Resident Demographic *
                </label>
                <select
                  value={formData.basicInfo.category || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'category')}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono cursor-pointer"
                >
                  <option value="" className="bg-neutral-900">Select resident category</option>
                  <option value="Boys PG / Men" className="bg-neutral-900">Boys PG / Male Students</option>
                  <option value="Girls PG / Women" className="bg-neutral-900">Girls PG / Female Students</option>
                  <option value="Co-Living (Unisex)" className="bg-neutral-900">Co-Living / Unisex PG</option>
                  <option value="Working Professionals / Students" className="bg-neutral-900">Students & Fresh Grads</option>
                </select>
                {errors.basicInfo?.category && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.basicInfo.category}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Warden / Host Full Name *
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.ownerName}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerName')}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Warden Direct Mobile *
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.ownerPhone}
                  onChange={(e) => handleInputChange(e, 'basicInfo', 'ownerPhone')}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.basicInfo?.ownerPhone && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.basicInfo.ownerPhone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  Warden Email Dossier
                </label>
                <input
                  type="email"
                  value={formData.basicInfo.ownerEmail}
                  readOnly
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded text-xs text-neutral-500 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Geographical Coordinates */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center gap-2 text-[#ffb000]">
              <MapPin className="w-4 h-4" />
              <span>02 // CAMPUS HUB & GEOGRAPHICAL LOCATION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">City *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange(e, 'location', 'city')}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.location?.city && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.location.city}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Campus Hub / Locality *</label>
                <input
                  type="text"
                  value={formData.location.area}
                  onChange={(e) => handleInputChange(e, 'location', 'area')}
                  placeholder="e.g. Madhapur, Near Metro & Universities"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.location?.area && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.location.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Pincode *</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) => handleInputChange(e, 'location', 'pincode')}
                  placeholder="500081"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.location?.pincode && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.location.pincode}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Full Proximity Address *</label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleInputChange(e, 'location', 'address')}
                  placeholder="Plot number, building name, walking distance to colleges/tech parks"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.location?.address && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.location.address}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Bed Units & Tariff */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center gap-2 text-[#ffb000]">
              <DollarSign className="w-4 h-4" />
              <span>03 // BED INVENTORY & STUDENT TARIFF (ZERO BROKERAGE)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Available Bed Units *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.rooms}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'rooms')}
                  placeholder="e.g. 12"
                  min="1"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.propertyDetails?.rooms && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.propertyDetails.rooms}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Floor Area (Sq. Ft.) *</label>
                <input
                  type="number"
                  value={formData.propertyDetails.area}
                  onChange={(e) => handleInputChange(e, 'propertyDetails', 'area')}
                  placeholder="e.g. 2500"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.propertyDetails?.area && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.propertyDetails.area}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Monthly Rent Per Bed (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.rent}
                  onChange={(e) => handleInputChange(e, 'pricing', 'rent')}
                  placeholder="e.g. 7500"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.pricing?.rent && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.pricing.rent}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400">Refundable Deposit (₹) *</label>
                <input
                  type="number"
                  value={formData.pricing.deposit}
                  onChange={(e) => handleInputChange(e, 'pricing', 'deposit')}
                  placeholder="e.g. 10000"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-xs sm:text-sm text-white focus:outline-none focus:border-[#ffb000] font-mono"
                />
                {errors.pricing?.deposit && <p className="text-[11px] font-mono text-red-400 mt-0.5">{errors.pricing.deposit}</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Photo Gallery */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#ffb000]">
                <UploadCloud className="w-4 h-4" />
                <span>04 // RESIDENCE PHOTO DROPZONE</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">{previewImages.length} photo(s) selected</span>
            </div>

            <div className="relative border border-dashed border-neutral-700 hover:border-[#ffb000] rounded p-8 text-center bg-neutral-900/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="imageUpload"
              />
              <UploadCloud className="w-8 h-8 text-[#ffb000] mx-auto mb-2 pointer-events-none" />
              <p className="text-xs font-mono font-bold text-white uppercase tracking-wider pointer-events-none">
                Select Hostel & Sharing Room Photos
              </p>
              <p className="text-[11px] font-mono text-neutral-400 mt-1 pointer-events-none">
                Upload clear shots of bedrooms, mess area, study spaces, and washrooms.
              </p>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded overflow-hidden border border-neutral-800 bg-black">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/90 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Student Amenities */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center gap-2 text-[#ffb000]">
              <Sparkles className="w-4 h-4" />
              <span>05 // VERIFIED STUDENT AMENITIES</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {AMENITIES_OPTIONS.map((amenity) => {
                const isSelected = formData.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffb000] text-black border border-[#ffb000]'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Hostel Curfew & Code */}
          <div className="board p-6 sm:p-8 space-y-6">
            <div className="board-head pb-3 flex items-center gap-2 text-[#ffb000]">
              <ShieldCheck className="w-4 h-4" />
              <span>06 // HOSTEL REGULATIONS & CURFEW CODE</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {RULES_OPTIONS.map((rule) => {
                const isSelected = formData.rules.includes(rule);
                return (
                  <button
                    key={rule}
                    type="button"
                    onClick={() => handleRuleToggle(rule)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffb000] text-black border border-[#ffb000]'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40'
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
              className="px-5 py-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-solari-amber cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Transmitting PG Manifest...' : 'Transmit for Audit'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
