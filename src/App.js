import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Error from './components/Error/Error';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='mt-20 lg:mt-40'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<Error/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
