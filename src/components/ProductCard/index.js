import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

import './index.css'

function ProductCard(props) {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <motion.li
      className="product-item"
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.35, ease: 'easeOut'}}
      whileHover={{y: -4}}
    >
      <Link to={`/products/${id}`} className="link-item">
        <motion.img
          src={imageUrl}
          alt="product"
          className="thumbnail"
          loading="lazy"
          whileHover={{scale: 1.03}}
          transition={{type: 'spring', stiffness: 220, damping: 18}}
        />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </Link>
    </motion.li>
  )
}
export default ProductCard
