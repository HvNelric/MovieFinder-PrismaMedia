import './App.scss';
import AllMovies from './components/AllMovies/AllMovies';
import Header from './components/Header/Header';
import Slider from './components/Slider/Slider';

function App() {
    return (
        <div className='mf-container'>
            <Header />
            <h2>Les 10 meilleurs films</h2>
            <Slider />
            <h2>Tous les films</h2>
            <AllMovies />
        </div>
    );
}

export default App;
