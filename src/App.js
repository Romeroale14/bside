import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import gif from './assets/bsidelogo.gif'
const App = () => {
  const [loading, setLoading] = useState(true);
  const [angle, setAngle] = useState(0); // Ángulo inicial del carrusel
  const images = [
    "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F04%2F06155038%2Fperro-beso.jpg?auth=7db092219938909c16f466d602dcf2715cb44547bae1b45714fbfc66be4b16e9&smart=true&width=1200&height=900&quality=85",
    "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp",
    "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/8ca0f2d4afb7548f6db0d6d60c385e1a.jpg",
    "https://i.blogs.es/669147/ram-s6-key--rt-1920x1080/1366_2000.jpeg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  let scrollTimeout;

  const handleScroll = (e) => {
    if (scrollTimeout) return;

    const delta = e.deltaY > 0 ? 1 : -1;
    const newAngle = angle + delta * (360 / images.length); // Modifica el ángulo para que se mueva hacia el fondo
    setAngle(newAngle);

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 1200); // Ajusta para reducir sensibilidad
  };

  return (
    <div className="pageBackground">
      
      <header>
        <nav id="navbar">
        <img src={gif} alt="" className="logo"/>
          <div className="container">
            <h1 className="logo"><a href="index.html" className="title">HOLA BSIDE</a></h1>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Contact</a></li>
              
            </ul>
          </div>
        </nav>
       
          
       

      </header>
      {loading ? (
        <div className="spinnerContainer">
          <ClipLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        <div className="carouselContainer" onWheel={handleScroll}>
          <div
            className="carousel"
            style={{
              transform: `rotateX(${angle}deg)`, // Rotación hacia el fondo
              transition: 'transform 1s ease', // Transición suave
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="slide"
                style={{
                  transform: `rotateX(${
                    index * (360 / images.length)
                  }deg) translateZ(-700px)`, // Mueve las imágenes hacia el fondo
                }}
              >
                <img src={img} alt={`Slide ${index + 1}`} className="image" />
              </div>
            ))}
          </div>
          
        </div>
        
      )}
    
    </div>
  );
};

export default App;
