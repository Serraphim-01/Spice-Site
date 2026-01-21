import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageSlider({ images, alt, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const sliderRef = useRef(null);

  // Preload images with low-quality placeholders
  useEffect(() => {
    const preloadImages = async () => {
      const loadedStatus = {};
      const loadingStatus = {};
      
      for (const imgSrc of images) {
        if (!imgSrc) continue; // Skip if src is null/undefined/empty
        
        try {
          // Mark as loading initially
          loadingStatus[imgSrc] = true;
          setLoadingStates(prev => ({ ...prev, [imgSrc]: true }));
          
          const img = new Image();
          img.src = imgSrc;
          
          img.onload = () => {
            loadedStatus[imgSrc] = true;
            loadingStatus[imgSrc] = false;
            setLoadedImages(prev => ({ ...prev, [imgSrc]: true }));
            setLoadingStates(prev => ({ ...prev, [imgSrc]: false }));
          };
          
          img.onerror = () => {
            loadingStatus[imgSrc] = false;
            setLoadingStates(prev => ({ ...prev, [imgSrc]: false }));
          };
        } catch (error) {
          console.warn(`Failed to preload image: ${imgSrc}`, error);
          setLoadingStates(prev => ({ ...prev, [imgSrc]: false }));
        }
      }
    };

    if (images && images.length > 0) {
      preloadImages();
    } else {
      // Reset loading states if no images
      setLoadingStates({});
      setLoadedImages({});
    }
  }, [images]);

  

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };



  if (!images || images.length === 0) {
    return (
      <ImageWithFallback
        src="/placeholder-image.jpg"
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <div 
      className="relative w-full h-full" 
      ref={sliderRef}
    >
      {/* Main image */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <ImageWithFallback
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className={className}
          style={{
            filter: images[currentIndex] && loadingStates[images[currentIndex]] ? 'blur(5px)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>

      {/* Navigation arrows - hidden on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}