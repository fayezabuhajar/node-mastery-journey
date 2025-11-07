import express from 'express';
import { generateFakeProduct } from './Utils/fakeData';
import ProductCotroller from './controller/productController';
import ProductService from './services/ProductService';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// endpoints
const fakeProductsData = generateFakeProduct();
const productsService =  new ProductService(fakeProductsData);
const ProductController = new ProductCotroller(productsService);




app.get('/products', (req, res) => ProductController.getAllProducts(req, res));
app.get('/products/:id', (req, res) => ProductController.getProductById(req, res));
app.post('/products', (req, res) => ProductController.createProduct(req, res));
app.patch('/products/:id', (req, res) => ProductController.updateProduct(req, res));
app.delete('/products/:id', (req, res) => ProductController.deleteProduct(req, res));


const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});