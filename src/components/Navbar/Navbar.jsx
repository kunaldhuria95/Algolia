import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";
    const [searchText, setSearchText] = useState(queryParam);
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    useEffect(() => {
        setSearchText(queryParam);
    }, [queryParam]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set("query", value);
        } else {
            newParams.delete("query");
        }
        setSearchParams(newParams);
    };
    const logout = () => {
        localStorage.removeItem("user")
        navigate('/')

    }
    return (
        <div className={styles.navContainer}>
            <div className={styles.navbar}>
                <img src='./hlogo.png' />
            </div>
            {userInfo ? <h3> {userInfo.username}</h3> : <Link to="/" style={{color:'black'}}> <h3 style={{ marginRight: '2px', fontSize: '14px' }}>Search <br />Hacker News</h3></Link>}
            <div className={styles.inputContainer}>
                <div className={styles.searchContainer}>
                    <CiSearch fontSize={30} color='FF742B' />
                    <input type='text' placeholder='Search stories by title,url or author ' onChange={handleInputChange} value={searchText} />
                </div>
                <div className={styles.searchBy}>
                    <span>Search by</span>
                    <img src='./algosvg.svg' />
                </div>

            </div>
            {userInfo ? <div style={{ cursor: 'pointer' }} onClick={logout}> Logout</div> : <Link to="/login" style={{ color: 'black', padding: '5px' }}>Login</Link>}
        </div>
    )
}

export default Navbar