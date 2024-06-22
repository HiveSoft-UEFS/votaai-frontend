import React from 'react';
import Carousels from "./components/carousel";
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'
import PollCard from "./components/pollCard";
import RegistrationModal from "./components/RegistrationModal";
import BasePage from './components/basePage';
import AuditPage from './pages/auditPage';

const initialMenuItem = 'PERFIL';

function App() {
  return (
     <AuditPage/>
  );
}


export default App;
