import { useEffect, useState } from "react"
import { Contact } from "../Types/contact";
import config  from "../config";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { Axios, AxiosError, AxiosResponse, AxiosResponseHeaders } from "axios";
import { useNavigate } from "react-router-dom";


const UseFetchContacts = () => 
{
    return useQuery<Contact[], AxiosError>("contact",() =>
    axios.get(`${config.baseApiUrl}/contact`).then(
        (resp) => resp.data)
    );
};

const UseFetchDetailContact = (id: number) => 
{
    return useQuery<Contact, AxiosError>(["contact",id], () =>
        axios.get(`${config.baseApiUrl}/contact/${id}`).then(
            (resp) => resp.data)
    );

}

// Adding the new contact
const useAddContact = () => 
{
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, Axios, Contact>(
        (h) => axios.post(`${config.baseApiUrl}/contact` , h),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("contact");
                nav("/")
            }
        }
    )

};

// updating the contact
const useUpdateContact = () => 
{
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, Axios, Contact>(
        (h) => axios.put(`${config.baseApiUrl}/contact` , h),
        {
            onSuccess: (_, contact) => {
                queryClient.invalidateQueries("contact"); 
                nav(`/contact/ ${contact.id}`)
            }
        }
    )

};
//  Deleting the Contact

const useDeleteContact = () => 
{
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, Axios, Contact>(
        (h) => axios.delete(`${config.baseApiUrl}/contact/${h.id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("contact");
                nav("/")
            }
        }
    )

};
export default UseFetchContacts;
export {UseFetchDetailContact , useAddContact, useUpdateContact,useDeleteContact};