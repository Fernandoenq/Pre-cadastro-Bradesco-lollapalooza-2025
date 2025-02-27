import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroCompleto from '../pages/FullRegistration';
import SuccessScreen from '../pages/SuccessScreen';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroCompleto />} />        
        <Route path="/Sucesso" element={<SuccessScreen />} />        
        
      </Routes>
    </Router>
  );
};

export default App;
