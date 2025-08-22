import {motion} from 'framer-motion'
import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'
import Header from '../Header'

import './index.css'

function Products() {
  return (
    <>
      <Header />
      <motion.div
        className="product-sections"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.35}}
      >
        <PrimeDealsSection />
        <AllProductsSection />
      </motion.div>
    </>
  )
}

export default Products
