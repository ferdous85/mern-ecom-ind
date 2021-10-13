const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')
const router = require('express').Router()

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticatedUser,authorizedRoles('admin'),  createProduct)
router.route('/product/:id').put(isAuthenticatedUser,authorizedRoles('admin'),  updateProduct).delete(isAuthenticatedUser,authorizedRoles('admin'),  deleteProduct).get(getProductDetails)

router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview)




module.exports = router