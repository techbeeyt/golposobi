// frontend/src/App.js
import { useEffect, useState } from "react";
import PhotoUpload from "./PhotoUpload";

interface Photo {
  id: number;
  image: string;
  description: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[] | []>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/photos/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotos(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={`http://localhost:8000${photo.image}`}
              alt={photo.description}
              width="200"
            />
            <p>{photo.description}</p>
          </div>
        ))}
      </div>

      <PhotoUpload />
    </div>
  );
}

export default App;
