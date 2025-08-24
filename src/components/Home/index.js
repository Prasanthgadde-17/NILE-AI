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
          <h1 className="home-heading">Fashion That Gets You Seen</h1>
          <motion.img
            src="/img/first.jpg"
            alt="clothes that get you noticed"
            className="home-mobile-img"
            initial={{scale: 0.98, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.4}}
          />
          <p className="home-description">
            Fashion is ever-changing, but true style is timeless. Every piece
            you wear speaks of confidence, elegance, and power. Discover
            collections designed to make you noticed, remembered, and
            celebrated.
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
          src="/img/first.jpg"
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
