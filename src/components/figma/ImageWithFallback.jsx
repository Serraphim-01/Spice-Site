import React, { useState, useEffect } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

// Generate a low-quality placeholder SVG based on image dimensions or color
const generateLowQualityPlaceholder = (src) => {
  // Create a small base64 encoded SVG that serves as a colored placeholder
  // This gives a general idea of the image without loading the full image
  const colors = ['#f0f0f0', '#e0e0e0', '#d0d0d0', '#f5f5f5'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(randomColor)}'/%3E%3C/svg%3E`;
};

export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [lowQualitySrc, setLowQualitySrc] = useState(null);

  const { src, alt, style, className, ...rest } = props;

  useEffect(() => {
    if (!src) {
      setImageSrc(null);
      setLowQualitySrc(null);
      setIsLoading(false);
      return;
    }

    // Set up low-quality placeholder
    setLowQualitySrc(generateLowQualityPlaceholder(src));
    setImageSrc(src);
    setIsLoading(true);
    setDidError(false);
  }, [src]);

  const handleError = () => {
    setDidError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // If there was an error, show fallback
  if (didError || !src) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    );
  }

  // Show the image with low-quality placeholder and blur effect during loading
  return (
    <img 
      src={isLoading && lowQualitySrc ? lowQualitySrc : imageSrc} 
      alt={alt} 
      className={`${className} ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'} transition-all duration-300`}
      style={style} 
      {...rest} 
      onError={handleError} 
      onLoad={handleLoad}
      loading="lazy"
    />
  );
}