import burger from './assets/burger.png';
import hotdog from './assets/hotdog.png';
import fries from './assets/fries.png';
import cola from './assets/cola.png';
import tea from './assets/tea.png';
import coffee from './assets/coffee.png';

interface Product {
    id: string;
    title: string;
    price: number;
    icon: string;
}

interface Props {
    product: Product;
}

const PRODUCTS: Product[] = [
    {id: '1', title: 'Hamburger', price: 120, icon: burger},
    {id: '2', title: 'Hotdog', price: 180, icon: hotdog},
    {id: '3', title: 'Fries', price: 100, icon: fries},
    {id: '4', title: 'Cola', price: 50, icon: cola},
    {id: '5', title: 'Tea', price: 30, icon: tea},
    {id: '6', title: 'Coffee', price: 200, icon: coffee},
];

const ProductCard: React.FC<Props> = ({product}) => {
  return (
    <div className="card">
        <div className="card-body row">
            <div className="col">
                <img src={product.icon} alt={product.title + 'image'}/>
            </div>
            <div className="col-auto">
                <h5>{product.title}</h5>
                <p>Prive: {product.price} KGS</p>
            </div>
        </div>
    </div>
  );
};

const App = () => {

  return (
    <div className="container-fluid mt-4">
        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-body">
                        {PRODUCTS.map(product => (
                            <div className="card" key={product.id}>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-9">
                <div className="card">
                    <div className="card-body">
                        {PRODUCTS.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default App;
