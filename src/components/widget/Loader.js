import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="20"
      width="20"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
    />
  )
}

export default Loader