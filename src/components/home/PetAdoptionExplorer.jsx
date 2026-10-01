/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Info, Loader } from 'lucide-react';

const PetAdoptionExplorer = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [petsLoading, setPetsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Color mapping for different animal types
  const colorMap = {
    'Dog': { bg: 'bg-orange-100', border: 'border-orange-300', card: 'bg-orange-400' },
    'Cat': { bg: 'bg-purple-100', border: 'border-purple-300', card: 'bg-purple-400' },
    'Exotic': { bg: 'bg-green-100', border: 'border-green-300', card: 'bg-green-400' },
    'Reptiles': { bg: 'bg-emerald-100', border: 'border-emerald-300', card: 'bg-emerald-400' },
    'Aquatic': { bg: 'bg-blue-100', border: 'border-blue-300', card: 'bg-blue-400' },
    'Mammal': { bg: 'bg-amber-100', border: 'border-amber-300', card: 'bg-amber-400' },
    'Bird': { bg: 'bg-gray-100', border: 'border-gray-300', card: 'bg-gray-400' }
  };

  // Emoji mapping for fallback icons
  const emojiMap = {
    'Dog': '🐶',
    'Cat': '🐱',
    'Exotic': '🦎',
    'Reptiles': '🐍',
    'Aquatic': '🐠',
    'Mammal': '🐰',
    'Bird': '🦜'
  };

  // Fetch animal types on component mount
  useEffect(() => {
    fetchAnimalTypes();
  }, []);

  // Fetch pets when active tab changes
  useEffect(() => {
    if (activeTab) {
      console.log('Active tab changed to:', activeTab);
      setCurrentPage(1);
      setPets([]); // Clear previous pets
      fetchPets(activeTab, 1);
    }
  }, [activeTab]);

  const fetchAnimalTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://thepawffy-dev.onrender.com/api/get-animal-types');
      const data = await response.json();
      
      if (data.success && data.allAnimalTypes) {
        setAnimalTypes(data.allAnimalTypes);
        // Set first animal type as active by default
        if (data.allAnimalTypes.length > 0) {
          setActiveTab(data.allAnimalTypes[0].animalTypeId);
        }
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load animal types');
      setLoading(false);
      console.error('Error fetching animal types:', err);
    }
  };

  const fetchPets = async (animalTypeId, page = 1) => {
    try {
      setPetsLoading(true);
      console.log('Fetching pets for animalTypeId:', animalTypeId, 'page:', page);
      
      const response = await fetch('https://thepawffy-dev.onrender.com/api/get-animal-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          animalTypeId: animalTypeId,
          page: page,
          limit: 12
        }),
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success) {
        // Extract breeds from matchedSpecies
        let animalsData = [];
        
        if (data.matchedSpecies && Array.isArray(data.matchedSpecies)) {
          // Flatten all breeds from all species
          data.matchedSpecies.forEach(species => {
            if (species.breeds && Array.isArray(species.breeds)) {
              animalsData = [...animalsData, ...species.breeds];
            }
          });
        }
        
        console.log('Extracted Animals/Breeds:', animalsData);
        console.log('Number of pets:', animalsData.length);
        
        // Handle pagination - append or replace data
        if (page === 1) {
          setPets(animalsData);
        } else {
          setPets(prev => [...prev, ...animalsData]);
        }
        
        // Check if there's more data (you can adjust this based on your API's pagination)
        setHasMore(data.hasMore || data.hasNextPage || false);
      } else {
        console.log('API returned success: false');
        if (page === 1) {
          setPets([]);
        }
        setHasMore(false);
      }
      setPetsLoading(false);
    } catch (err) {
      console.error('Error fetching pets:', err);
      if (page === 1) {
        setPets([]);
      }
      setHasMore(false);
      setPetsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPets(activeTab, nextPage);
  };

  const getColors = (animalType) => {
    return colorMap[animalType] || { bg: 'bg-gray-100', border: 'border-gray-300', card: 'bg-gray-400' };
  };

  const getEmoji = (animalType) => {
    return emojiMap[animalType] || '🐾';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading amazing pets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">{error}</h3>
          <button 
            onClick={fetchAnimalTypes}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-orange-500">Explore</span> & <span className="text-orange-500">Adopt</span> a New Friend
          </h1>
          <p className="text-gray-600">Find your perfect companion from our loving animals</p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {animalTypes.map((animalType, index) => {
            const colors = getColors(animalType.animalType);
            const isActive = activeTab === animalType.animalTypeId;
            
            return (
              <motion.button
                key={animalType.animalTypeId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(animalType.animalTypeId)}
                className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 min-w-[80px] ${
                  isActive
                    ? `${colors.bg} ${colors.border} shadow-lg scale-105`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">
                  {getEmoji(animalType.animalType)}
                </div>
                <span className="text-sm font-medium text-gray-700">{animalType.animalType}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl border-2 border-orange-400 bg-orange-50/50"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {petsLoading && currentPage === 1 && (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading adorable pets...</p>
          </div>
        )}

        {/* Pet Cards Grid */}
        {!petsLoading || currentPage > 1 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {pets.map((pet, index) => {
                  const currentAnimalType = animalTypes.find(at => at.animalTypeId === activeTab);
                  const colors = getColors(currentAnimalType?.animalType || '');
                  
                  return (
                    <motion.div
                      key={pet.id || pet.animalId || index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Section */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <img 
                          src={pet.imageURL || pet.animalImage || pet.photo}
                          alt={pet.breedName || pet.animalName || 'Pet'}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className={`absolute inset-0 ${colors.card} opacity-80 hidden items-center justify-center`}>
                          <span className="text-6xl opacity-50">{getEmoji(currentAnimalType?.animalType || '')}</span>
                        </div>
                        {pet.timeAgo && (
                          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                            {pet.timeAgo}
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {pet.breedName || pet.name || 'Unnamed'}
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Heart size={20} />
                          </motion.button>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span>{pet.location || 'Location not specified'}</span>
                        </div>

                        {/* Pet Details */}
                        {/* <div className="grid grid-cols-2 gap-2 mb-3">
                          {pet.gender && (
                            <div className="bg-orange-50 rounded-lg px-2 py-1">
                              <span className="text-xs text-orange-600 font-medium">Gender: </span>
                              <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">{pet.gender}</span>
                            </div>
                          )}
                          {pet.breed && (
                            <div className="bg-orange-50 rounded-lg px-2 py-1">
                              <span className="text-xs text-orange-600 font-medium">Breed: </span>
                              <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">{pet.breed}</span>
                            </div>
                          )}
                          {pet.age && (
                            <div className="bg-orange-50 rounded-lg px-2 py-1">
                              <span className="text-xs text-orange-600 font-medium">Age: </span>
                              <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">{pet.age}</span>
                            </div>
                          )}
                          {pet.size && (
                            <div className="bg-orange-50 rounded-lg px-2 py-1">
                              <span className="text-xs text-orange-600 font-medium">Size: </span>
                              <span className="text-xs bg-orange-200 px-2 py-0.5 rounded text-orange-800">{pet.size}</span>
                            </div>
                          )}
                        </div> */}

                        {/* {pet.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pet.description}</p>
                        )} */}

                        {/* <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Info size={16} />
                          More Info
                        </motion.button> */}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Load More Button */}
            {hasMore && !petsLoading && (
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-200"
                >
                  Load More Pets
                </motion.button>
              </div>
            )}

            {/* Loading More Indicator */}
            {petsLoading && currentPage > 1 && (
              <div className="text-center mt-8">
                <Loader className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
              </div>
            )}
          </>
        ) : null}

        {/* Empty State */}
        {!petsLoading && pets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No {animalTypes.find(at => at.animalTypeId === activeTab)?.animalType.toLowerCase()}s available right now
            </h3>
            <p className="text-gray-500">Check back later for new furry friends!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PetAdoptionExplorer;