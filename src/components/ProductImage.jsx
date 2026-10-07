/** Imagem de produto: foto (WebP responsivo) ou ilustração SVG. */
export default function ProductImage({ image, alt, sizes = '(min-width: 1080px) 33vw, (min-width: 700px) 50vw, 100vw', eager = false, className = '' }) {
  if (!image) return null;
  if (image.type === 'art') {
    return (
      <div className={`product-art ${className}`}>
        <img src={image.src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width="200" height="200" />
      </div>
    );
  }
  return (
    <img
      className={className}
      src={image.src}
      srcSet={`${image.small} 480w, ${image.src} 900w`}
      sizes={sizes}
      alt={alt}
      width="900"
      height="900"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
