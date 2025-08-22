import CartContext from '../../context/CartContext'
import './index.css'

function CartSummary() {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let totalCost = 0
        let totalItems = 0
        cartList.map(eachItem => {
          totalCost += eachItem.price * eachItem.quantity
          totalItems += 1
          return null
        })
        return (
          <div className="cart-summary-sub-container">
            <h1 className="order-total-text">
              Order Total: <span className="cost-text">Rs {totalCost}/-</span>
            </h1>
            <p className="total-items-text">{totalItems} items in cart</p>
            <button className="check-out-btn" type="button">
              Checkout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
