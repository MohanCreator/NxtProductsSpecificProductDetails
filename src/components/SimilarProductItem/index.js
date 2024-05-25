import './index.css'

const SimilarProductItem = props => {
  const {products} = props
  const {imageUrl, totalReviews, title, brand, price, rating} = products

  return (
    <li className="each-similar-container">
      <img alt="similar product" className="similar-image" src={imageUrl} />
      <h1 className="heading-similar">{title}</h1>
      <p>by {brand}</p>
      <div className="rup-rating-container">
        <p className="price">Rs {price}/-</p>
        <div className="review-container-star">
          <p>{rating}</p>
          <img
            className="image-star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
