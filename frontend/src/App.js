import {BrowserRouter, Route} from 'react-router-dom'
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen'
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductScreen from './Screens/ProductScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SigninScreen from './Screens/SigninScreen';
import OrderScreenMP from './Screens/OrderScreenMP'
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import HeaderComponent from './Components/HeaderComponent';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

function App() {

  return (
    <BrowserRouter>
    <div className="grid-container">
    
    <header>
      <HeaderComponent/>
    </header>

    <main>
      <Route path='/product/:id' component={ProductScreen} exact></Route>
      <Route path='/product/:id/edit' component={ProductEditScreen} exact></Route>
      <Route path='/cart/:id?' component={CartScreen}></Route>
      <Route path='/signin' component={SigninScreen}></Route>
      <Route path='/register' component={RegisterScreen}></Route>
      <Route path='/shipping' component={ShippingAddressScreen}></Route>
      <Route path='/payment' component={PaymentMethodScreen}></Route>
      <Route path='/placeorder' component={PlaceOrderScreen}></Route>
      <Route path='/order/paypal/:id' component={OrderScreen}></Route>
      <Route path='/order/mercadopago/:id/:status?' component={OrderScreenMP}></Route>
      <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
      <PrivateRoute path='/profile' component={ProfileScreen}></PrivateRoute>
      <AdminRoute path='/productlist' component={ProductListScreen}></AdminRoute>
      <AdminRoute path='/orderlist' component={OrderListScreen}></AdminRoute>
      <Route path='/' component={HomeScreen} exact></Route>
    </main>
    <footer className='row center'>
      Aldonza Local Comercial - San Martin 667
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
