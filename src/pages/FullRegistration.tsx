import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FullRegistration.css";
import { useApi } from "../useApi/useApi";
import { validateCpf } from "../utils/CpfUtils";
import { validateWhatsapp } from "../utils/WhatsappUtils";
import { validateEmail } from "../utils/EmailUtils";
import InputField from "../components/InputField";
import CheckboxField from "../components/CheckboxField";
import AgeDropdown from "../components/AgeDropdown";
import Popup from "../components/Popup";

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
      idadePerfil: ""
    });
  
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
    useEffect(() => {
      setIsButtonEnabled(
        formData.nome.trim() !== "" &&
        validateCpf(formData.cpf) &&
        validateWhatsapp(formData.whatsapp) &&
        validateEmail(formData.email) &&
        formData.lgpd &&
        formData.idadePerfil !== ""         
      );
    }, [formData]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
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
        Cpf: formData.cpf,
        Phone: formData.whatsapp,
        Mail: formData.email,
        HasAcceptedTerm: formData.lgpd,
        HasAccount: formData.correntista,
        AgeProfileId: parseInt(formData.idadePerfil),
        OrganizerId: 1
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
        <Popup show={showPopup} message={popupMessage} />
  
        <h1 className="cadastro-title">CADASTRO USUÁRIO</h1>
        <p className="cadastro-subtitle">Bradesco Lollapalooza 2025</p>
  
        <InputField label="Nome" name="nome" placeholder="Nome" value={formData.nome} onChange={handleInputChange} />
        <InputField label="CPF" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleInputChange} />
        <InputField label="Whatsapp" name="whatsapp" placeholder="Whatsapp" value={formData.whatsapp} onChange={handleInputChange} />
        <InputField label="Email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        
        <AgeDropdown value={formData.idadePerfil} onChange={handleInputChange} />
        
        <CheckboxField label="Termo de responsabilidade e segurança de acordo com LGPD" name="lgpd" checked={formData.lgpd} onChange={handleCheckboxChange} />
        <CheckboxField label="Correntista Bradesco?" name="correntista" checked={formData.correntista} onChange={handleCheckboxChange} />
  
        <button className="cadastro-button" onClick={handleCadastro} disabled={!isButtonEnabled}>
          CADASTRAR
        </button>
  
        <p className="footer-text">HOLDING CLUBE</p>
      </div>
    );
};

export default CadastroCompleto;
