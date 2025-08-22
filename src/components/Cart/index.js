import {motion} from 'framer-motion'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

function Cart() {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        const removeAll = () => {
          removeAllCartItems()
        }
        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <motion.div
                  className="cart-content-container"
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.3}}
                >
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    className="remove-all-btn"
                    type="button"
                    onClick={removeAll}
                  >
                    Remove All
                  </button>
                  <CartListView />
                  <div className="cart-summary-container">
                    <CartSummary />
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Cart
