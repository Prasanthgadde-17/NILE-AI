import {useState, useMemo} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

function App() {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList
        .map(eachItem => {
          if (eachItem.id === id) {
            if (eachItem.quantity === 1) {
              return null // Will be filtered out
            }
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return eachItem
        })
        .filter(item => item !== null),
    )
  }

  const removeCartItem = id => {
    setCartList(prevCartList =>
      prevCartList.filter(eachItem => eachItem.id !== id),
    )
  }

  const addCartItem = product => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product)
      return
    }

    setCartList(prevCartList => {
      const existingItem = prevCartList.find(item => item.id === product.id)
      if (existingItem) {
        return prevCartList.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + (product.quantity || 1),
            }
          }
          return item
        })
      }
      return [...prevCartList, {...product, quantity: product.quantity || 1}]
    })
  }

  const contextValue = useMemo(
    () => ({
      cartList,
      addCartItem,
      removeCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeAllCartItems,
    }),
    [cartList],
  )

  return (
    <CartContext.Provider value={contextValue}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/products"
          element={<ProtectedRoute component={Products} />}
        />
        <Route
          path="/products/:id"
          element={<ProtectedRoute component={ProductItemDetails} />}
        />
        <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App
