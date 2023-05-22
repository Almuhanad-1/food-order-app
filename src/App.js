import { useContext } from 'react'
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContext from './store/CartContext'

function App() {
  const { showCart } = useContext(CartContext)

  return (
    <>
      {showCart && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
