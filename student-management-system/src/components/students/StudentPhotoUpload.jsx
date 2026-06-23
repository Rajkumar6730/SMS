// src/components/students/StudentPhotoUpload.jsx
import { useState, useRef } from 'react';

const StudentPhotoUpload = ({ onPhotoChange, initialPhoto }) => {
  const [preview, setPreview] = useState(initialPhoto || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      // Validate size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setPreview(dataUrl);
        onPhotoChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="photo-upload">
      <div className="photo-preview-container">
        {preview ? (
          <img src={preview} alt="Student" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">No Photo</div>
        )}
      </div>
      <div className="photo-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          id="photo-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="photo-upload" className="upload-btn">
          Upload Photo
        </label>
        {preview && (
          <button type="button" onClick={handleRemove} className="remove-btn">
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentPhotoUpload;