import React from 'react'
import { NavLink } from 'react-router-dom'
import "./landingPage.css"
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <header>
            <h2 className='logo'>pi</h2>
            <nav className='navigation'>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/create">Create</NavLink>
            </nav>
        </header>

        <section className='hero'>
            <div className='content'>
                <h3>Welcome to My Videogames PI</h3>
                <h1> Videogames & More</h1>
                <Link to="/home"><button >Take a look</button></Link>
            </div>
        </section>
    </div>
  )
}

export default LandingPage