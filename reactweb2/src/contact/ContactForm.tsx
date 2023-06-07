import React, { useState } from "react";
import { Contact } from "../Types/contact"
import toBase64 from "../toBase64";



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

    const onFileSelected = async(e: React.ChangeEvent<HTMLInputElement>)
    :Promise<void> =>
    {
        e.preventDefault;
        e.target.files && e.target.files[0] &&
        setContactState({...contactState,
        photo: await toBase64(e.target.files[0]) });

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
        <div className = "form-group mt-2">
            <label htmlFor= "image">Image</label>
            <input
            id = "image"
            type ="file"
            className="form-control"
            onChange={onFileSelected}
            />
             
        </div>
            <div className="mt-2">
                <img style={{ width: '250px', height: '250px' }}
                src={contactState.photo}></img>
            </div>
           
      
      
            <button className="btn btn-primary mt-2" disabled={!contactState.email || !contactState.phoneNumber} onClick={onSubmit}>
                Submit
            </button>
        </form>
        
        
        
    );
    


};

export default ContactForm;


