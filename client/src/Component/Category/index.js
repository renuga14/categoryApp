import React, { useState ,useEffect} from 'react';
import './index.css';

const Category = () => {
  const [category,setCategory] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.categories); // Use this to render category list
      });
  }, []);
  
return (
    <div className="category-container">
      {category.map((item) => (
        <div key={item.id} className="category-item">
          <img src={item.image_url} alt={item.name} className="category-image" />
          <h3>{item.name}</h3>
          <p>Items: {item.item_count}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
