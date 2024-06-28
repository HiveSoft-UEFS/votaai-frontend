import React from 'react';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from './pages/welcomePage';
import HomeScreen from './pages/homePage';
import ProfileScreen from "./pages/profileScreen";
import CreatePollPage from "./pages/CreatePollPage";
import AuditPage from "./pages/auditPage";
import History from "./pages/historyPage";
import AboutPage from "./pages/aboutPage";


function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Welcome />}/>
            <Route path="/perfil" element={<ProfileScreen />}/>
            <Route path="/criar-enquete" element={<CreatePollPage />}/>
            <Route path="/auditoria" element={<AuditPage />}/>
            <Route path="/historico" element={<History />}/>
            <Route path="/home" element={<HomeScreen />}/>
            <Route path="/sobre" element={<AboutPage/>}/>
            <Route path="/contato" element={<AboutPage/>}/>
        </Routes>
    );
}

export default App;