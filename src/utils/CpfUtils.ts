
export const formatCpf = (value: string): string => {
    return value
      .replace(/\D/g, "") 
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{2})$/, "$1-$2");
  };
  

  export const validateCpf = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, ""); 
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; 
  
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf[9])) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    return rest === parseInt(cpf[10]);
  };
  