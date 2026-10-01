/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Heart, Info, X, ChevronLeft, ChevronRight, Filter, RefreshCw, Phone, Mail, Share2, Bookmark, AlertCircle, Clock, Zap, PawPrint, Sparkles, Dog, Cat, Bird, Rabbit, Users, User, Ruler, Palette, Cake, ChevronDown, ChevronUp, TrendingUp, Radio, FileText, Tag, Hash, MessageSquare, Navigation, ExternalLink } from 'lucide-react';

const ImageGalleryModal = ({ images, isOpen, onClose, petName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90 duration-300"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex]}
          alt={`${petName} - ${currentIndex + 1}`}
          className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const PetDetailsModal = ({ pet, type, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !pet) return null;

  const images = pet.images && pet.images.length > 0 ? pet.images : ['https://via.placeholder.com/600x400?text=No+Image'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    if (dateString._seconds) {
      const date = new Date(dateString._seconds * 1000);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const InfoItem = ({ icon: Icon, label, value, highlight = false }) => (
    <div className={`flex items-start gap-3 p-4 rounded-xl transition-all ${
      highlight ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200' : 'bg-gray-50 hover:bg-gray-100'
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        highlight ? 'bg-orange-500' : 'bg-gray-200'
      }`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-white' : 'text-gray-600'}`} />
      </div>
      <div className="flex-1">
        <p className={`text-xs font-bold mb-1 ${highlight ? 'text-orange-800' : 'text-gray-500'}`}>
          {label}
        </p>
        <p className={`text-sm font-semibold ${highlight ? 'text-orange-900' : 'text-gray-900'}`}>
          {value || 'N/A'}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-3xl max-w-5xl w-full my-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative p-6 ${
          type === 'lost' 
            ? 'bg-gradient-to-r from-red-500 to-red-600' 
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PawPrint className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">{pet.name || 'Unknown Pet'}</h2>
              <p className="text-white/90 flex items-center gap-2 text-lg">
                {type === 'lost' ? (
                  <>
                    <Search className="w-5 h-5" />
                    Lost Pet Report
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Found Pet Report
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]}
                  alt={pet.name || 'Pet'}
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/60 w-2'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative h-20 rounded-xl overflow-hidden ${
                        currentImageIndex === idx ? 'ring-4 ring-orange-500' : 'ring-2 ring-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                          +{images.length - 4}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Basic Info */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem icon={Dog} label="Breed" value={pet.breed} />
                  <InfoItem icon={Users} label="Gender" value={pet.gender} />
                  <InfoItem icon={Cake} label="Age" value={pet.age ? `${pet.age} Years` : null} />
                  <InfoItem icon={Palette} label="Color" value={pet.color} />
                  <InfoItem icon={Ruler} label="Height" value={pet.height} />
                  <InfoItem icon={Tag} label="Species" value={pet.species} />
                </div>
              </div>

              {/* Description */}
              {pet.description && (
                <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-700" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{pet.description}</p>
                </div>
              )}

              {/* Additional Details */}
              {pet.additionalDetails && (
                <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Additional Details
                  </h3>
                  <p className="text-blue-800 leading-relaxed">{pet.additionalDetails}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          {pet.location && (
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border-2 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pet.location.address && (
                  <InfoItem icon={Navigation} label="Address" value={pet.location.address} highlight />
                )}
                {pet.location.city && (
                  <InfoItem icon={MapPin} label="City" value={pet.location.city} />
                )}
                {pet.location.state && (
                  <InfoItem icon={MapPin} label="State" value={pet.location.state} />
                )}
                {pet.location.pincode && (
                  <InfoItem icon={Hash} label="Pincode" value={pet.location.pincode} />
                )}
                {pet.location.latitude && pet.location.longitude && (
                  <InfoItem 
                    icon={Navigation} 
                    label="Coordinates" 
                    value={`${pet.location.latitude}, ${pet.location.longitude}`} 
                  />
                )}
              </div>
              
              {pet.location.latitude && pet.location.longitude && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`https://www.google.com/maps?q=${pet.location.latitude},${pet.location.longitude}`, '_blank')}
                  className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Google Maps
                </motion.button>
              )}
            </div>
          )}

          {/* Contact & Timeline */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            {(pet.contactNumber || pet.contactEmail) && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {pet.contactNumber && (
                    <a
                      href={`tel:${pet.contactNumber}`}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-700">Phone Number</p>
                        <p className="text-sm font-bold text-green-900 group-hover:text-green-600">
                          {pet.contactNumber}
                        </p>
                      </div>
                    </a>
                  )}
                  {pet.contactEmail && (
                    <a
                      href={`mailto:${pet.contactEmail}`}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-700">Email Address</p>
                        <p className="text-sm font-bold text-green-900 group-hover:text-green-600">
                          {pet.contactEmail}
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-5 border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </h3>
              <div className="space-y-3">
                {pet.createdAt && (
                  <InfoItem 
                    icon={Calendar} 
                    label="Report Created" 
                    value={formatDate(pet.createdAt)} 
                  />
                )}
                {pet.lastSeenDate && (
                  <InfoItem 
                    icon={Calendar} 
                    label="Last Seen Date" 
                    value={formatDate(pet.lastSeenDate)} 
                  />
                )}
                {pet.updatedAt && (
                  <InfoItem 
                    icon={Calendar} 
                    label="Last Updated" 
                    value={formatDate(pet.updatedAt)} 
                  />
                )}
              </div>
            </div>
          </div>

          {/* Additional Fields (Dynamic) */}
          {/* {Object.keys(pet).filter(key => 
            !['id', 'name', 'breed', 'gender', 'age', 'color', 'height', 'species', 'description', 'additionalDetails', 'images', 'location', 'contactNumber', 'contactEmail', 'createdAt', 'updatedAt', 'lastSeenDate', 'type'].includes(key)
          ).length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Other Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(pet).filter(([key]) => 
                  !['id', 'name', 'breed', 'gender', 'age', 'color', 'height', 'species', 'description', 'additionalDetails', 'images', 'location', 'contactNumber', 'contactEmail', 'createdAt', 'updatedAt', 'lastSeenDate', 'type'].includes(key)
                ).map(([key, value]) => (
                  <InfoItem 
                    key={key}
                    icon={Tag} 
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} 
                    value={typeof value === 'object' ? JSON.stringify(value) : String(value)} 
                  />
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact Owner
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-w-[200px] px-6 py-4 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-5 h-5" />
              Save
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PetCard = ({ pet, type }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    if (dateString._seconds) {
      const date = new Date(dateString._seconds * 1000);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculateAge = (createdAt) => {
    if (!createdAt) return 'N/A';
    
    let date;
    if (createdAt._seconds) {
      date = new Date(createdAt._seconds * 1000);
    } else {
      date = new Date(createdAt);
    }
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Just now';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const isRecent = (createdAt) => {
    const age = calculateAge(createdAt);
    return age.includes('Just now') || age.includes('Yesterday') || age.includes('days ago');
  };

  const images = pet.images && pet.images.length > 0 ? pet.images : ['https://via.placeholder.com/400x300?text=No+Image'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
      >
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentImageIndex]}
            alt={pet.name || 'Pet'}
            className="w-full h-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-700"
            onClick={() => setShowGallery(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`px-4 py-2 rounded-full text-white text-xs font-bold shadow-xl backdrop-blur-sm flex items-center gap-2 ${
                type === 'lost' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
              }`}
            >
              {type === 'lost' ? (
                <>
                  <Search className="w-3.5 h-3.5" />
                  Lost Pet
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Found Pet
                </>
              )}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-xl hover:bg-white transition-all"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-orange-500 text-orange-500' : 'text-gray-700'}`} />
            </motion.button>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/60 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* {isRecent(pet.createdAt) && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-xl flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Urgent
              </motion.div>
            </div>
          )} */}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1.5 hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-2">
                {pet.name || 'Unknown'}
                <PawPrint className="w-4 h-4 text-orange-500" />
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-1.5">
                <Dog className="w-3.5 h-3.5" />
                <span className="font-medium">{pet.breed || 'Unknown Breed'}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium mb-0.5">Gender</p>
                <p className="text-sm font-bold text-blue-900">{pet.gender || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Cake className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-purple-700 font-medium mb-0.5">Age</p>
                <p className="text-sm font-bold text-purple-900">{pet.age ? `${pet.age} Years` : 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl border border-pink-100">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                <Palette className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-xs text-pink-700 font-medium mb-0.5">Color</p>
                <p className="text-sm font-bold text-pink-900">{pet.color || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl border border-green-100">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Ruler className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium mb-0.5">Height</p>
                <p className="text-sm font-bold text-green-900">{pet.height || 'N/A'}</p>
              </div>
            </div>
          </div>

          {pet.location && pet.location.address && (
            <div className="flex items-start gap-3 mb-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200">
              <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-orange-800 mb-1">Last Seen Location</p>
                <p className="text-sm text-gray-700 leading-relaxed">{pet.location.address}</p>
              </div>
            </div>
          )}

          {pet.description && (
            <div className="mb-5">
              <p className={`text-sm text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-3' : ''}`}>
                {pet.description}
              </p>
              {pet.description.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold mt-2 flex items-center gap-1.5 transition-colors"
                >
                  {showFullDescription ? (
                    <>
                      Show less 
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Read more 
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          <div className="pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{calculateAge(pet.createdAt)}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </motion.button>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetailsModal(true)}
                className="flex-1 px-4 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-2xl text-sm font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Info className="w-4 h-4" />
                All Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-3 rounded-2xl text-sm font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                  type === 'lost' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                }`}
              >
                <Phone className="w-4 h-4" />
                Contact
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showGallery && (
          <ImageGalleryModal
            images={images}
            isOpen={showGallery}
            onClose={() => setShowGallery(false)}
            petName={pet.name}
          />
        )}
        {showDetailsModal && (
          <PetDetailsModal
            pet={pet}
            type={type}
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const FilterSidebar = ({ onFilterChange, filterState, isOpen, onClose }) => {
  const speciesOptions = [
    { value: 'All', icon: PawPrint },
    { value: 'Dog', icon: Dog },
    { value: 'Cat', icon: Cat },
    { value: 'Bird', icon: Bird },
    { value: 'Rabbit', icon: Rabbit },
    { value: 'Other', icon: Sparkles }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 rounded-3xl p-7 text-white shadow-2xl sticky top-6 border border-indigo-800/50 ${
          isOpen ? 'fixed lg:static inset-y-0 left-0 z-50 overflow-y-auto max-w-sm' : 'hidden lg:block'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                Find<span className="text-orange-400">My</span>Pet
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-indigo-300 mb-6 leading-relaxed">
          Use our advanced filters to quickly locate your beloved pet or help someone find theirs.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-bold mb-3 flex items-center gap-2 text-indigo-100">
              <PawPrint className="w-4 h-4" />
              Pet Name
            </label>
            <input
              type="text"
              placeholder="Enter pet name..."
              value={filterState.petName}
              onChange={(e) => onFilterChange({ petName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-3 flex items-center gap-2 text-indigo-100">
              <Dog className="w-4 h-4" />
              Species
            </label>
            <div className="grid grid-cols-3 gap-2">
              {speciesOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange({ species: option.value })}
                    className={`py-3 px-2 rounded-xl font-semibold text-xs transition-all flex flex-col items-center gap-1.5 ${
                      filterState.species === option.value
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {option.value}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-3 flex items-center gap-2 text-indigo-100">
              <Sparkles className="w-4 h-4" />
              Breed
            </label>
            <input
              type="text"
              placeholder="e.g., Labrador, Persian..."
              value={filterState.breed}
              onChange={(e) => onFilterChange({ breed: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-bold mb-3 flex items-center gap-2 text-indigo-100">
              <Users className="w-4 h-4" />
              Gender
            </label>
            <div className="flex gap-2">
              {['All', 'Male', 'Female'].map((gender) => (
                <motion.button
                  key={gender}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFilterChange({ gender })}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                    filterState.gender === gender
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {gender}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-3 flex items-center gap-2 text-indigo-100">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Pincode"
                value={filterState.pincode}
                onChange={(e) => onFilterChange({ pincode: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all"
              />
              <input
                type="text"
                placeholder="City"
                value={filterState.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-3 flex items-center justify-between text-indigo-100">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Search Radius
              </span>
              <span className="text-orange-400 text-base">{filterState.radius} mi</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={filterState.radius}
              onChange={(e) => onFilterChange({ radius: e.target.value })}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-indigo-300 mt-2">
              <span>5 mi</span>
              <span>50 mi</span>
              <span>100 mi</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange({
                petName: '',
                species: 'All',
                breed: '',
                gender: 'All',
                pincode: '',
                city: '',
                radius: '25'
              })}
              className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all border border-white/20"
            >
              Clear All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/30"
            >
              Apply Filters
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default function LostFoundFeed() {
  const [pets, setPets] = useState({ lostPets: [], foundPets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState({
    petName: '',
    species: 'All',
    breed: '',
    gender: 'All',
    pincode: '',
    city: '',
    radius: '25'
  });

  useEffect(() => {
    fetchPets();
    const interval = setInterval(fetchPets, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPets = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    
    try {
      const response = await fetch('https://thepawffy-dev.onrender.com/api/all-reports');
      const data = await response.json();
      
      if (data.status) {
        setPets({
          lostPets: data.lostPets || [],
          foundPets: data.foundPets || []
        });
      }
      setLoading(false);
      setIsRefreshing(false);
    } catch (err) {
      setError('Failed to fetch pets data');
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleFilterChange = (updates) => {
    setFilterState(prev => ({ ...prev, ...updates }));
  };

  const filterPets = (petsList) => {
    return petsList.filter(pet => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          (pet.name && pet.name.toLowerCase().includes(query)) ||
          (pet.breed && pet.breed.toLowerCase().includes(query)) ||
          (pet.description && pet.description.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (filterState.petName && pet.name) {
        if (!pet.name.toLowerCase().includes(filterState.petName.toLowerCase())) {
          return false;
        }
      }

      if (filterState.breed && pet.breed) {
        if (!pet.breed.toLowerCase().includes(filterState.breed.toLowerCase())) {
          return false;
        }
      }

      if (filterState.gender !== 'All' && pet.gender) {
        if (pet.gender !== filterState.gender) {
          return false;
        }
      }

      return true;
    });
  };

  const getDisplayPets = () => {
    let allPets = [];
    
    if (activeTab === 'all') {
      allPets = [
        ...filterPets(pets.lostPets).map(pet => ({ ...pet, type: 'lost' })),
        ...filterPets(pets.foundPets).map(pet => ({ ...pet, type: 'found' }))
      ];
    } else if (activeTab === 'lost') {
      allPets = filterPets(pets.lostPets).map(pet => ({ ...pet, type: 'lost' }));
    } else {
      allPets = filterPets(pets.foundPets).map(pet => ({ ...pet, type: 'found' }));
    }

    return allPets.sort((a, b) => {
      const dateA = a.createdAt?._seconds ? a.createdAt._seconds : new Date(a.createdAt).getTime() / 1000;
      const dateB = b.createdAt?._seconds ? b.createdAt._seconds : new Date(b.createdAt).getTime() / 1000;
      return dateB - dateA;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-8"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 justify-center"
          >
            <PawPrint className="w-6 h-6 text-orange-500" />
            <p className="text-gray-700 text-xl font-semibold">Finding pets for you...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md border border-gray-100"
        >
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-8 text-lg">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchPets(true)}
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const displayPets = getDisplayPets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-indigo-50">
      <div className="bg-white shadow-xl border-b border-gray-100 sticky top-0 z-30 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-5">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  Lost & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Found</span> Pets
                </h1>
              </motion.div>
              <p className="text-gray-600 text-base flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Reuniting pets with their families. Every second counts!
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white rounded-2xl font-bold shadow-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>

              <div className="relative flex-1 lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, breed, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 transition-all shadow-sm hover:shadow-md text-sm"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchPets(true)}
                disabled={isRefreshing}
                className="p-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl border-2 border-orange-200 shadow-sm">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div className="text-sm">
                <span className="font-bold text-orange-700 text-lg">{displayPets.length}</span>
                <span className="text-gray-700 ml-2 font-medium">Total Pets</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              All Pets
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('lost')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md flex items-center gap-2 ${
                activeTab === 'lost'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Search className="w-4 h-4" />
              Lost ({pets.lostPets.length})
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('found')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md flex items-center gap-2 ${
                activeTab === 'found'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Found ({pets.foundPets.length})
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <FilterSidebar 
              onFilterChange={handleFilterChange} 
              filterState={filterState}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <PawPrint className="w-8 h-8 text-orange-500" />
                Let's Quickly Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Your Pet</span>!
              </h2>
              <p className="text-gray-600 text-base">
                {displayPets.length === 0 ? (
                  'No pets match your search criteria'
                ) : (
                  <>Showing {displayPets.length} {displayPets.length === 1 ? 'pet' : 'pets'}</>
                )}
              </p>
            </motion.div>

            {displayPets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100"
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-28 h-28 text-gray-300 mx-auto mb-8" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">No Pets Found</h3>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search terms to find more results
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery('');
                    setFilterState({
                      petName: '',
                      species: 'All',
                      breed: '',
                      gender: 'All',
                      pincode: '',
                      city: '',
                      radius: '25'
                    });
                    setActiveTab('all');
                  }}
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayPets.map((pet, index) => (
                    <motion.div
                      key={pet.id || index}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PetCard pet={pet} type={pet.type} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {displayPets.length > 0 && displayPets.length >= 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white border-2 border-orange-500 text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <ChevronDown className="w-5 h-5" />
                  Load More Pets
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <PawPrint className="w-7 h-7" />
      </motion.button>
    </div>
  );
}