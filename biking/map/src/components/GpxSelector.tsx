import { useState, useEffect } from 'react';
import { LatLngTuple } from 'leaflet';
import GpxParser from 'gpxparser';

interface GpxSelectorProps {
  onGpxSelect: (points: LatLngTuple[]) => void;
}

interface GpxFile {
  id: string;
  name: string;
  path: string;
}

const GpxSelector: React.FC<GpxSelectorProps> = ({ onGpxSelect }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const gpxFiles: GpxFile[] = Array.from({ length: 51 }, (_, i) => {
    const day = i + 1;
    return {
      id: day.toString(),
      name: `Day ${day}`,
      path: `/gpx-samples/Day_${day}.gpx`
    };
  })// Remove the first element to start from Day 1 (index 0 would be Day 1)

  useEffect(() => {
    if (selectedFile) {
      loadGpxFile(selectedFile);
    }
  }, [selectedFile]);

  const loadGpxFile = async (filePath: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(filePath);
      const gpxContent = await response.text();
      parseGpxFile(gpxContent);
    } catch (error) {
      console.error('Error loading GPX file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseGpxFile = (gpxContent: string) => {
    const gpx = new GpxParser();
    gpx.parse(gpxContent);
    
    if (gpx.tracks.length > 0) {
      // Extract points from the first track
      const points: LatLngTuple[] = gpx.tracks[0].points.map(
        (point: any) => [point.lat, point.lon] as LatLngTuple
      );
      
      onGpxSelect(points);
    } else if (gpx.routes.length > 0) {
      // If no tracks, try to use routes
      const points: LatLngTuple[] = gpx.routes[0].points.map(
        (point: any) => [point.lat, point.lon] as LatLngTuple
      );
      
      onGpxSelect(points);
    } else {
      console.error('No tracks or routes found in the GPX file');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  return (
    <div className="gpx-selector">
      <label htmlFor="gpx-select">Select a route: </label>
      <select 
        id="gpx-select" 
        value={selectedFile} 
        onChange={handleSelectChange}
        disabled={isLoading}
      >
        <option value="">-- Select a route --</option>
        {gpxFiles.map(file => (
          <option key={file.id} value={file.path}>
            {file.name}
          </option>
        ))}
      </select>
      {isLoading && <span className="loading-indicator">Loading...</span>}
    </div>
  );
};

export default GpxSelector; 