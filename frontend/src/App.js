import {BrowserRouter, Link} from 'react-router-dom'

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
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
        </div>
    </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
