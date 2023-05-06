function testImage( userFileImage, userUrlImage ) {
  
  if ( userFileImage ) {
    if ( (userFileImage.type.includes('image/')) & userFileImage.size < (1024 * 1024) ){    
       return 'file'
    } else {
      toast("Archivo de imagen no valido", "#f75e25", "#ff4000")
      return 'none'
    }

  } else {
    if ( userUrlImage ) {
      return 'url'
    } else {
      toast("Archivo de imagen no valido, proporcione una url", "#f75e25", "#ff4000")
      return 'none'
    }
  }
}


function upload ( userFileImage, username ) {
  const imageData = new FormData()
  imageData.append('userFileImage', userFileImage)
  fetch(`http://localhost:${location.port}/session/register/img/${username}`, {
    method: 'POST',
    body: imageData
  })
  .then( response => {})
  .catch( error => {})
}