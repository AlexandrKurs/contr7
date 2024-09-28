import burger from './assets/burger.png';
import hotdog from './assets/hotdog.png';
import fries from './assets/fries.png';
import cola from './assets/cola.png';
import tea from './assets/tea.png';
import coffee from './assets/coffee.png';
import './App.css';
import {useState} from "react";

interface Product {
    id: string;
    title: string;
    price: number;
    icon: string;
}

interface Props {
    key: string;
    product: Product;
    onClick: React.MouseEventHandler;
    cartItems: CartItem[];
    removeFromCart: (id: string) => void;
}

const PRODUCTS: Product[] = [
    {id: '1', title: 'Hamburger', price: 120, icon: burger},
    {id: '2', title: 'Hotdog', price: 180, icon: hotdog},
    {id: '3', title: 'Fries', price: 100, icon: fries},
    {id: '4', title: 'Cola', price: 50, icon: cola},
    {id: '5', title: 'Tea', price: 30, icon: tea},
    {id: '6', title: 'Coffee', price: 200, icon: coffee},
];

const ProductCard: React.FC<Props> = ({product, onClick}) => {
  return (
    <div className="card" style={{width:'350px', cursor: 'pointer'}} onClick={onClick}>
        <div className="card-body row">
            <div className="col">
                <img className="image" src={product.icon} alt={product.title + 'image'}/>
            </div>
            <div className="col-auto">
                <h5>{product.title}</h5>
                <p>Prive: {product.price} KGS</p>
            </div>
        </div>
    </div>
  );
};

const initialState: CartItem[] = PRODUCTS.map(product => {
    return {
        id: product.id,
        qty: 0,
    }
});

interface CartItem {
    id: string;
    qty: number;
}

const Cart: React.FC<Props> = ({cartItems, removeFromCart}) => {
  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

  const displayCartItems = cartItems.filter(item => item.qty > 0).map((cartItem) => {
    const product = PRODUCTS.find(p => p.id === cartItem.id);
    if (!product) {
        throw new Error ('Product not found.');
    }
    return {
        id: cartItem.id,
        product,
        qty: cartItem.qty,
        price: cartItem.qty * product.price,
    }
  });

  const totalPrice = displayCartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="card">
        <div className="card-body">
            {totalQty === 0 ? (
                <div>Order is empty!<br/>Please add some items!</div>
            ) : (
                <>
                    {displayCartItems.map((item) => (
                        <div key={item.id} className="row">
                            <div className="col">{item.product.title}</div>
                            <div className="col-auto">x {item.qty}<strong> {item.price} KGS</strong></div>
                            <div className="col-auto">
                                <button onClick={() => removeFromCart(item.id)}>X</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        Total Price: <strong>{totalPrice} KGS</strong>
                    </div>
                </>
            )}

        </div>
    </div>
  );
};

const App = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>(initialState);

  const addProductToCart = (id:string) => {
      setCartItems((prevState) => {
          return prevState.map(cartItem => {
              if (cartItem.id === id) {
                  return {...cartItem, qty: cartItem.qty + 1};
              }
              return cartItem;
          })
      });
  };

  const removeProductFromCart = (id: string) => {
      setCartItems((prevState ) => {
          return prevState.map(cartItem => {
              if (cartItem.id === id) {
                  return {...cartItem, qty: 0};
              }
              return cartItem;
          })
      })
  };

  return (
    <div className="container-fluid mt-4">
        <div className="row">
            <div className="col-6">
                <Cart cartItems = {cartItems} removeFromCart={removeProductFromCart}/>
            </div>
            <div className="col-6">
                <div className="card">
                    <div className="card-body d-flex flex-wrap gap-2">
                        {PRODUCTS.map(product => (
                            <ProductCard key={product.id} product={product} onClick={() => addProductToCart(product.id)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default App;
