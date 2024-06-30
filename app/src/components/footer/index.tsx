import React from 'react';
import './footer.css'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>   
            <div className='links'>
                <Link to="/" className='link-item'>Inicio</Link>
                <Link to="/sobre" className='link-item'>Sobre</Link>
                <Link to="/contaTO" className='link-item'>Contato</Link>
                <Link to="/auditoria" className='link-item'>Auditoria</Link>
            </div>
            <p id='hivesoft'> &copy;2024 Hivesoft, Inc</p>

        </div>
    );
};

export default Footer;