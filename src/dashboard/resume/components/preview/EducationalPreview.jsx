import React from 'react'

const EducationalPreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>

    <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumeInfo?.themeColor }}>Education</h2>
    <hr className="border-[1.5px] my-2" style={{ borderColor: resumeInfo?.themeColor }} />

    {resumeInfo?.education.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>{education?.universityName}</h2>
          <h2 className='text-sm flex justify-between'>{education?.degree} in {education?.major}

          <span>
            {education?.startDate} - {education?.endDate}</span>

          </h2>

          <p className='text-xs mt-1 leading-4 text-justify'>{education?.description}</p>

        </div>  
      ))}

      
    </div>
  )
}

export default EducationalPreview