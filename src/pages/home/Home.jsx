import React, { useState } from 'react'
import styles from './home.module.css'
import { FaAngleDown } from "react-icons/fa6";
import { BsDisplay } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from "react-router-dom";

import axios from 'axios';
import Pagination from '../../components/pagination/pagination';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const tags = searchParams.get("tags") || "story"; 
    
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const by = searchParams.get("by") || "relevance"
    const query = searchParams.get('query') || "";

    // Update searchParams
    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key); 
        }
        setSearchParams(newParams);
    };

    // Build the dynamic URL for the API
    const buildURL = () => {
        let baseURL;
        if (by === "relevance")
            baseURL = "https://hn.algolia.com/api/v1/search?";
        if (by === "date")
            baseURL = "https://hn.algolia.com/api/v1/search_by_date?";
        const params = new URLSearchParams({
            tags: tags || undefined,
            query: query,
            page: page.toString(),
        });
        return baseURL + params.toString();
    };

    const { data: posts, isLoading,isError } = useQuery({
        queryKey: ['posts', tags, page, by, query],
        queryFn: async () => {
            const data = await axios.get(buildURL())
            return data
        }
    })

    function yearsAgo(timestamp) {
        const currentDate = new Date(); 
        const createdDate = new Date(timestamp * 1000); 

        const yearsDifference = (currentDate - createdDate) / (1000 * 60 * 60 * 24 * 365.25); 

        return Math.floor(yearsDifference); 
    }


    const tagOptions = ["story", "comment", "poll", "pollopt", "show_hm", "ask_hn", "front_page"];
    const byOptions = ["relevance", "date"]

    if (isLoading) {
        return <>Loading.....</>
    }
    if(isError){
        return <>Something Went Wrong.....</>
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.searchContainer}>
                <span className={styles.flex}>
                    <span>Search</span>
                    <div className={styles.dropdown}>
                        <label>{tags}
                            <FaAngleDown style={{marginLeft:'5px'}} size={10} />
                        </label>
                        <ul>
                            {tagOptions.map((tag, index) => {
                                if (tags !== tag)
                                    return <li onClick={() => handleFilterChange("tags", tag)}
                                    >{tag}</li>
                            })}
                        </ul>
                    </div>
                </span>
                <span className={styles.flex}>
                    <span>By</span>
                    <div className={styles.dropdown}>
                        <label>{by}  
                            <FaAngleDown style={{marginLeft:'5px'}} size={10} />
                        </label>
                        <ul>
                            {byOptions.map((byOpt, index) => {
                                if (by !== byOpt)
                                    return <li key={index} onClick={() => handleFilterChange("by", byOpt)}
                                    >{byOpt}</li>
                            })}
                        </ul>
                    </div>
                </span>


            </div>
            {posts?.data?.hits.map((items, index) => {
                const yearsAgoResult = yearsAgo(items.created_at_i);
                return (<div className={styles.infoContainer} key={index}>
                    <Link to={`/item/${items.objectID}`}>
                        <div className={styles.titleurl}>
                            <span>{items.title || "No Title"}</span>
                            <a>({items.url || "URL"})</a>
                        </div>


                        <div className={styles.description}>
                            <span>{items.points} points</span>
                            <span>{items.author}</span>
                            <span>{yearsAgoResult} years</span>
                            <span>{items.num_comments || 0} comments</span>

                        </div>
                    </Link>

                </div>)
            })}
            <Pagination totalPages={posts?.data?.nbPages - 1} currentPage={page} handleFilterChange={handleFilterChange} />


        </div>
    )
}

export default Home
