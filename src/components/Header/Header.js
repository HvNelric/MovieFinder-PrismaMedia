import React from 'react';
import logoMF from '../../icons/logo.svg';
import svgSearch from '../../icons/searchicon.svg';

const Header = () => {
    return (
        <header>
            <div className='header__wrapper'>
                <div className="header__logo-wrapper">
                    <img src={logoMF} alt="logo MovieFinder" />
                </div>
                <div className="header__search-wrapper">
                    <input type="text" placeholder='Rechercher un film' />
                    <button type='submit'>
                        <img src={svgSearch} alt="bouton rechercher" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header