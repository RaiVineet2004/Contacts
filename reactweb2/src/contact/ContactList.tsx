
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../ApiStatus";

import UseFetchContacts from "../hooks/ContactHooks";
import { Contact } from "../Types/contact"


const ContactList = () => 
{
    
    const nav = useNavigate();
    const {data , status , isSuccess} = UseFetchContacts();
    // check the status of the data backend
    if(!isSuccess)
        return<ApiStatus status = {status}/>

    // Sort the Name alphabatically
    const sortedData = data.sort((a, b) => a.firstName.localeCompare(b.firstName));
    
    return( 
        <div>
            <div>
                <h5 className= "themeFontColor text-center ">
                    <h2>Lists</h2>
                    <br></br>
                    <br></br>
                    

                </h5>
            </div>
            <table className = " table table-hover ">
                <thead>
                    <tr> 
                        <th>Contacts</th>
                       
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                    </tr>
                    <thead>
                    
        </thead>
                </thead>
                <tbody>
                    {data && data.map((h) => 
                    (
                        <tr key = {h.id} onClick =
                         {() => nav(`/contact/${h.id}`)}>
                            <td>{h.firstName}</td>
                            <td>{h.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

            
            <Link className = "btn btn-primary" to = "/contact/add" >
                Add   
            </Link>
            
        </div>
        


    )

}
export default ContactList;