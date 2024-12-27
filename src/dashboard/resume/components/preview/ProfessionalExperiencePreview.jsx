import React from 'react'

const ProfessionalExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h2>

      <hr className="border-[1.5px] my-2" style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>{experience?.title}</h2>
          <h2 className='text-xs flex justify-between'>
            {experience?.companyName} , {experience?.city} , {experience?.state}

            <span className=''>
              {experience?.startDate} To {experience?.currentlyWorking ? 'present' : experience?.endDate}
            </span>
          </h2>

          {/* <p className='text-xs my-2'>{experience?.workSummery}</p> */}

          <div className='text-xs mt-1 leading-4 text-justify' dangerouslySetInnerHTML={{__html:experience?.workSummery}}></div>
        </div>
      ))}

    </div>
  )
}

export default ProfessionalExperiencePreview