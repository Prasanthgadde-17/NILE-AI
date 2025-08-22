import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Header from '../Header'

import './index.css'

function Home() {
  return (
    <>
      <Header />
      <motion.div
        className="home-container"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.4}}
      >
        <motion.div
          className="home-content"
          initial={{y: 16, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.45, ease: 'easeOut'}}
        >
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <motion.img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="home-mobile-img"
            initial={{scale: 0.98, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.4}}
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <motion.button
              type="button"
              className="shop-now-button"
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
        <motion.img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-desktop-img"
          initial={{x: 30, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 0.5}}
        />
      </motion.div>
    </>
  )
}

export default Home
