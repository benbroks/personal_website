import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';

// Use the same LatLngTuple type as in other components
type LatLngTuple = [number, number];

interface ImageInfo {
  id: string;
  path: string;
  location: LatLngTuple;
  thumbnail?: string;
  description?: string;
  dateTaken?: string;
}

interface ImageMarkerProps {
  image: ImageInfo;
  onImageClick: (image: ImageInfo) => void;
}

const ImageMarker: React.FC<ImageMarkerProps> = ({ image, onImageClick }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Create a custom icon for the image marker
  const imageIcon = new DivIcon({
    className: 'image-marker',
    html: `<div style="
      background-color: #3498db;
      border: 2px solid white;
      border-radius: 50%;
      height: 16px;
      width: 16px;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: -4px;
        left: -4px;
        width: 24px;
        height: 24px;
        background-image: url('/images/camera-icon.svg');
        background-size: contain;
        background-repeat: no-repeat;
      "></div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const handleMarkerClick = () => {
    setIsPopupOpen(true);
  };

  const handleImageClick = () => {
    onImageClick(image);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    } catch (err) {
      return dateString;
    }
  };

  return (
    <Marker 
      position={image.location} 
      icon={imageIcon}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Popup className="image-popup">
        <div className="popup-content">
          <div className="popup-image-container">
            <img 
              src={image.thumbnail || image.path} 
              alt={image.description || "Location view"} 
              className="popup-image"
              onClick={handleImageClick}
            />
          </div>
          {image.description && (
            <div className="popup-description">
              <p>{image.description}</p>
              {image.dateTaken && (
                <p className="popup-date">{formatDate(image.dateTaken)}</p>
              )}
            </div>
          )}
          <button className="view-full-image-btn" onClick={handleImageClick}>
            View Full Image
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default ImageMarker; 