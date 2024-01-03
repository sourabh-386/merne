import React from 'react'
import style from './Background_blur.module.css'
import Education_op from '../EMP_DETAILS_COMP/Education_option/Education_op'
import { motion } from 'framer-motion'

const Background_blur = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.background}>
        {/* <Education_op/> */}
      </div>
    </motion.div>
  )
}

export default Background_blur