import React from 'react'

const MoviesCards = ({ cards, fnSet }) => {

    //console.log('cards', cards)

    const handleText = e => {
        console.log('TEXT : ', e.target.innerText)
    }

    return (
        <div className='moviescards__container'>
            {
                cards.map(({id, title, poster_path, release_date}) => (
                    <div className="moviescards__wrapper" key={id}>
                        <div className="img-wrapper">
                            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
                        </div>
                        <h3 onClick={handleText}>{title}</h3>
                        <div className="slider__movie-year mf-text">
                            {(release_date && release_date !== '') && release_date.split('-')[0]}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MoviesCards