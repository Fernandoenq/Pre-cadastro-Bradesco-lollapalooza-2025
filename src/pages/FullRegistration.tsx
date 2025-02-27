import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FullRegistration.css";
import { useApi } from "../useApi/useApi";
import { validateCpf } from "../utils/CpfUtils";
import { validateWhatsapp } from "../utils/WhatsappUtils";
import { validateEmail } from "../utils/EmailUtils";

const CadastroCompleto: React.FC = () => {
    const navigate = useNavigate();
    const { callApi, showPopup, popupMessage } = useApi();
  
    const [formData, setFormData] = useState({
      nome: "",
      cpf: "",
      whatsapp: "",
      email: "",
      lgpd: false,
      correntista: false,
    });
  
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
    useEffect(() => {
      const isValid =
        formData.nome.trim() !== "" &&
        validateCpf(formData.cpf) &&
        validateWhatsapp(formData.whatsapp) &&
        validateEmail(formData.email) &&
        formData.lgpd;
      
      setIsButtonEnabled(isValid);
    }, [formData]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value, // Agora o valor é salvo sem qualquer formatação
      }));
    };
  
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    };
  
    const handleCadastro = async () => {
      const registerData = {
        PersonName: formData.nome,
        Cpf: formData.cpf, // CPF sem formatação
        Phone: formData.whatsapp, // WhatsApp sem formatação
        Mail: formData.email,
        HasAcceptedTerm: formData.lgpd,
        HasAccount: formData.correntista,
        ExternalCode: localStorage.getItem("rfidValue") || ""
      };
      
      console.log(registerData);
      localStorage.setItem("cpf", registerData.Cpf);
      const result = await callApi("/Person/Person", "POST", registerData);
      
      if (result !== null) {
        console.log("✅ Cadastro bem-sucedido! Resposta da API:", result);
        navigate("/Sucesso");
      } else {
        console.error("❌ Erro no cadastro. Verifique a resposta da API.");
      }
    };
  
    return (
      <div className="cadastro-container">
        {showPopup && <div className="popup top-right">{popupMessage}</div>}
  
        <h1 className="cadastro-title">CADASTRO USUÁRIO</h1>
        <p className="cadastro-subtitle">Bradesco Lollapalooza 2025</p>
  
        <div className="input-container">
          <label className="input-label">Nome:</label>
          <input 
            type="text" 
            name="nome" 
            className="input-field" 
            placeholder="Nome" 
            value={formData.nome} 
            onChange={handleInputChange} 
          />
        </div>
  
        <div className="input-container">
          <label className="input-label">CPF:</label>
          <input 
            type="text" 
            name="cpf" 
            className="input-field" 
            placeholder="CPF" 
            value={formData.cpf} 
            onChange={handleInputChange} 
          />
        </div>
  
        <div className="input-container">
          <label className="input-label">Whatsapp:</label>
          <input 
            type="text" 
            name="whatsapp" 
            className="input-field" 
            placeholder="Whatsapp" 
            value={formData.whatsapp} 
            onChange={handleInputChange} 
          />
        </div>
  
        <div className="input-container">
          <label className="input-label">Email:</label>
          <input 
            type="text" 
            name="email" 
            className="input-field" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>
  
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              name="lgpd" 
              checked={formData.lgpd} 
              onChange={handleCheckboxChange} 
              required 
            />
            <span>Termo de responsabilidade e segurança de acordo com LGPD</span>
          </label>
        </div>
  
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              name="correntista" 
              checked={formData.correntista} 
              onChange={handleCheckboxChange} 
            />
            <span>Correntista Bradesco?</span>
          </label>
        </div>
  
        <button className="cadastro-button" onClick={handleCadastro} disabled={!isButtonEnabled}>
          CADASTRAR
        </button>
  
        <p className="footer-text">HOLDING CLUBE</p>
      </div>
    );
  };
  
  export default CadastroCompleto;
