import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../service/AiModel';

// const PROMPT = '{positionTitle}, Depends on this position title give me 5-7 bullet-points for my experience in resume with a key bullet_points always';
const PROMPT = `Provide a detailed job description for the job title {positionTitle}. The response should always follow this JSON format with consistent keys, regardless of the job title: 
{
  "job_title": "[Job Title]",
  "job_summary": "Brief summary of the job role and purpose."
}`;

function RichTextEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState('');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateWorkSummaryFromAI = async () => {
    setLoading(true);

    // if (!resumeInfo.experience?.[index]?.title) {
    //   toast("Please add position title");
    //   setLoading(false);
    //   return;
    // }

    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience?.[index]?.title);

      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const responseObj = JSON.parse(responseText)
      console.log("Resp: ", responseObj )

      // let finalText = '';
      // responseObj.bullet_points.forEach(element => {
      //   finalText += element;
      // });

      setValue(responseObj.job_summary)
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          onClick={generateWorkSummaryFromAI}
          type="button"
          size="sm"
          className="border-primary text-primary flex gap-2"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          name='workSummery'
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
