import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <p className='text-xs leading-4 text-justify'>
      {resumeInfo?.summery}
    </p>
  )
}

export default SummaryPreview