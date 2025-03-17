import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SuccessScreen.css";

const SuccessScreen: React.FC = () => {
  return (
    <div className="success-container">
      {/* Título */}
      <h1 className="success-title">Pronto!</h1>

      {/* Texto informativo */}
      <p className="success-text">
        Continue sua jornada para 
      </p>

      <p className="success-text">garantir o seu brinde.</p>
    </div>
  );  
};

export default SuccessScreen;
