'use client'
import Image from 'next/image'

const ImageWrapper = ({ src, width, height, className, alt }) => {
  return (
    <div className={`image-container ${className}`}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        style={{
          maxWidth: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  )
}

export default ImageWrapper