import React, {useState} from "react";
import PageTitle from "../components/pageTitle";
import SideMenu from "../components/sideMenu";
import BasePage from "../components/basePage";

function CreatePoll(){
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState(new Date());


    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        
        <div className="">

            <div>
                <BasePage username='Caio Bruno'
                

                />
            </div>
           
            <PageTitle text="Criar enquete" color="white"/>
            <form onSubmit={handleSubmit}>
                <label>
                    Título da enquete:
                    <input 
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </label>
                <label>
                    Descrição da Enquete:
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </label>
            </form>
            

        </div>
    )

}
export default CreatePoll;
