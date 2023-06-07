import { useParams } from "react-router-dom"
import UseFetchContacts, { UseFetchDetailContact, useUpdateContact } from "../hooks/ContactHooks";
import ApiStatus from "../ApiStatus";
import ContactForm from "./ContactForm";

const ContactEdit = () => 
{
    const {id} = useParams();
    if(!id) throw Error ("Need a contact id");
    const contactId = parseInt(id);

    const{data, status, isSuccess} = UseFetchDetailContact(contactId);
    const updateHouseMutation = useUpdateContact();
    if(!isSuccess) return < ApiStatus status = {status}/>
    
    return(
        
            <ContactForm contact = {data} submitted = {h => updateHouseMutation.mutate(h)}/>
    );
    

};
export default ContactEdit;