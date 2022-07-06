export const getMovies = (url, fnSet) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            response.genres ? fnSet(response.genres) : fnSet(response.results);
        })
        .catch(error => console.log('Erreur : ', error))
}