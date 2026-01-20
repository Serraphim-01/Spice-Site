import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDrag } from "@use-gesture/react";

export function ImageSlider({ images, alt, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const sliderRef = useRef(null);

  // Preload images with low-quality placeholders
  useEffect(() => {
    const preloadImages = async () => {
      const loadedStatus = {};
      
      for (const imgSrc of images) {
        if (!imgSrc) continue; // Skip if src is null/undefined/empty
        
        try {
          // Check if we already have a cached high-res version
          if (!loadedStatus[imgSrc]) {
            const img = new Image();
            img.src = imgSrc;
            
            img.onload = () => {
              loadedStatus[imgSrc] = true;
              setLoadedImages(prev => ({ ...prev, [imgSrc]: true }));
            };
          }
        } catch (error) {
          console.warn(`Failed to preload image: ${imgSrc}`, error);
        }
      }
    };

    if (images && images.length > 0) {
      preloadImages();
    }
  }, [images]);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);

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

  // Setup swipe/drag gesture
  const bind = useDrag(({ offset: [x], event, movement: [mx] }) => {
    // Calculate the distance threshold for a swipe
    const minSwipeDistance = 100; // Increased threshold for better UX
    
    if (mx < -minSwipeDistance) {
      // Swipe left - go to next
      goToNext();
    } else if (mx > minSwipeDistance) {
      // Swipe right - go to previous
      goToPrevious();
    }
  }, {
    from: () => [0, 0],
    filterTaps: true,
    bounds: { left: -100, right: 100 },
    rubberband: true,
    pointer: { touch: true }, // Enable touch events specifically
  });

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
      {...bind()}
      style={{ touchAction: 'none' }} // Fix for swipe gesture on mobile
    >
      {/* Main image */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <ImageWithFallback
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className={className}
          // Add loading="lazy" and blur-up effect
          style={{
            filter: images[currentIndex] && !loadedImages[images[currentIndex]] ? 'blur(5px)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>

      {/* Navigation arrows - hidden on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors md:block hidden"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors md:block hidden"
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