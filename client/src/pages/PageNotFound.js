import React from 'react'

import '../styles/pagenotfound.css'

import cictLogo from '../assets/images/cict-logo.png'
import PageNotFoundIMG from '../assets/images/PageNotFound.png'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
  return (
    <section id='Page_Not_Found' className='Page_Not_Found'>
        <header className='Page_Not_Found_Header'>
            <img src={cictLogo} alt="cictLogo" />
        </header>
        <div className="Page_Not_Found_Body">
            <div className="Page_Not_Found_Image">
                <img src={PageNotFoundIMG} alt="PageNotFoundImage" />
            </div>
            <div className="Page_Not_Found_Label">
              <h1>Oops! Page not found!</h1>
              <p>The page you’re looking for doesn’t exist or was removed!</p>
            </div>
            <div className="Page_Not_Found_GoBack">
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    </section>
  )
}

export default PageNotFound