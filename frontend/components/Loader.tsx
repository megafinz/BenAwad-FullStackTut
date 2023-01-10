import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

interface Props {
  variant?: 'light' | 'dark'
}

export default function Loader({ variant = 'dark' }: Props) {
  return (
    <MotionDiv
      border={variant === 'light' ? 'dashed #fff' : 'dashed #0af'}
      borderRadius="50%"
      w="1.5rem"
      h="1.5rem"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      // @ts-ignore
      transition={{
        repeatType: 'loop',
        repeat: Infinity,
        duration: 0.5,
        ease: 'linear'
      }}
    />
  )
}
