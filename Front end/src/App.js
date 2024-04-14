import React, { Component } from 'react';
import axios from 'axios';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: '',
      imagePreviewUrl: '',
      csvFile: '',
      csvFileName: ''
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCsvChange = this.handleCsvChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  handleCsvChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    this.setState({
      csvFile: file,
      csvFileName: file.name
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.imageFile);
    formData.append('csv', this.state.csvFile);

    try {
      // Send files to Flask backend for processing
      const response = await axios.post('http://your-flask-backend/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle response from backend (e.g., update state with processed image)
      // For simplicity, let's assume the response contains the processed image URL
      if (response.data.imageUrl) {
        // Update parent component with processed image URL
        this.props.onImageProcessed(response.data.imageUrl);
      } else {
        // Handle error response
        console.error('Error processing image:', response.data.error);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  render() {
    let { imagePreviewUrl, csvFileName } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} alt="" />);
    }

    return (
      <div>
        <h1>NIGHT TIME ANALYZER</h1>
        <div>A website for analyzing poverty levels in urban areas based on nighttime satellite imagery.</div>
        <div className="imgPreview">{imagePreview}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" accept="image/*" onChange={this.handleImageChange} />
          <input type="file" accept=".csv" onChange={this.handleCsvChange} />
          <button type="submit">Process</button>
        </form>
        {csvFileName && <p>Selected CSV: {csvFileName}</p>}
      </div>
    );
  }
}

export default ImageUpload;
