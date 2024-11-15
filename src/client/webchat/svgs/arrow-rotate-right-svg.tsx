import React from 'react'

import { colors } from '../constants-styles'

export const ArrowRotateRightSvg = () => {
  return (
    <svg
      width='14'
      height='13'
      viewBox='0 0 14 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.5625 0.84375V5.21875C13.5625 5.60156 13.2617 5.875 12.9062 5.875H8.53125C8.14844 5.875 7.875 5.60156 7.875 5.21875C7.875 4.86328 8.14844 4.5625 8.53125 4.5625H11.2656C10.4453 3.00391 8.80469 1.9375 7 1.9375C4.32031 1.9375 2.1875 4.09766 2.1875 6.75C2.1875 9.42969 4.32031 11.5625 7 11.5625C8.12109 11.5625 9.21484 11.1797 10.0625 10.4688C10.3359 10.2227 10.7461 10.2773 10.9922 10.5508C11.2109 10.8242 11.1836 11.2344 10.9102 11.4805C9.81641 12.3828 8.42188 12.875 6.97266 12.875C3.60938 12.875 0.875 10.1406 0.875 6.75C0.875 3.38672 3.60938 0.652344 6.97266 0.652344C9.16016 0.652344 11.1562 1.82812 12.25 3.63281V0.84375C12.25 0.488281 12.5234 0.1875 12.9062 0.1875C13.2617 0.1875 13.5625 0.488281 13.5625 0.84375Z'
        fill={colors.neutral[500]}
      />
    </svg>
  )
}
