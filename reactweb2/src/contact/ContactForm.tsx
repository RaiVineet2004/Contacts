import { useState } from "react";
import { Contact } from "../Types/contact"


type Args = 
{
    contact: Contact;
    submitted : (contact : Contact) => void;

}

const ContactForm = ({contact, submitted} : Args) => 
{
    const[contactState , setContactState] = useState({...contact});
    const onSubmit: React.MouseEventHandler<HTMLButtonElement>=
        async (e) => 
        {
            e.preventDefault();
            submitted(contactState);

        }
        

    return(
       
           
        <form className="mt-2">
            <div className="form-group">
                <label htmlFor="firstName">firstName</label>
                <input
                type="text"
                className="form-control"
                placeholder="firstName"
                value={contactState.firstName}
                onChange={(e) => setContactState({ ...contactState, firstName: e.target.value })}
                />
            </div>
        <div className="form-group mt-2">
            <label htmlFor="lastName">lastName</label>
            <input
            type="text"
            className="form-control"
            placeholder="lastName"
            value={contactState.lastName}
            onChange={(e) => setContactState({ ...contactState, lastName: e.target.value })}
            />
        </div>
      <div className="form-group mt-2">
        <label htmlFor="email">email</label>
        <textarea
          className="form-control"
          placeholder="email"
          value={contactState.email}
          onChange={(e) =>setContactState({ ...contactState, email: e.target.value })}
        />
      </div>
        <div className="form-group mt-2">
            <label htmlFor="phoneNumber">phoneNumber</label>
                <input
                type="number"
                className="form-control"
                placeholder="phoneNumber"
                value={contactState.phoneNumber}
                onChange={(e) =>setContactState({ ...contactState, phoneNumber: parseInt(e.target.value) })}
            />
        </div>
        
      
      
            <button className="btn btn-primary mt-2" disabled={!contactState.email} onClick={onSubmit}>
                Submit
            </button>
        </form>
        
        
        
    );
    


};

export default ContactForm;