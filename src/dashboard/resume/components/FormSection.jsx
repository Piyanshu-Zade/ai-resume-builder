import React, { useContext, useState } from 'react';
import PersonalDetails from './forms/PersonalDetails';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import ViewResume from '../../../my-resume/resumeId/view';
import { Navigate, useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ThemeColor from './ThemeColor';

const FormSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)
  const { resumeId } = useParams();

  const handleTheme = () => {
    setResumeInfo({
      ...resumeInfo,
      themeColor: "#ff6666"
    })
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        {/* <Button variant="outline" size="sm" className="flex gap-2" onClick={handleTheme}>
          <LayoutGrid /> Theme
        </Button> */}
        <ThemeColor />
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="flex items-center"
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 items-center"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div>
        {/* personal details  */}

        {activeFormIndex === 1 ?
          <PersonalDetails enableNext={(v) => setEnableNext(v)} />
          : activeFormIndex === 2 ?
            <Summary enableNext={(v) => setEnableNext(v)} />
            : activeFormIndex === 3 ?
              <Experience />
              : activeFormIndex === 4 ?
                <Education />
                : activeFormIndex === 5 ?
                  <Skills />
                  : activeFormIndex === 6 ?
                    <Navigate to={'/my-resume/' + resumeId + '/view'} />
                    : null}
      </div>
    </div>
  );
};

export default FormSection;
