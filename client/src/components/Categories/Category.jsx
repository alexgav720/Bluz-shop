import React, { useEffect, useState } from 'react'

import styles from "../../styles/Category.module.css"
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../features/api/apiSlice'

import Products from "../Products/Products"
import { useSelector } from 'react-redux'

const Category = () => {
    const { id } = useParams()
    const { list } = useSelector(({ categories }) => categories)
    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 1000000,
    }
    const defaultParams = `?populate=*&filters[category][documentId][$eq]=${id}&filters[title][$containsi]=${defaultValues.title}&filters[price][$gt]=${defaultValues.price_min}&filters[price][$lt]=${defaultValues.price_max}`
    // const defaultParams = {
    //     category: list,
    //     limit: 5,
    //     offset: 0,
    //     defaultValues,
    // }

    const [values, setValues] = useState(defaultValues)
    const [params, setParams] = useState(defaultParams)
    const [items, setItems] = useState([])
    const [cat, setCat] = useState("")
    const [isEnd, setEnd] = useState(false)

    const { data, isLoading, isSuccess } = useGetProductsQuery(params);

    //типо начальная инициализация -_-
    useEffect(() => {
        if (!id) return;

        setItems([])
        setEnd(false)
        setValues(defaultValues)
        setParams(`?populate=*&filters[category][documentId][$eq]=${id}&filters[title][$containsi]=${values.title}&filters[price][$gt]=${values.price_min}&filters[price][$lt]=${values.price_max}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    //берём название категории
    useEffect(() => {
        if (!list.data) return
        if (!id || !list.data.length) return;

        const { name } = list.data.find((item) => item.documentId === id)
        setCat(name)
    }, [list, id])

    //заполняем массив отображаемых продуктов
    useEffect(() => {
        if (isLoading) return;
        if (!data.data.length) return setEnd(true)

        setItems((_items) => [..._items, ...data.data])
    }, [data, isLoading])
    
    
    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setItems([]);
        setEnd(false)
        // setParams({ ...defaultParams, ...values })
        setParams(`?populate=*&filters[category][documentId][$eq]=${id}&filters[title][$containsi]=${values.title}&filters[price][$gt]=${values.price_min}&filters[price][$lt]=${values.price_max}`)
    }
    
    const handleReset = () => {
        setValues(defaultValues)
        setParams(defaultParams)
        setEnd(false)
        setItems((_items) => [..._items, ...data.data])
    }

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{cat}</h2>

            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input
                        type="text"
                        name='title'
                        onChange={handleChange}
                        placeholder='Product name'
                        value={values.title}
                    />
                </div>

                <div className={styles.filter}>
                    <input
                        autoComplete='off'
                        type="number"
                        name='price_min'
                        onChange={handleChange}
                        placeholder='0'
                        value={values.price_min}
                        min="0"
                    />
                    <span>Price from</span>
                </div>

                <div className={styles.filter}>
                    <input
                        type="number"
                        name='price_max'
                        onChange={handleChange}
                        placeholder='0'
                        value={values.price_max}
                        min="0"
                    />
                    <span>Price to</span>
                </div>

                <button type='submit' hidden></button>
            </form>

            {isLoading ? (
                <div className={styles.preloader}>Loading...</div>
            ) : !isSuccess || !items.length ? (
                <div className={styles.back}>
                    <span>No results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products
                    title=""
                    products={items}
                    style={{ padding: 0 }}
                    amount={items.length}
                />
            )}
            {!isEnd && (

                <div className={styles.more}>
                    <button onClick={() => {
                        // setParams({ ...params, offset: params.offset + params.limit })
                    }}>
                        See more
                    </button>
                </div>
            )
            }
        </section>
    )
}

export default Category
