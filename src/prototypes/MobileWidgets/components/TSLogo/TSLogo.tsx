import React from 'react';

interface TSLogoProps {
  color?: string;
  size?: number;
}

const TSLogo: React.FC<TSLogoProps> = ({ color = '#FFFFFF', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="ThoughtSpot"
  >
    <path d="M47.4216 0H0V8.78311H47.4216V0Z" fill={color} />
    <path d="M47.4216 11.7108H29.4035V20.4939H47.4216V11.7108Z" fill={color} />
    <path d="M11.512 11.7108H0V20.4939H11.512C15.8132 20.4939 19.3192 23.9999 19.3192 28.3011V47.4216H28.1024V28.3011C28.1024 19.1566 20.6566 11.7108 11.512 11.7108Z" fill={color} />
    <path d="M38.4216 33.253C34.3554 33.253 31.0481 36.5603 31.0481 40.6265C31.0481 44.6928 34.3554 48 38.4216 48C42.4879 48 45.7951 44.6928 45.7951 40.6265C45.7951 36.5603 42.4879 33.253 38.4216 33.253Z" fill={color} />
  </svg>
);

export default TSLogo;
