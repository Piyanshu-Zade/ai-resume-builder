import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreview = () => {

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
  
  return (
    <div className='shadow-lg h-full p-14'>
      {/* Personal details  */}
        <PersonalDetailsPreview resumeInfo={resumeInfo}/>
      {/* Summary  */}
        <SummaryPreview resumeInfo={resumeInfo}/>
      {/* Professional Experience  */}
        <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>
      {/* Education  */}
        <EducationalPreview resumeInfo={resumeInfo}/>
      {/* Skills  */}
        <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview