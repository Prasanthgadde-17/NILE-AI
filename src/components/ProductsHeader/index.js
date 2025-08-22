import {BsFilterRight} from 'react-icons/bs'
import {motion} from 'framer-motion'

import './index.css'

function ProductsHeader(props) {
  const {sortbyOptions, activeOptionId} = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  return (
    <motion.div
      className="products-header"
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}
    >
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  )
}

export default ProductsHeader
