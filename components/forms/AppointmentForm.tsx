"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";





import CustomFormField from '../ui/CustomFormField';
import SubmitButton from '../ui/SubmitButton';
import { AppointmentFormValidation, CreateAppointmentSchema, getAppointmentSchema } from '@/lib/validation';
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '@radix-ui/react-select';
import Image from 'next/image';
import { createAppointment } from '@/lib/actions/appointment.actions';



  const AppointmentForm = ({
    userId,patientId, type
  }: {
    userId: string
    patientId: string
    type: "create" | "cancel" | "schedule";
  }) => {
    const router = useRouter();
    const [isLoading,setisLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);
      
  
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
      },
    });

   async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
setisLoading(true);  
let status;
switch(type){
    case 'schedule':
        status='scheduled';
        break;
    case 'cancel':
        status='cancelled';
        break;
        default:
            status='pending';
            break;
}
try{
    if(type === 'create' && patientId){
        const appointmentData = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule:new Date (values.schedule),
            reason: values.reason!,
            note: values.note,
            status: status as Status,
        }
        const appointment = await createAppointment(appointmentData)
if(appointment){
    form.reset();
    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
}
        
    }
 
} catch (error){
  console.log(error);
}
setisLoading(false)
 }
 let buttonLabel ;
 switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
      case 'create':
        buttonLabel = 'Create Appointment';
        break;
    case 'schedule':
    buttonLabel = 'Schedule Appointment';
    break;
    default:
        break;
 }
  
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment</p>
        </section>
        {type !== "cancel" && (
            <>
            <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label=" doctor"
          placeholder="Select a doctor"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  height={32}
                  width={32}
                  alt={doctor.name}
                  className='rounded-full border border-dark-500'
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label='expected appointment date'
          showTimeSelect
          dateFormat='MM/dd/yyyy - hh:mm aa'/>
          <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="reason for appointment"
            placeholder="enter reason for appointment"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="notes"
            label="notes"
            placeholder="Enter notes"
          />
          </div>
        </>
        )}
        {type === "cancel" && (<CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />)}

       

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ?
            'shad-danger-btn' : 'shad-primary-btn'	
        }w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
    )
}
export default AppointmentForm