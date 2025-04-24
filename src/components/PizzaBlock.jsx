import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addPizza } from '../redux/slices/cartSlice';

function PizzaBlock(props) {
    const [activeType, setActiveType] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);
    const items = useSelector(state => state.cart.items);
    const pizza = useSelector(state => state.cart.items.find((obj) => obj.id == props.id ));
    const dispatch = useDispatch();
    console.log(items);

    const addedPizzaCount = pizza ? pizza.count : 0;
  
    const addPizzaHandler = () => {
      const item = {
          id: props.id,
          title: props.title,
          imageUrl: props.imgUrl,
          price: props.price,
          type: activeType === 0 ? 'thin' : 'traditional',
          size: props.sizes[activeSize],
          count: 0,
      }
      console.log(items)
      dispatch(addPizza(item))
    }
    const onClickActiveType = (type) => {
        setActiveType(type)
    }
    const onClickActiveSize = (sizeIndex) => {
        
        setActiveSize(sizeIndex)
    }

    return (
        <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={props.imgUrl}
                alt="Pizza"
              />
              <h4 className="pizza-block__title">{props.title}</h4>
              <div className="pizza-block__selector">
                <ul>
                    {props.types.map((i)=>{
                        return <li key={i} onClick={() => onClickActiveType(i)} className={activeType === i ? 'active' : ''}>{i===0 ? 'thin' : 'traditional'}</li>
                    })}
                </ul>
                <ul>
                    {props.sizes.map((item, index)=>{
                        return <li key={index} onClick={() => onClickActiveSize(index)} className={activeSize === index ? 'active' : ''}>{item} cm</li>
                    })}
                </ul>
              </div>
              <div className="pizza-block__bottom">
                <div className="pizza-block__price">from {props.price} $</div>
                <div onClick={addPizzaHandler} className="button button--outline button--add">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                      fill="white"
                    />
                  </svg>
                  <span>Add</span>
                  {addedPizzaCount>0 && <i>{addedPizzaCount}</i>}
                </div>
              </div>
            </div>
    );
}

export default PizzaBlock;