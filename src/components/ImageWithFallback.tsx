import React, { useEffect, useRef, useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageWithFallback({ src, onError, ...props }: ImageWithFallbackProps) {
  const [source, setSource] = useState(src);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (source && imageRef.current?.complete && imageRef.current.naturalWidth === 0) setSource("/images/image.png");
  }, [source]);

  return <img {...props} ref={imageRef} src={source} referrerPolicy="no-referrer" onError={(event) => { onError?.(event); event.currentTarget.onerror = null; setSource("/images/image.png"); }} />;
}
