import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>   
            <div className='links'>
                <a href="" className='link-item'>Inicio</a>
                <a href="" className='link-item'>Sobre</a>
                <a href="" className='link-item'>Contato</a>
                <a href="" className='link-item'>Auditoria</a>
            </div> 
            
            <p id='hivesoft'> &copy;2024 Hivesoft, Inc</p>

        </div>
    );
};

export default Footer;