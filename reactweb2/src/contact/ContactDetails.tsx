import { Link, useParams } from "react-router-dom";
import ApiStatus from "../ApiStatus";
import { useDeleteContact, UseFetchDetailContact } from "../hooks/ContactHooks";

const ContactDetails = () =>
{
    const {id} = useParams();
    if(!id) throw Error("House id not found");
    const ContactId = parseInt(id);

    const {data,status,isSuccess} = UseFetchDetailContact(ContactId);
    const deleteContactMutation = useDeleteContact();
    if(!isSuccess) return <ApiStatus status={status}/>
    if (!data) return <div>contact didn't found</div>
    
    return(
        
        <div className="row">

          
      <div className="col-6">
      <br></br>
      <br></br>
      <br></br>
        <div className="row mt-2">
          
          <h1 className="col-12">{data.firstName}</h1>
          
         
          
        </div>
        <div className="row">
          
          <h3 className="col-12">{data.lastName}</h3>
        </div>
        <div className="row">
          
          <h3 className="themeFontColor col-12">
            {(data.email)}
          </h3>
        </div>
        <div className="row">
          
          <div className="col-12 mt-4">{data.phoneNumber}</div>
        </div>
        
      </div>
      <div className= "row mt-3 ">
        <div className= " col-2">
          <Link className= "btn btn-primary w-100" to = {`/contact/edit/${data.id}`}>
            Edit
          </Link>

        </div>
        <div className= "col-2">
          <button className = " btn btn-danger w-100" onClick={() =>{
            if(window.confirm("Are You Sure?"))
            deleteContactMutation.mutate(data);
          }}>

            Delete

          </button>

        </div>

      </div>
    </div>
    )

}
export default ContactDetails;