import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {motion} from 'framer-motion'

import CartContext from '../../context/CartContext'

import './index.css'

function CartItem(props) {
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value
        const {cartItemDetails} = props
        const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
        const onRemoveCartItem = () => {
          removeCartItem(id)
        }
        const increaseQuantity = () => {
          incrementCartItemQuantity(id)
        }
        const decreaseQuantity = () => {
          decrementCartItemQuantity(id)
        }
        // TODO: Update the functionality to increment and decrement quantity of the cart item
        return (
          <motion.li
            className="cart-item"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.25}}
          >
            <img className="cart-product-image" src={imageUrl} alt={title} />
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <p className="cart-product-title">{title}</p>
                <p className="cart-product-brand">by {brand}</p>
              </div>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={decreaseQuantity}
                  data-testid="minus"
                  aria-label="Decrease quantity"
                >
                  <BsDashSquare color="#9CA3AF" size={14} />
                </button>
                <p className="cart-quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={increaseQuantity}
                  data-testid="plus"
                  aria-label="Increase quantity"
                >
                  <BsPlusSquare color="#9CA3AF" size={14} />
                </button>
              </div>
              <div className="total-price-remove-container">
                <p className="cart-total-price">Rs {price * quantity}/-</p>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveCartItem}
                  data-testid="remove"
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
              aria-label="delete"
            >
              <AiFillCloseCircle color="#9CA3AF" size={18} />
            </button>
          </motion.li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
