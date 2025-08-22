import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie'
import {AnimatePresence} from 'framer-motion'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {name: 'Clothing', categoryId: '1'},
  {name: 'Electronics', categoryId: '2'},
  {name: 'Appliances', categoryId: '3'},
  {name: 'Grocery', categoryId: '4'},
  {name: 'Toys', categoryId: '5'},
]

const sortbyOptions = [
  {optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)'},
  {optionId: 'PRICE_LOW', displayText: 'Price (Low-High)'},
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    filteredProductsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    try {
      const response = await fetch('/products.json')
      if (!response.ok) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const data = await response.json()

      const updatedData = data.products.map(product => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        imageUrl: product.image_url,
        rating: product.rating,
        category: product.category,
      }))

      this.setState(
        {productsList: updatedData, apiStatus: apiStatusConstants.success},
        this.applyFilters,
      )
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  applyFilters = () => {
    const {
      productsList,
      activeCategoryId,
      activeRatingId,
      searchInput,
      activeOptionId,
    } = this.state

    let filteredList = [...productsList]

    if (activeCategoryId) {
      filteredList = filteredList.filter(p => p.category === activeCategoryId)
    }

    if (activeRatingId) {
      filteredList = filteredList.filter(
        p => Math.floor(p.rating) >= parseInt(activeRatingId),
      )
    }

    if (searchInput) {
      filteredList = filteredList.filter(p =>
        p.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    }

    if (activeOptionId === 'PRICE_HIGH') {
      filteredList.sort((a, b) => b.price - a.price)
    } else if (activeOptionId === 'PRICE_LOW') {
      filteredList.sort((a, b) => a.price - b.price)
    }

    this.setState({filteredProductsList: filteredList})
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.applyFilters)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.applyFilters)
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.applyFilters)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput}, this.applyFilters)
  }

  enterSearchInput = () => this.applyFilters()

  clearFilters = () => {
    this.setState(
      {activeCategoryId: '', activeRatingId: '', searchInput: ''},
      this.applyFilters,
    )
  }

  renderProductsListView = () => {
    const {filteredProductsList, activeOptionId} = this.state
    const shouldShowProductsList = filteredProductsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          <AnimatePresence initial={false}>
            {filteredProductsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <TailSpin color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    // eslint-disable-next-line no-unused-vars
    const {activeCategoryId, activeRatingId, searchInput, activeOptionId} =
      this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
