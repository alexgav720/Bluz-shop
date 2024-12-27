import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from "../../styles/Sidebar.module.css"


const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories)

  // if (list === undefined) list = [{ id: 0, name: "gfjhhj" }]
  // console.log(list)

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {
            !list.data ? (<div />) : (
              list.data.slice(0, 5).map(({ documentId, name }) => (
                <li key={documentId}>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? styles.active : ""}`
                    }
                    to={`categories/${documentId}`}>
                    {name}
                  </NavLink>
                </li>
              ))
            )

          }
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/" className={styles.link}>Help</a>
        <a href="/" className={styles.link}>Bluz</a>
      </div>
    </section>
  )
}

export default Sidebar
