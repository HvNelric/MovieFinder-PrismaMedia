import React, { useContext, useRef } from 'react';
import logoMF from '../../icons/logo.svg';
import svgSearch from '../../icons/searchicon.svg';
import { SearchContext } from '../SearchContext/SearchContext';

const Header = () => {

    const context = useContext(SearchContext)
    const { setSearch } = context
    const searchRef = useRef()
    
    const handleSubmit = e => {
        e.preventDefault();
        setSearch(searchRef.current.value)
    }

    return (
        <header>
            <div className='header__wrapper'>
                <div className="header__logo-wrapper">
                    <img src={logoMF} alt="logo MovieFinder" />
                </div>
                <div className="header__search-wrapper">
                    <form className='mf-form-group' onSubmit={handleSubmit}>
                        <input ref={searchRef} type="text" placeholder='Rechercher un film' />
                        <button type='submit'>
                            <img src={svgSearch} alt="bouton rechercher" />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header