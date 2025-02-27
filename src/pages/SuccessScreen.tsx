import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SuccessScreen.css"
import nfcImage from "../assets/bradesco logo.png"

const SuccessScreen: React.FC = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        
        {/* Logo do Bradesco */}
        <img src={nfcImage} alt="Bradesco" className="success-logo" />
        
        {/* Título */}
        <h1 className="success-title">
          PRÉ-CADASTRO <br /> REALIZADO COM SUCESSO
        </h1>

        {/* Texto informativo */}
        <p className="success-text">
          Termine seu cadastro com um de nossos corretores ou através de nossos totens.
        </p>

        {/* Rodapé */}
        <p className="success-footer">
          Bradesco Lollapalooza 2025
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
