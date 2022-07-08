import React, { useContext, useEffect, useState } from 'react'
import MoviesCards from '../MoviesCards/MoviesCards';
import { apiKey } from '../Key/Key';
import { getMovies } from '../GetMovies/GetMovies';
import paginationPrev from '../../icons/paginationpreviousarrow.svg';
import paginationNext from '../../icons/paginationnextarrow.svg';
import Dropdown from '../Dropdown/Dropdown';
import { SearchContext } from '../SearchContext/SearchContext';

const AllMovies = () => {

    const [genres, setGenres] = useState([])
    const [moviesCards, setMoviesCards] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)
    const [pages, setPages] = useState(0)

    const context = useContext(SearchContext)
    const { search } = context
    let querySearch = '';
    search && search !== '' ? querySearch = search.replace(/ /g, '+') : querySearch = '';

    const [filter, setFilter] = useState({
        order: 'desc',
        triGenre: '',
        triYear: ''
    })
    const {order, triGenre, triYear} = filter

    const handlePagination = e => {
        const paginationNumber = parseInt(e.target.innerText)
        setCurrentPagination(paginationNumber);
    }

    const handlePrev = () => {
        setCurrentPagination(currentPagination !== 1 ? c => c - 1 : pages)
    }

    const handleNext = () => {
        setCurrentPagination(currentPagination !== pages ? c => c + 1 : 1)
    }

    // Tableau filtre popularité en dur
    const orderArray = [
        {
            name: 'croissant',
            id: 'asc'
        },
        {
            name: 'décroissant',
            id: 'desc'
        }
    ]

   // Tableau tri année en dur car l'implémentation d'un datepicker prendrait trop de temps.
    const yearArray = []
    for (let i = 2022; i >= 1980; i--){
        yearArray.push({
            name: i.toString(),
            id: i.toString() 
        })
    }

    useEffect(() => {

        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPagination}${'&sort_by=popularity.' + order}${triGenre !== '' ? '&with_genres=' + triGenre : ''}${triYear !== '' ? '&primary_release_year=' + triYear : ''}`

        querySearch !== '' ? url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${querySearch}${triGenre !== '' ? '&with_genres=' + triGenre : ''}${triYear !== '' ? '&primary_release_year=' + triYear : ''}` : console.log('no search')

        getMovies(url, setMoviesCards, setPages);

        getMovies(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`, setGenres);

    }, [currentPagination, order, triGenre, triYear, querySearch]);


    // Pagination array
    const htmlPagination = [];
    for (let i = 1; i <= pages; i++) {
        htmlPagination.push(<li className={i === currentPagination ? 'active' : ''} key={`li-${i}`} onClick={handlePagination}>{i}</li>);
    }
    
    return (
        <div className='mf-allmovies'>
            <div className="allmovies__filter-container">
                <div className="allmovies__filter-input-group">
                    <div className='mf-text'>Trier par : </div>
                    <Dropdown
                        classTag={'order'}
                        title={'Popularité'}
                        array={orderArray}
                        fnSetter={setFilter}
                        stateObj={filter}
                        stateValue={'order'}
                        all={false}
                    />
                </div>
                <div className="allmovies__filter-input-group">
                    <div className='mf-text'>Filtrer par :</div>
                    {
                        querySearch === '' &&
                        <Dropdown
                            classTag={'genres'}
                            title={'Genres'}
                            array={genres}
                            fnSetter={setFilter}
                            stateObj={filter}
                            stateValue={'triGenre'}
                            all={true}
                        />
                    }
                    
                    <Dropdown
                        classTag={'year'}
                        title={'Année'}
                        array={yearArray}
                        fnSetter={setFilter}
                        stateObj={filter}
                        stateValue={'triYear'}
                        all={true}
                    />
                </div>
            </div>
            <MoviesCards
                cards={moviesCards}
            />
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