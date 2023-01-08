import { useMediaQuery, useTheme } from '@mui/material'

const useResponsive = (params) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme?.breakpoints?.down('sm'))
  const isTablet = useMediaQuery(theme?.breakpoints?.between('sm', 'md'))

  return [isMobile, isTablet]
}

export default useResponsive
