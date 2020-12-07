import {BrowserRouter, Link, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div className='brand'>
            <Link to='/'>
                Aldonza
            </Link>
        </div>
        <div>
            <Link to="/cart">Carrito</Link>
            <Link to="/signin">Ingresa</Link>
        </div>
    </header>
    <main>
      <Route path='/product/:id' component={ProductScreen}></Route>
      <Route path='/' component={HomeScreen} exact></Route>
    </main>
    <footer className='row center'>
      All Right Reserver
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
