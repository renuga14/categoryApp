import React, { useState } from 'react';
import Category from '../Category';
import './index.css';

const Sidebar = () => {
  const [showCategory, setShowCategory] = useState(true);

  const handleClick = () => {
    setShowCategory(true);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-left">
        <h2>Menu</h2>
        <button onClick={handleClick}>Category</button>
      </div>
      <div className="sidebar-right">
        {showCategory && <Category />}
      </div>
    </div>
  );
};

export default Sidebar;
