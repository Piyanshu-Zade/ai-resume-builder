import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi.js';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner"

const PersonalDetails = ({ enableNext }) => {

  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [])


  const handeInputChange = (e) => {
    enableNext(false)
    const { name, value } = e.target;

    setFormData({
      ...formData, [name]: value
    })
    setResumeInfo({
      ...resumeInfo, [name]: value
    })
  }

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true)

    const payload = {
      data: formData,
    };


    GlobalApi.UpdateResumeDetail(params?.resumeId, payload)
      .then((resp) => {
        enableNext(true);
        setLoading(false);
        toast("Details Updated")

      })
      .catch((error) => {
        console.error("Error occurred:", error.response?.data || error.message);
        setLoading(false);
      });
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm font-semibold'>First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handeInputChange} />
          </div>

          <div>
            <label className='text-sm font-semibold'>Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handeInputChange} />
          </div>

          <div className='col-span-2'>
            <label className='text-sm font-semibold'>Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handeInputChange} />
          </div>

          <div className='col-span-2'>
            <label className='text-sm font-semibold'>Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handeInputChange} />
          </div>

          <div>
            <label className='text-sm font-semibold'>Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handeInputChange} />
          </div>

          <div>
            <label className='text-sm font-semibold'>Email</label>
            <Input name="email" defaultValue={resumeInfo?.email} required onChange={handeInputChange} />
          </div>

        </div>

        <div className='mt-3 flex justify-end'>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>

        </div>
      </form>
    </div>
  )
}

export default PersonalDetails
