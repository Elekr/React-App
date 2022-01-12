
import React from 'react';
import Navigation from './components/Navbar/Navigation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Cocktails from './pages/cocktails';
import Equipment from './pages/equipment';
import Glass from './pages/glass';
import Ingredients from './pages/ingredients';
  
function App() {
  return (
      <div>
    <Router>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/all/cocktails' element={<Cocktails/>} />
        <Route path='/all/equipment' element={<Equipment/>} />
        <Route path='/all/glass' element={<Glass/>} />
        <Route path='/all/ingredients' element={<Ingredients/>} />
      </Routes>
    </Router>
    </div>
  );
}
  
export default App;