import React, { useContext, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../service/GlobalApi';
import { toast } from 'sonner';


const ThemeColor = () => {

  const colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#36454F', '#008080', '#900C3F ', '#9a6324', '#FFC300', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ]

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [selectColor, setSelectColor] = useState('')
  const { resumeId } = useParams()
  
  const onColorSelect = (color) => {
    setSelectColor(color); 
  
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
  
    const data = {
      data: {
        themeColor: color, 
      },
    };
  
   
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        toast('Theme Updated'); 
      })
      .catch((err) => {
        toast.error('Failed to update theme');  
        console.error(err);
      });
  };
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((item, index) =>
          (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black 
              ${selectColor == item ? 'border-black' : 'border'}`}

              style={{
                background: item
              }}
            >

            </div>
          )
          )}
        </div>
      </PopoverContent>
    </Popover>

  )
}

export default ThemeColor