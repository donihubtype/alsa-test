import React from 'react'

import { colors } from '../constants-styles'

export const RightFromBracketSvg = () => {
  return (
    <svg
      width='14'
      height='13'
      viewBox='0 0 14 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.59375 11.5625H2.625C1.88672 11.5625 1.3125 10.9883 1.3125 10.25V3.25C1.3125 2.53906 1.88672 1.9375 2.625 1.9375H4.59375C4.94922 1.9375 5.25 1.66406 5.25 1.28125C5.25 0.925781 4.94922 0.625 4.59375 0.625H2.625C1.14844 0.625 0 1.80078 0 3.25V10.25C0 11.7266 1.14844 12.875 2.625 12.875H4.59375C4.94922 12.875 5.25 12.6016 5.25 12.2188C5.25 11.8633 4.94922 11.5625 4.59375 11.5625ZM13.7539 6.28516L9.59766 2.62109C9.32422 2.375 8.94141 2.32031 8.61328 2.45703C8.28516 2.62109 8.09375 2.92188 8.09375 3.27734V4.80859H4.8125C4.18359 4.80859 3.71875 5.27344 3.71875 5.90234V7.65234C3.71875 8.25391 4.18359 8.74609 4.8125 8.74609H8.09375V10.25C8.09375 10.6055 8.28516 10.9062 8.61328 11.0703C8.72266 11.125 8.85938 11.1523 8.99609 11.1523C9.21484 11.1523 9.43359 11.0703 9.59766 10.9062L13.7539 7.26953C13.918 7.13281 14 6.96875 14 6.77734C14 6.58594 13.918 6.42188 13.7539 6.28516ZM9.40625 9.32031V7.40625H5.03125V6.09375H9.40625V4.17969L12.332 6.75L9.40625 9.32031Z'
        fill={colors.neutral[500]}
      />
    </svg>
  )
}