import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from "react-router-dom";
import RecordItem from '../../components/recordItem/RecordItem';
import styles from './item.module.css'
const Item = () => {
    const { id } = useParams()
    const { data, isLoading,isError } = useQuery({
        queryKey: ['item',id],
        queryFn: async () => {
            const data = await axios.get(`https://hn.algolia.com/api/v1/items/${id}`)
            return data
        }
    })

    if (isLoading) {
        return <>Loading....</>
    }
    if(isError){
        return <>Error</>
    }

    return (
        <div className={styles.itemContainer}>
            <RecordItem record={data?.data} />
        </div>
    )
}

export default Item
