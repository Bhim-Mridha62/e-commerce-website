import React, { useEffect, useState } from 'react';

const ProductCategories = () => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        const uniqueCategories = extractCategories(data);
        console.log(uniqueCategories,"data");
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const extractCategories = (data) => {
      const uniqueCategories = {};

      data.products.forEach((product) => {
        const { category, thumbnail } = product;
        if (!uniqueCategories.hasOwnProperty(category)) {
          uniqueCategories[category] = thumbnail;
        }
      });

      return uniqueCategories;
    };

    fetchData();
  }, []);
  console.log(categories);
  return (
    <div>
      <h2>Product Categories</h2>
      <ul>
        {Object.entries(categories).map(([category, thumbnail]) => (
          <li key={category}>
            <strong>{category}</strong>: <img src={thumbnail} alt={`${category} thumbnail`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
