import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Photo {
  id: number;
  image: string;
  description: string;
}

const PhotoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const { data } = await axios.get<Photo[]>(
        "http://127.0.0.1:8000/api/photos/"
      );
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      await axios.post("http://127.0.0.1:8000/api/photos/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setDescription("");
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <div style={{ columnCount: 3, columnGap: "10px" }}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={`http://127.0.0.1:8000${photo.image}`}
            alt={photo.description}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoUpload;
