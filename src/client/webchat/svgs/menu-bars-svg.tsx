import React from 'react'

interface MenuBarsSvgProps {
  idBase?: string
}

export const MenuBarsSvg = ({ idBase }: MenuBarsSvgProps) => {
  return (
    <svg
      id={`${idBase as string}-svg`}
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id={`${idBase as string}-svg-path`}
        d='M0.340976 1.43164C0.340976 0.767578 0.887851 0.181641 1.59098 0.181641H16.591C17.255 0.181641 17.841 0.767578 17.841 1.43164C17.841 2.13477 17.255 2.68164 16.591 2.68164H1.59098C0.887851 2.68164 0.340976 2.13477 0.340976 1.43164ZM0.340976 7.68164C0.340976 7.01758 0.887851 6.43164 1.59098 6.43164H16.591C17.255 6.43164 17.841 7.01758 17.841 7.68164C17.841 8.38477 17.255 8.93164 16.591 8.93164H1.59098C0.887851 8.93164 0.340976 8.38477 0.340976 7.68164ZM16.591 15.1816H1.59098C0.887851 15.1816 0.340976 14.6348 0.340976 13.9316C0.340976 13.2676 0.887851 12.6816 1.59098 12.6816H16.591C17.255 12.6816 17.841 13.2676 17.841 13.9316C17.841 14.6348 17.255 15.1816 16.591 15.1816Z'
        fill='white'
      />
    </svg>
  )
}
