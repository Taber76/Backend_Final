module.exports.validateUserData = (userData) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const imageFormat = /\.(jpe?g|png)$/i
  if (mailformat.test(userData.username) && imageFormat.test(userData.photo)) {
    return true
  }
  return false
}

module.exports.validateProductData = ( productData ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  if (ext.test(productData.thumbnail) && Object.values(productData).includes('')) {
    return true
  }
  return false
}