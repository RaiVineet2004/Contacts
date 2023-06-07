import { useAddContact } from "../hooks/ContactHooks";
import { Contact } from "../Types/contact";
import ContactForm from "./ContactForm";


const ContactAdd = () => 
{
    const AddContactMutation = useAddContact();

    const contact: Contact = 
    {
        id:0,
        firstName: "",
        lastName: "",
        email:"",
        phoneNumber:0,
        photo :""
        

    };

    return(
        <ContactForm contact = {contact} submitted = {(h) => AddContactMutation.mutate(h)}></ContactForm>
    )

    


}
export default ContactAdd;