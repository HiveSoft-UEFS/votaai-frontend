import React from 'react';
import './PageTitle.css'

interface PageTitleProps{
    text: string;
    color: string
}

function PageTitle({text,color}:PageTitleProps){
    return(
        <div className='box'>
            <h1 className='title' style={{color:color, borderColor:color}}>{text}</h1>
        </div>

    )
}

export default PageTitle