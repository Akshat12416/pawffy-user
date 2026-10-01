import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Upload, Check, AlertCircle } from 'lucide-react';

export default function ReportLostPetForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    color: '',
    breed: '',
    height: '',
    weight: '',
    description: '',
    gender: 'Male',
    animalType: '',
    location: {
      latitude: '',
      longitude: '',
      address: ''
    },
    images: []
  });

  const [animalTypes, setAnimalTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAnimalTypes();
  }, []);

  // Fetch animal types from the dedicated endpoint
  const fetchAnimalTypes = async () => {
    try {
      const response = await fetch('https://thepawffy-dev.onrender.com/api/get-animal-types');
      const data = await response.json();
      if (data.success) {
        setAnimalTypes(data.allAnimalTypes || []);
      }
    } catch (error) {
      console.error('Error fetching animal types:', error);
    }
  };

  // Fetch breeds based on selected animal type
  const handleAnimalTypeChange = async (animalTypeId) => {
    setFormData({ ...formData, animalType: animalTypeId, breed: '' });
    setBreeds([]);
    
    if (!animalTypeId) return;
    
    try {
      const response = await fetch('https://thepawffy-dev.onrender.com/api/get-animal-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ animalTypeId: animalTypeId })
      });
      const data = await response.json();
      
      if (data.success && data.matchedSpecies && data.matchedSpecies.length > 0) {
        const species = data.matchedSpecies[0];
        if (species.breeds) {
          setBreeds(species.breeds);
        }
      }
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setErrors({ ...errors, images: 'Maximum 5 images allowed' });
      return;
    }

    const newImages = [];
    const newPreviews = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newImages.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setImagePreview([...imagePreview, ...newPreviews]);
            setFormData({ ...formData, images: [...formData.images, ...newImages] });
          }
        };
        reader.readAsDataURL(file);
      }
    });
    setErrors({ ...errors, images: '' });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreview(newPreviews);
  };

  const detectLocation = () => {
    setShowLocationModal(true);
    setIsLoadingLocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude}, ${longitude}`;
            
            setFormData({
              ...formData,
              location: {
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                address
              }
            });
          } catch (error) {
            setFormData({
              ...formData,
              location: {
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                address: `${latitude}, ${longitude}`
              }
            });
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          setErrors({ ...errors, location: 'Unable to detect location. Please enable location services.' });
        }
      );
    } else {
      setIsLoadingLocation(false);
      setErrors({ ...errors, location: 'Geolocation is not supported by your browser' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Pet name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.animalType) newErrors.animalType = 'Animal type is required';
    if (!formData.breed) newErrors.breed = 'Breed is required';
    if (!formData.color.trim()) newErrors.color = 'Color is required';
    if (!formData.location.address) newErrors.location = 'Location is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use FormData to send images
      const formDataToSend = new FormData();
      
      // Append images
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      
      // Append other fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('breed', formData.breed);
      formDataToSend.append('height', formData.height);
      formDataToSend.append('weight', formData.weight);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('animalType', formData.animalType);
      formDataToSend.append('postType', 'Lost');
      
      // Append location as separate fields
      formDataToSend.append('latitude', formData.location.latitude);
      formDataToSend.append('longitude', formData.location.longitude);
      formDataToSend.append('address', formData.location.address);

      console.log('FormData entries:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch('https://thepawffy-dev.onrender.com/api/lost-pets', {
        method: 'POST',
        body: formDataToSend
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: 'Lost pet report created successfully!' });
        // Reset form
        setTimeout(() => {
          setFormData({
            name: '',
            age: '',
            color: '',
            breed: '',
            height: '',
            weight: '',
            description: '',
            gender: 'Male',
            animalType: '',
            location: { latitude: '', longitude: '', address: '' },
            images: []
          });
          setImagePreview([]);
          setBreeds([]);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit report' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Report Lost Pet
          </motion.h1>
          <p className="text-gray-600">Help us reunite you with your beloved companion</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Animal Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Animal Type *
            </label>
            <select
              value={formData.animalType}
              onChange={(e) => handleAnimalTypeChange(e.target.value)}
              className={`w-full px-4 py-3 border ${errors.animalType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            >
              <option value="">Select animal type</option>
              {animalTypes.map((type) => (
                <option key={type.animalTypeId} value={type.animalTypeId}>
                  {type.animalType}
                </option>
              ))}
            </select>
            {errors.animalType && <p className="mt-1 text-sm text-red-600">{errors.animalType}</p>}
          </div>

          {/* Breed Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Breed *
            </label>
            <select
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              disabled={!formData.animalType || breeds.length === 0}
              className={`w-full px-4 py-3 border ${errors.breed ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
              <option value="">
                {!formData.animalType ? 'Select animal type first' : breeds.length === 0 ? 'Loading breeds...' : 'Select breed'}
              </option>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.breedName}>
                  {breed.breedName}
                </option>
              ))}
            </select>
            {errors.breed && <p className="mt-1 text-sm text-red-600">{errors.breed}</p>}
          </div>

          {/* Pet Name & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="Enter pet name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age (years) *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="Enter age"
              />
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender *
            </label>
            <div className="flex gap-4">
              {['Male', 'Female'].map((gender) => (
                <label key={gender} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color, Height & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color *
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className={`w-full px-4 py-3 border ${errors.color ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="e.g., Golden"
              />
              {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height
              </label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="e.g., 60 cm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="e.g., 25 kg"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Seen Location *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.location.address}
                readOnly
                className={`flex-1 px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-gray-50 cursor-pointer`}
                placeholder="Click to detect location"
                onClick={detectLocation}
              />
              <button
                type="button"
                onClick={detectLocation}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Detect
              </button>
            </div>
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pet Images * (Max 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {imagePreview.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative group"
                  >
                    <img src={img} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Any distinctive features, last seen wearing, circumstances..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </motion.button>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>

      {/* Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Detecting Location</h3>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {isLoadingLocation ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Getting your location...</p>
                </div>
              ) : formData.location.address ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-800">Location detected!</p>
                        <p className="text-sm text-green-700 mt-1">{formData.location.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Latitude:</span>
                      <p className="font-semibold">{parseFloat(formData.location.latitude).toFixed(6)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Longitude:</span>
                      <p className="font-semibold">{parseFloat(formData.location.longitude).toFixed(6)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Confirm Location
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Unable to detect location</p>
                      <p className="text-sm text-red-700 mt-1">Please enable location services and try again.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}