import React from 'react';

function Categories(props) {
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];
       
    return (
      <div className="categories">
        <ul>
            {
                categories.map((el, index) => {
                    return <li key={index} onClick={() => props.callback(el)} className={props.category === el ? 'active' : ''}>{el}</li>
                })
            }
          
        </ul>
      </div>
    );
}

export default Categories;