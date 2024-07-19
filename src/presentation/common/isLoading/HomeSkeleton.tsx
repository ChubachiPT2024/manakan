import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const HomeSkeleton = () => {
  return (
    <>
      <div className="w-500">
        <Skeleton height={120} />
        <Skeleton animation="wave" height={120} />
        <Skeleton animation={false} height={120} />
      </div>
    </>
  )
}

export default HomeSkeleton
