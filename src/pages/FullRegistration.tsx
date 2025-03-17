import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FullRegistration.css";
import { useApi } from "../useApi/useApi";
import { validateCpf } from "../utils/CpfUtils";
import { validateEmail } from "../utils/EmailUtils";
import InputField from "../components/InputField";
import CheckboxField from "../components/CheckboxField";
import Popup from "../components/Popup";

// Importação das logos
import BradescoLogo from "../assets/Logos/bralolla.png"; 

const CadastroCompleto: React.FC = () => {
    const navigate = useNavigate();
    const { callApi, showPopup, popupMessage } = useApi();
  
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        lgpd: false,
        correntista: "",  // Mantemos como string para captura inicial
        idadePerfil: "",
        sexo: ""
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
    useEffect(() => {
        setIsButtonEnabled(
            formData.nome.trim() !== "" &&
            validateCpf(formData.cpf) &&
            validateEmail(formData.email) &&
            formData.lgpd &&
            formData.idadePerfil !== "" &&
            formData.sexo !== "" &&
            formData.correntista !== ""
        );
    }, [formData]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            Phone: "11999999999", // Mockando um número fictício
            Mail: formData.email,
            HasAcceptedTerm: formData.lgpd,
            HasAccount: formData.correntista === "Sim", // 🔥 Conversão de "Sim" -> true e "Não" -> false
            AgeProfileId: formData.idadePerfil,
            Gender: formData.sexo,
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
    
            <h1 className="cadastro-title">Partiu dar o play neste cadastro?</h1>
    
            <InputField label="Nome" name="nome" placeholder="Nome" value={formData.nome} onChange={handleInputChange} />
            <InputField label="CPF" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleInputChange} />
            <InputField label="Email" name="email" placeholder="E-mail" value={formData.email} onChange={handleInputChange} />
            
            <div className="age-container">
                <label className="input-label">Idade</label>
                <div className="checkbox-group">
                    {["até 16", "17 a 25", "26 a 35", "36 a 45", "46+"].map((age) => (
                        <label key={age} className="checkbox-label">
                            <input type="radio" name="idadePerfil" value={age} checked={formData.idadePerfil === age} onChange={handleRadioChange} />
                            {age}
                        </label>
                    ))}
                </div>
            </div>

            <div className="gender-container">
                <label className="input-label">Sexo</label>
                <div className="checkbox-group">
                    {["Feminino", "Masculino", "Não binário", "Não identificar"].map((gender) => (
                        <label key={gender} className="checkbox-label">
                            <input 
                                type="radio" 
                                name="sexo" 
                                value={gender} 
                                checked={formData.sexo === gender} 
                                onChange={handleRadioChange} 
                            />
                            {gender}
                        </label>
                    ))}
                </div>
            </div>

            <div className="account-container">
                <label className="input-label">Você já é cliente Bradesco?</label>
                <div className="checkbox-group">
                    {["Sim", "Não"].map((option) => (
                        <label key={option} className="checkbox-label">
                            <input type="radio" name="correntista" value={option} checked={formData.correntista === option} onChange={handleRadioChange} />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
            
            <CheckboxField label="Termo de responsabilidade e segurança de acordo com LGPD" name="lgpd" checked={formData.lgpd} onChange={handleCheckboxChange} />
    
            <button className="cadastro-button" onClick={handleCadastro} disabled={!isButtonEnabled}>
                CADASTRAR
            </button>

            {/* Adicionando as logos na parte inferior */}
            <div className="logo-container">
                <img src={BradescoLogo} alt="Bradesco" className="logo-img" />
            </div>
        </div>
    );
};

export default CadastroCompleto;
