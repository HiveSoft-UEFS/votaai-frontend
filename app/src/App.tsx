import React from 'react'
import Carousels from "./components/carousel";
import PageTitle from './components/pageTitle';
import SideMenu from './components/sideMenu'
import PollCard from "./components/pollCard";

function App() {
  return (
      <PollCard
          title="Melhores alguma coisa do ano passado"
          description="Votação que criei simplesmente por ter sentido alguma vontade aleatória de criar algo para ser votado, então, por favor, participe!"
          creator="NoNameBro"
          tags={['Ciência', 'Ficção', 'Cinema']}
          category="Cinema"
          expiry={new Date("2024-07-12T23:59:59")}
      />
  );
}


export default App;
