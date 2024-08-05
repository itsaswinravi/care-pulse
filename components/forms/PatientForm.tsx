"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";





import CustomFormField from '../ui/CustomFormField';
import SubmitButton from '../ui/SubmitButton';
import { UserFormValidation } from '@/lib/validation';
import { create } from 'domain';
import { createuser } from "@/lib/actions/patient.actions";
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
  }



  const PatientForm = () => {
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
try{
  const userData = { name,email,phone }

  const user = await createuser(userData);
  if(user) router.push(`/patients/${user.$id}/register`)
} catch (error){
  console.log(error);
}
 }
  
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="bruce"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

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

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
    )
}
export default PatientForm
