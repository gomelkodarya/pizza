import React from 'react';
import { setSortType } from '../redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux'



export const sortList = [
  {name: 'popularity', sort: 'rating'},
  {name: 'price (increasing)', sort: 'price'},
  {name: 'price (descending)', sort: '-price'},
  {name: 'alphabet', sort: 'title'}
]

function Sort() {
    const sortType = useSelector((state) => state.filter.sortType)
    const dispatch = useDispatch()
    const [openPopup, setOpenPopup] = React.useState(false)
    const sortRef = React.useRef();
  
    

    const onClickHandler = (item) => {
        dispatch(setSortType(item))
        setOpenPopup(false)
    }

    React.useEffect(() => {
      const handleClickOutside = (event) => {
    
        if(!event.composedPath().includes(sortRef.current)) {
          setOpenPopup(false)
        }
      }
      document.body.addEventListener('click', handleClickOutside)

      return () => {
        document.body.removeEventListener('click', handleClickOutside)
      }
    }, [])
    
    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Sort by:</b>
          <span onClick={() => (setOpenPopup(!openPopup))}>{sortType.name}</span>
        </div>
        { openPopup && (
            <div className="sort__popup">
                <ul>
                    {
                        sortList.map((item, index) => {
                            return <li key={index} onClick={() => (onClickHandler(item))} className={ sortType.name === item.name ? 'active' : ''}>{item.name}</li>
                        })
                    }
                
                </ul>
            </div>
        )}
      </div>
    );
}

export default Sort;