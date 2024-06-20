import React, {useState} from "react";
import PageTitle from "../components/pageTitle";
import BasePage from "../components/basePage";


const CreatePoll = () =>{
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState(new Date());


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        
        <div className="">

            <div>
                <BasePage username='Caio Bruno' title="Criar Votação">
                    <form className="create-poll-form" onSubmit={handleSubmit}>
                    <label>
                        Titulo da enquete:
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
                    <label>
                        
                        Data Limite 
                        <input 
                            type="datetime-local"
                            value={dataLimite.toISOString().substring(0, 16)}
                            onChange={(e) => setDataLimite(new Date(e.target.value))} 
                        />
                    </label>

                    <button type="submit">Criar Enquete</button>
                    </form>

                </BasePage>
            </div>
           
        </div>
    )

}
export default CreatePoll;
