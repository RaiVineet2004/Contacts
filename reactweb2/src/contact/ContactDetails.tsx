import  { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../ApiStatus";
import { useDeleteContact, UseFetchDetailContact } from "../hooks/ContactHooks";
import defaultImage from "./defaultPhoto";

const ContactDetails = () =>
{
    const {id} = useParams();
    if(!id) throw Error("House id not found");
    const ContactId = parseInt(id);

    const {data,status,isSuccess} = UseFetchDetailContact(ContactId);
    const deleteContactMutation = useDeleteContact();

    
    if(!isSuccess) return <ApiStatus status={status}/>
    if (!data) return <div>contact didn't found</div>

    return (
      <div  className="row">
      <div className="col-6">
        <div className="row">
          
          <img  
          
            className="img-fluid"
            src={data.photo ? data.photo : defaultImage}
            alt="contact pic"
            style={{ width: '250px', height: '250px' , marginLeft: '250px', marginTop: '50px'}}
            
           
          />
        </div>
        <br></br>
        <br></br>
        <div className="row mt-3">
          <div className="col-2"
          style = {{marginLeft: '268px'}}>
            <Link
              className="btn btn-primary w-100"
              to={`/contact/edit/${data.id}`}
            >
              Edit
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => 
              {
                if (window.confirm("Are you sure?"))
                  deleteContactMutation.mutate(data);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="col-4"  style={{marginTop: '50px'}}>
        <div className="row mt-5" >
        <h3 className="col-12">{data.firstName}</h3>

        </div>
        <div className="row">
          <h3 className="col-12">{data.lastName}</h3>
        </div>
        <div className="row">
          <h3 className="col-12">
            {(data.email)}
          </h3>
        </div>
        <div className="row">
          <h3><div className="themeFontColor col-12 mt-3">{data.phoneNumber}</div></h3>
        </div>
        
      </div>
    </div>
    );
   

}
export default ContactDetails;