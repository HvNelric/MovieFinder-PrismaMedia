export const getMovies = (url, fnSet, fnPage) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log('RES : ', response)
            response.genres ? fnSet(response.genres) : fnSet(response.results);
            fnPage && response ? fnPage(response.total_pages <= 10 ? response.total_pages : 10) : fnPage(0)
        })
        .catch(error => console.log('Erreur : ', error))
}