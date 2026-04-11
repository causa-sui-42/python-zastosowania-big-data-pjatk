import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface DocImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export default function DocImage({ src, alt, style }: DocImageProps): JSX.Element {
  return <img src={useBaseUrl(src)} alt={alt} style={style} />;
}
