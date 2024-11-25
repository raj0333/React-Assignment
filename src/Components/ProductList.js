import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../Components/ProductItem';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch products using axios
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial filtered products
      })
      .catch(error => console.error(error));
  }, []);

  // Filter products by category
  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  // Sort products by price
  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === 'asc') return a.price - b.price;
      if (order === 'desc') return b.price - a.price;
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className='filters'>
      <div>
        <button onClick={() => filterByCategory('all')}>All</button>
        <button onClick={() => filterByCategory('men clothing')}>Men's Clothing</button>
        <button onClick={() => filterByCategory('women clothing')}>Women's Clothing</button>
        <button onClick={() => filterByCategory('jewelery')}>Jewelery</button>
        <button onClick={() => filterByCategory('electronics')}>Electronics</button>
      </div>

      <div>
        <button onClick={() => sortProducts('asc')}>Sort by Price (Low to High)</button>
        <button onClick={() => sortProducts('desc')}>Sort by Price (High to Low)</button>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
