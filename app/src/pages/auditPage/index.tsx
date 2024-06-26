import React from "react";
import './auditPage.css';
import BasePage from "../../components/basePage";
import questionIcon from '../../assets/img/question.png';
import confirmIcon from '../../assets/img/confirm.png'

const AuditPage = () => {
  return (
    <BasePage username="NomeUsuário" title="AUDITORIA">
      <div className="audit-content">
        <div className="audit-form">
            <input
            type="text"
            placeholder="Digite o código de participação"
            className="audit-input"
            />
            <button className="audit-button">Auditar</button>
        </div>
       
        <div className="audit-info">
          <div className="audit-info-section">
            <img src={questionIcon} alt="" />
            <h2 className="audit-info-title">O que é?</h2>
            <p>
              Na auditoria do Votaai, você pode verificar como seu voto foi computado. Após votar, o usuário recebe um código por e-mail para realizar a auditoria nesta página.            </p>
          </div>
          <div className="audit-info-section">
            <img src={confirmIcon} alt="" />
            <h2 className="audit-info-title">São confiáveis?</h2>
            <p>
              No votaai os resultados são 100% confiáveis pois conta com uma tecnologia que não permite alteração de um voto já computado.
            </p>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default AuditPage;
