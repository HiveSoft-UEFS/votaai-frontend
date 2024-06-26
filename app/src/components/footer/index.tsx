import React from 'react';
import './footer.css'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>   
            <div className='links'>
                <Link to="/" className='link-item'>Inicio</Link>
                <a href="" className='link-item'>Sobre</a>
                <a href="" className='link-item'>Contato</a>
                <Link to="/auditoria" className='link-item'>Auditoria</Link>
            </div>
            <p id='hivesoft'> &copy;2024 Hivesoft, Inc</p>

        </div>
    );
};

export default Footer;