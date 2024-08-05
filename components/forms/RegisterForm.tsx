"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";





import CustomFormField from '../ui/CustomFormField';
import SubmitButton from '../ui/SubmitButton';
import { UserFormValidation } from '@/lib/validation';
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Doctors, GenderOptions } from '@/constants';
import { Label } from '@radix-ui/react-label';
import { SelectItem } from '@radix-ui/react-select';
import Image from 'next/image';



  const RegisterForm = ({ user } : { user:User}) => {
    const router = useRouter();
    const [isLoading,setisLoading] = useState(false);
      
  
    const form = useForm<z.infer<typeof UserFormValidation>>({
      resolver: zodResolver(UserFormValidation),
      defaultValues: {
       name: "",
       email: "",
       phone: "",
      },
    });

   async function onSubmit({ name,email,phone}: z.infer<typeof UserFormValidation>) {
setisLoading(true);  
console.log("inside onsubmit")
try{
  const userData = { name,email,phone }

  const user = await createUser(userData);
  if(user) router.push(`/patients/${user.$id}/register`)
} catch (error){
  console.log(error);
}
 }
  
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="mb-12 space-y-4">
          <h1 className="header">welcome</h1>
          <p className="text-dark-700">let us know more about yourself</p>
        </section>
        <section className="mb-12 space-y-6">
            <div className='mb-9 space-y-1'>

            </div>
          <h2 className="sub-header">personal information</h2>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="bruce"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="bruce@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        </div>
<div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="date of birth"
         
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
renderSkeleton={(field) =>(
    <FormControl>
        <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange={field.onChange}
        defaultValue={field.value}> 
            {GenderOptions.map((option) => (
    <div key={option}
    className='radio-group'>
        <RadioGroupItem value={option}
        id={option}/>
        <Label htmlFor={option}
        className='cursor-pointer'>
            {option}
        </Label>

    </div>
))}        </RadioGroup>

    </FormControl>
)}        />
</div>

<div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="address"
          placeholder="xxx yyyy"
        
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label="Occupation"
          placeholder="software engineer"
         
        />
</div>
<div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergency contact name"
          label="emergency contact name"
          placeholder="Guardian's name"
         
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergency contact number"
          label=" mergency contact Phone number"
          placeholder="(555) 123-4567"
        />

</div>
<section className="mb-12 space-y-6">
            <div className='mb-9 space-y-1'>

            </div>
          <h2 className="sub-header">medical information</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryphysician"
          label="primary physician "
          placeholder="select a physician"
        >
            {Doctors.map((doctor) => (
              <SelectItem  key={doctor.name} value={doctor.name}>
                <div className='flex cursor-pointer items-center gap-2'>
                    <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full
                    border border-dark-500"/>
                    <p>{doctor.name}</p>

                </div>
                </SelectItem>
            ))}
          </CustomFormField>
<div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insuranceProvider"
          label="Insurance provider"
          placeholder="blue cross"
        
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insurancepolicynumber"
          label="insurance policy number"
          placeholder="ABCD1234567890"
         
        />
        </div>
        <div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="allergies"
          label="Allergies (if any)"
          placeholder="blue cross"
        
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="Current Medication (if any)  "
          placeholder="paracetamol 500mg"
         
        />
</div>
<div className='flex flex-col gap-6 xl:flex-row'>
<CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="family medical history"
          label="Family Medical History (if any)"
          placeholder="mother had issues"
        
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="pastmedicalhistory"
          label="past medical history  "
          placeholder="appendectomy, Tonsillectomy"
         
        />
</div>
<section className="mb-12 space-y-6">
            <div className='mb-9 space-y-1'>

            </div>
          <h2 className="sub-header"> identification and verification</h2>
        </section>
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
    )
}
export default RegisterForm
