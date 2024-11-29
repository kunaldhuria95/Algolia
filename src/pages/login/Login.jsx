import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom';
const login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem("user")
    if (check) {
      navigate("/")
    }
  }, [])



  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100vw', height: '100vh', background: 'F6F6EF' }}>
      <h3 style={{ marginBlock: '30px' }}>Login</h3>

      <div >
        <form className={styles.loginContainer} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleInputChange} placeholder="Enter your username" required />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
        </form>

      </div>
    </div>
  )
}

export default login