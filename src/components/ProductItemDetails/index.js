import './index.css'
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: null, count: 1}

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    if (response.ok) {
      const updateData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({data: updateData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState({count: count - 1})
    }
  }

  onIncrease = () => {
    const {count} = this.state
    this.setState({count: count + 1})
  }

  renderProductDetails = () => {
    const {data, count} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      similarProducts,
      title,
      totalReviews,
    } = data

    const updateSimilarProducts = similarProducts.map(datas => ({
      availability: datas.availability,
      brand: datas.brand,
      description: datas.description,
      id: datas.id,
      imageUrl: datas.image_url,
      price: datas.price,
      rating: datas.rating,
      similarProducts: datas.similar_products,
      title: datas.title,
      totalReviews: datas.total_reviews,
    }))

    console.log(updateSimilarProducts)

    return (
      <div className="product-similar-container">
        <Header />
        <div className="pd-container">
          <img alt="product" src={imageUrl} className="pd-image" />
          <div className="d-container">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div className="review-container">
              <div className="review-container-star">
                <p>{rating}</p>
                <img
                  className="image-star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p className="des">{description}</p>
            <div className="a-b-container">
              <p>Available: </p>
              <p className="des">{availability}</p>
            </div>
            <div className="brand-border-down border-bottom a-b-container">
              <p>Brand: </p>
              <p className="des">{brand}</p>
            </div>
            <div className="button-container">
              <button
                className="but-id"
                data-testid="minus"
                onClick={this.onDecrease}
              >
                <BsDashSquare className="i-d-but" />
              </button>
              <p>{count}</p>
              <button
                data-testid="plus"
                onClick={this.onIncrease}
                className="but-id"
              >
                <BsPlusSquare className="i-d-but" />
              </button>
            </div>
            <button className="add-cart-button">ADD TO CART</button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-products-container">
          {updateSimilarProducts.map(products => (
            <SimilarProductItem key={products.id} products={products} />
          ))}
        </ul>
      </div>
    )
  }

  backToProductRoute = () => {
    const {history} = this.props
    history.push('/products')
  }

  renderProductFailure = () => (
    <div>
      <Header />
      <div className="failure-container">
        <img
          className="image-failure"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1 className="not-found-heading">Product Not Found</h1>
        <button onClick={this.backToProductRoute} className="failure-button">
          Continue Shopping
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetails()
      case apiStatusConstants.failure:
        return this.renderProductFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
