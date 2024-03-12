import React, { useState } from 'react';
import uploadImg from "./logo.png";
import './index.css';
import axios from 'axios';

function App() {
  const requestStatus = {
    IDLE: 'idle',
    SUCCESS: 'success',
    LOADING: 'loading',
    FAILED: 'failed'
  };

  const [videoRequestStatus, setVideoRequestStatus] = useState(requestStatus.IDLE);

  const handleUpload = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    setVideoRequestStatus(requestStatus.LOADING);
    try {
      const response = await axios.post(
        'https://jumpcut-backend-0db4a198d22d.herokuapp.com/videos',
        formData,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      setVideoRequestStatus(requestStatus.SUCCESS);
      console.log(response.data); // Handle the response
    } catch (error) {
      setVideoRequestStatus(requestStatus.FAILED);
      console.error('Error uploading video:', error);
    }
  };

  const renderVideo = () => {
    switch (videoRequestStatus) {
      case requestStatus.SUCCESS:
        return <p>baixar vídeo</p>;
      case requestStatus.LOADING:
        return <p>carregando...</p>;
      case requestStatus.FAILED:
        return <p>Erro!</p>;
      default:
        return (
          <section className="file-upload">
            <img src={uploadImg} alt="upload" />
            <h2>Clique para carregar</h2>
            <p>ou arraste e solte um arquivo</p>
            <input type="file" id="file-upload" onChange={handleUpload} />
          </section>
        );
    }
  };


  return (
    <div className="container">
      <header>
        <h1>JumpCut Smart Editor</h1>
        <p>Transformando sua visão em realidade um corte de cada vez</p>
      </header>
      <main>
        {renderVideo()}
      </main>
    </div>
  );
};

export default App;
