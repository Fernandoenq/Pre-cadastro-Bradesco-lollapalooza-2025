import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SuccessScreen.css";

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const [canClick, setCanClick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClick(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (canClick) {
      navigate("/cadastro"); // <-- Substitua pela rota desejada
    }
  };

  return (
    <div className="success-container" onClick={handleClick}>
      <h1 className="success-title">Pronto!</h1>
      <p className="success-text">Continue sua jornada para</p>
      <p className="success-text">garantir o seu brinde.</p>
    </div>
  );
};

export default SuccessScreen;
