import express from 'express';
import { generateFakeProduct } from './Utils/fakeData';
import IProduct from './interfaces/IProducts';
import ProductCotroller from './controller/productController';
import ProductService from './services/ProductService';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// endpoints
const fakeProductsData = generateFakeProduct();

const productsService =  new ProductService();

const ProductController = new ProductCotroller(productsService);




app.get('/products', (req, res) => {

    return res.send(ProductController.getAllProducts());
    // filter by keyOf IProduct
    // const filterQuery = req.query.filter as string;

    // if (filterQuery) {
    //     const propertiesToFilter = filterQuery.split(',') 

    //     let filteredProducts: any[] = [];

    //     filteredProducts = fakeProductsData.map(product => {
    //         const filteredProduct: any = {};
    //         propertiesToFilter.forEach(prop => {
    //             if (product.hasOwnProperty(prop as keyof IProduct)) {
    //                 filteredProduct[prop] = product[prop as keyof IProduct];
    //             }
    //         });
    //         return { id: product.id, ...filteredProduct };
    //     });

    //     return res.send(filteredProducts);
    // } else {
    //     return res.send(fakeProductsData);
    // }
});

app.get('/products/:id', (req, res) => {
    console.log(req.params);
    
    const productId = +req.params.id;
    if (isNaN(productId)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }

    const findProduct = fakeProductsData.find(p => p.id === productId);

    if (findProduct) {
        return res.send(findProduct);
    }
    else {
        return res.status(404).send({ error: 'Product not found' });
    }
});


app.post('/products', (req, res) => {
    const newProduct = req.body;

    fakeProductsData.push({ id: fakeProductsData.length + 1, ...newProduct });
    return res.status(201).send({
        id: fakeProductsData.length,
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
    });
});

app.patch('/products/:id', (req, res) => {
    const productId = +req.params.id;

    if (isNaN(productId)) {
        return res.status(404).send({ error: 'Invalid product ID' });
    }

    const productBody = req.body;

    const productIndex: number | undefined = fakeProductsData.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        fakeProductsData[productIndex] = { ...fakeProductsData[productIndex], ...productBody };
        return res.status(200).send({ product: fakeProductsData[productIndex], message: "Product updated successfully" });
    }
    
    else {
        return res.status(404).send({ error: 'Product not found' });
    }
});

app.delete('/products/:id', (req, res) => {
    const productId = +req.params.id;

    if (isNaN(productId)) {
        return res.status(404).send({ error: 'Invalid product ID' });
    }

    const productIndex: number | undefined = fakeProductsData.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        const filteredProduct = fakeProductsData.filter(p => p.id !== productId);
        return res.status(200).send({ filteredProduct , message: "Product deleted successfully" });
    }

    else {
        return res.status(404).send({ error: 'Product not found' });
    }

});


const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});