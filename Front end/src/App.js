import React, { Component } from 'react';
import noImage from './noImage.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rotate: false, translate: false, scale: false, opacity: false };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="overall">
        <div className="image">
          <ImageUpload
            rotate={this.state.rotate}
            translate={this.state.translate}
            scale={this.state.scale}
            opacity={this.state.opacity}
          />
        </div>
        <div className="editing">
          <Application
            onChange={this.changeHandler}
            rotate={this.state.rotate}
            translate={this.state.translate}
            scale={this.state.scale}
            opacity={this.state.opacity}
          />
        </div>
      </div>
    );
  }
}

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFile: null, csvFile: null };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCSVChange = this.handleCSVChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();
    const imageFile = e.target.files[0];
    this.setState({ imageFile });
  }

  handleCSVChange(e) {
    e.preventDefault();
    const csvFile = e.target.files[0];
    this.setState({ csvFile });
  }

  render() {
    const { imageFile, csvFile } = this.state;

    return (
      <div className="previewComponent">
        <div>
          <h1 className="font-bold text-4xl" style={{ color: '#ffffff' }}>
            NIGHT TIME ANALYZER
          </h1>
        </div>
        <div className="imgPreview">
          {imageFile && <p>Selected Image: {imageFile.name}</p>}
          {csvFile && <p>Selected CSV: {csvFile.name}</p>}
        </div>
        <input id="imageInput" type="file" accept="image/*" onChange={this.handleImageChange} style={{ display: 'none' }} />
        <input id="csvInput" type="file" accept=".csv" onChange={this.handleCSVChange} style={{ display: 'none' }} />

        <button href="#" className="choosebutton" onClick={() => document.getElementById('imageInput').click()}>
          <label htmlFor="imageInput">Choose Image</label>
        </button>
        <button href="#" className="choosebutton" onClick={() => document.getElementById('csvInput').click()}>
          <label htmlFor="csvInput">Choose CSV</label>
        </button>
      </div>
    );
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isProcessed: false };
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.setState({ isProcessed: false });
  }

  render() {
    const processedImage = this.state.isProcessed ? <img src="pdf_logo.png" alt="Processed PDF Logo" /> : null;

    const actionButton = this.state.isProcessed ? (
      <button className="resetButton" onClick={this.handleReset}>
        Reset
      </button>
    ) : (
      <button className="processButton" onClick={() => this.setState({ isProcessed: true })}>
        Process this!
      </button>
    );

    return (
      <div className="edit">
        {processedImage}
        <div>{actionButton}</div>
      </div>
    );
  }
}

export default App;
