import React from 'react';
import axios from 'axios';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton"
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCategory, setFilters } from '../redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { sortList } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

function Home (props) {
    const searchValue = useSelector((state) => state.filter.searchValue)
    const category = useSelector((state) => state.filter.category)
    const sortType = useSelector((state) => state.filter.sortType)
    const currentPage = useSelector((state) => state.filter.currentPage)

    const {items, status} = useSelector((state) => state.pizzas)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
   
   
    const onClickCategory = (categoryName) => {
        dispatch(setCategory(categoryName))
    }

    const getPizzas = async() => {
    
        dispatch(fetchPizzas({
            category,
            sortType,
            currentPage,
            searchValue
        }))
       
    }

    React.useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                sort: sortType.sort,
                category,
                currentPage
            })
            navigate(`?${queryString}`)
        }
         isMounted.current = true
    }, [category, sortType, searchValue, currentPage])

    React.useEffect(() => {
        if(window.location.search) {
            const param = qs.parse(window.location.search.substring(1))
            const sortType = sortList.find(el => el.sort === param.sort)
            
            dispatch(setFilters({
                ...param,
                sortType
            }))
            isSearch.current = true
        }
    }, [])

    React.useEffect(()=>{
        window.scrollTo(0,0)
        if(!isSearch.current) {
            getPizzas();
        }
        isSearch.current =false 
    }, [category, sortType, searchValue, currentPage])
    
 
    return (
        <div className="container">
            <div className="content__top">
                <Categories category={category} callback={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">All pizzas</h2>
            {status === 'error' ? (
                <div className="container">
                    <h1 className="content__error">An error occurred</h1>
                </div>) 
                : (<div className="content__items">
                    {status === 'loading'
                    ? [...new Array(8)].map((_, index) => {
                        return (
                        <PizzaBlockSkeleton key={index} />
                        );
                    })
                    : items.map((el) => {
                        return (
                        <PizzaBlock
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            price={el.price}
                            imgUrl={el.imageUrl}
                            sizes={el.sizes}
                            types={el.types}
                        />
                        );
                    })
            }        
            </div>)}
            
            <Pagination />
        </div>
    );
}

export default Home;