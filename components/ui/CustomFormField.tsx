'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage , FormDescription} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from '../forms/PatientForm';
interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
  }

  const RenderInput = () => {
    <Input
    type="text"
    placeholder="Enter your name"
    className="w-full"
    />
  }
const CustomFormField = ({ control, fieldType,  name, label }: CustomProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
     <FormItem className='flex-1'>
        {fieldType!== FormFieldType.CHECKBOX && label  &&(
            <FormLabel>{label}</FormLabel>
        )}

<RenderField field={field}/>
     </FormItem>
    )}
  )
}

export default CustomFormField
