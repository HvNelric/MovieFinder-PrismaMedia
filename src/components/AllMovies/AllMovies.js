import React, { useEffect, useState } from 'react'
import MoviesCards from '../MoviesCards/MoviesCards';
import { apiKey } from '../Key/Key';
import { getMovies } from '../GetMovies/GetMovies';
import paginationPrev from '../../icons/paginationpreviousarrow.svg';
import paginationNext from '../../icons/paginationnextarrow.svg';
import Dropdown from '../Dropdown/Dropdown';


const AllMovies = () => {

    const [genres, setGenres] = useState([])
    const [moviesCards, setMoviesCards] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)
    const [order, setOrder] = useState('desc')
    const [triGenre, setTriGenre] = useState('')
    const [triYear, setTriYear] = useState('')

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
        setTriGenre(e.target.value)
    }

    const handleOrder = e => {
        setOrder(e.target.value)
    }

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

    const yearArray = []
    for (let i = 2022; i >= 1980; i--){
        yearArray.push({
            name: i.toString(),
            id: i.toString() 
        })
    }

    console.log('year', yearArray)

    useEffect(() => {

        const reloadMovies = () => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPagination}${'&sort_by=popularity.' + order}${triGenre !== '' ? '&with_genres=' + triGenre : ''}${triYear !== '' ?'&year=' + triYear : ''}`;
            console.log('URL : ', url)
            fetch(url)
                .then(response => response.json())
                .then(response => {
                    setMoviesCards(response.results);
                })
                .catch(error => console.log('Erreur : ', error))
        }

        getMovies(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`, setGenres);
        
        reloadMovies();

    }, [currentPagination, order, triGenre, triYear]);

    let htmlPagination = [];
    for (let i = 1; i <= 10; i++) {
        htmlPagination.push(<li className={i === currentPagination ? 'active' : null} key={`li-${i}`} onClick={handlePagination}>{i}</li>);
    }
    
    return (
        <div className='mf-allmovies'>
            <div className="allmovies__filter-container">
                <div className="allmovies__filter-input-group">
                    <div className='mf-text'>Trier par : </div>
                    <Dropdown classTag={'order'} title={'Popularité'} array={orderArray} fnSetter={setOrder} all={false}/>
                </div>
                <div className="allmovies__filter-input-group">
                    <div className='mf-text'>Filtrer par :</div>
                    <Dropdown classTag={'genres'} title={'Genres'} array={genres} fnSetter={setTriGenre} all={true} />
                    <Dropdown classTag={'year'} title={'Année'} array={yearArray} fnSetter={setTriYear} all={true} />
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