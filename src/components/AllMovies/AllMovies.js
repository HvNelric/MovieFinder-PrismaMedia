import React, { useEffect, useState } from 'react'
import MoviesCards from '../MoviesCards/MoviesCards';
import { apiKey } from '../Key/Key';
import { getMovies } from '../GetMovies/GetMovies';
import paginationPrev from '../../icons/paginationpreviousarrow.svg';
import paginationNext from '../../icons/paginationnextarrow.svg';


const AllMovies = () => {

    const [genres, setGenres] = useState([]);
    const [moviesCards, setMoviesCards] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)
    const [filter, setFilter] = useState({
        order: 'desc',
        triGenre: '',
        triYear: ''
    })

    const { order, triGenre, triYear } = filter;

    const handlePagination = e => {
        const paginationNumber = parseInt(e.target.innerText)
        setCurrentPagination(paginationNumber);
    }

    const handlePrev = () => {
        if (currentPagination !== 1) {
           setCurrentPagination(c => c - 1)
       }
    }

    const handleNext = () => {
        if (currentPagination !== 10) {
            setCurrentPagination(c => c + 1)
        }
    }

    const handleGenres = e => {
        console.log('target', e.target.value)
        setFilter({...filter, triGenre: e.target.value})
    }

    const handleOrder = e => {
        setFilter({ ...filter, order: e.target.value })
    }

    useEffect(() => {

        const reloadMovies = () => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPagination}${'&sort_by=popularity.' + order}${'&with_genres=' + triGenre}`;

            fetch(url)
                .then(response => response.json())
                .then(response => {
                    setMoviesCards(response.results);
                })
                .catch(error => console.log('Erreur : ', error))
        }

        getMovies(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`, setGenres);
        
        reloadMovies();

    }, [currentPagination, filter]);

    console.log('filter', filter)

    let htmlPagination = [];
    for (let i = 1; i <= 10; i++) {
        htmlPagination.push(<li className={i === currentPagination ? 'active' : null} key={`li-${i}`} onClick={handlePagination}>{i}</li>);
    }
    
    return (
        <div className='mf-allmovies'>
            <div className="allmovies__filter-container">
                <div className="allmovies__filter-input-group">
                    <label htmlFor="">Trier par : </label>
                    <div className='allmovies__filter-select-wrapper'>
                        <select className='allmovies__select' id="allmovies__filter-tri" onChange={handleOrder}>
                            <option value="">Ordre alphabétique</option>
                            <option value="asc">Ordre croissant</option>
                            <option value="desc">Ordre décroissant</option>
                        </select>
                    </div>
                </div>
                <div className="allmovies__filter-input-group">
                    <label htmlFor="allmovies__filter-filtre">Filtrer par :</label>
                    <div className='allmovies__filter-select-wrapper'>
                        <select className='allmovies__select' id="allmovies__filter-filtre" onChange={handleGenres}>
                            <option value="">Genre</option>
                            {
                                genres.map(({id, name}) => (
                                    <option className='allmovies__option' key={id} value={id}>{name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <input type="number" min="1900" max="2099" step="1" value="2016" />
                </div>
            </div>
            <MoviesCards cards={moviesCards} />
            <ul className="allmovies__pagination-container">
                <li className='allmovies__pagination-prev' onClick={handlePrev}>
                    <img src={paginationPrev} alt="Précédent" />
                </li>
                {htmlPagination}
                <li className='allmovies__pagination-prev' onClick={handleNext}>
                    <img src={paginationNext} alt="Précédent" />
                </li>
            </ul>
        </div>
    )
}

export default AllMovies 