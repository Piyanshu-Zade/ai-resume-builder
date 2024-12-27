import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../service/GlobalApi.js';
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from "sonner"
import { AIChatSession } from "../../../../../service/AiModel.js";

const prompt = `Job Title: {jobTitle}, Depends on job title give me summery for my resume within 7-8 lines in JSON format with field experience Level and Summary with Experience_level for Fresher, Mid-Level, Experienced, and the json format should always be like this: 
{
  summary: {
    0: {
    "Experience_level": "Fresher",
    "Summary": "Highly motivated and detail-oriented Front End Developer with a foundational grasp of HTML, CSS, and JavaScript. Eager to learn and contribute to web development projects, applying academic knowledge to create user-friendly interfaces. Possesses a strong desire to develop practical skills and is a quick learner. Ready to collaborate within a team environment and seeking opportunities to grow in the field."
}, 
1: {
  {
    "Experience_level": "Mid-Level",
    "Summary": "Highly motivated and detail-oriented Front End Developer with a foundational grasp of HTML, CSS, and JavaScript. Eager to learn and contribute to web development projects, applying academic knowledge to create user-friendly interfaces. Possesses a strong desire to develop practical skills and is a quick learner. Ready to collaborate within a team environment and seeking opportunities to grow in the field."
}
}
  }
}`

const Summary = ({ enableNext }) => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summery, setSummery] = useState('')
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([])

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo, summery: summery
      })
    }
  }, [summery])

  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const parsedData = JSON.parse(result.response.text());

      console.log("parsed data", Array.isArray(parsedData))
      const arrayData = Array.isArray(parsedData) ? parsedData : Object.values(parsedData.summary || {});
      setAiGeneratedSummeryList(arrayData);
      console.log("ai sum", Array.isArray(aiGeneratedSummeryList))
    } catch (error) {
      console.error("Error parsing AI response:", error);
      setAiGeneratedSummeryList([]);
    }
    setLoading(false);
  }
  console.log("Ai summary", aiGeneratedSummeryList)

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)

    const payload = {
      data: {
        summery: summery,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, payload)
      .then((resp) => {
        enableNext(true);
        setLoading(false);
        toast("Summery Updated")
      })
      .catch((error) => {
        console.error("Error occurred:", error.response?.data || error.message);
        setLoading(false);
      });
  }
console.log("aiGeneratedSummeryList length", aiGeneratedSummeryList)
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant="outline" onClick={() => GenerateSummeryFromAI()} type="button" size="sm" className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4' /> Generate from AI</Button>
          </div>
          <Textarea className="mt-5" required onChange={(e) => setSummery(e.target.value)} />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className='my-5'>
          <h2 className='font-bold text-lg text-primary'>Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => 
          (
            <div key={index}
              onClick={() => setSummery(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
              <h2 className='font-bold my-1 text-primary'>Level: {item?.Experience_level || "Not Available"}</h2>
              <p>{item?.Summary || "No summary available."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summary
