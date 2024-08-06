import { ID } from "node-appwrite";
import { DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import {  databases } from "../appwrite.config"
export const createAppointment = async(appointment: CreateAppointmentParams) => {
    try{
        const newAppointment= await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
           appointment
        )

        return parseStringify(newAppointment);

    }catch (error){

    }
}