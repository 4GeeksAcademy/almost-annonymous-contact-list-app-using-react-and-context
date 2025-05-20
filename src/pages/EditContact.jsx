import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

//export const EditContact = () => {
//    const { store, dispatch } = useGlobalReducer();
//    const navigate = useNavigate();
//    const params = useParams();
//    function getContact(id) {
//       
//        const requiredContact = store.contacts.find((contact) => {
//            if (contact.id == id) return true;
//            return false;
//});
//        if (!requiredContact) navigate ("/");
//           };
//           
//               useEffect(() => {
//                   if (!params.contactId) return;
//                   getContact(params.contactId);
//               }, [params]);
//        return (
//        <p> hi </p>
//    );
//}

export const EditContact = () => {
    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    function searchContactDetail(id) {
        const requiredContact = store.contacts.find((contact)=>{
            if (contact.id == id) return true;
            return false;
        });
        if (!requiredContact) navigate("/");
        setName(requiredContact.name);
        setPhone(requiredContact.phone);
        setAddress(requiredContact.address);
        setEmail(requiredContact.email);
    };
    async function saveContact() {
        if (name === "" || phone === "" || email === "" || address === "") throw new Error (
            "missing a field"
        );
        const requestBody = {
            name: name, 
            email: email, 
            phone: phone,  
            address: address, 
        };
        const response = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${params.contactId}`, {
            method: "PUT", 
            body: JSON.stringify(requestBody), 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message: ${body}`);
        navigate("/");
    };
    useEffect(() => {
        if (!params.contactId) return;
        searchContactDetail(params.contactId);
    }, [params.contactId]);
    return (
        <div className="row" >
                    <div className="d-flex w-100 flex-column">
                        <form>
                            <label className="form-label">Full Name</label>
                            <input value={name} onChange= {(event) => setName(event.target.value)} type="text" className="form-control" placeholder="Enter Full Name" name="name"/>
        
                            <label className="form-label">Email</label>
                            <input value={email} onChange= {(event) => setEmail(event.target.value)} type="email" className="form-control" placeholder="Enter Email" name="email"/>
        
                            <label className="form-label">Phone</label>
                            <input value={phone} onChange= {(event) => setPhone(event.target.value)} type="text" className="form-control" placeholder="Enter Phone Number" name="phone"/>
        
                            <label className="form-label">Address</label>
                            <input value={address} onChange= {(event) => setAddress(event.target.value)} type="text" className="form-control" placeholder="Enter Address" name="address"/>
        
                            <div className="d-grid m-2">
                            <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={(event)=> saveContact()}
                            style={{ cursor: "pointer" }}
                            >Save</button>
                            </div>
                        </form>
                    </div>
                    <p 
                    className="text-decoration-underline text-primary"
                    onClick={(event) => navigate ("/")}
                    style={{ cursor: "pointer" }}
                    >Cancel</p>
                </div>
    );
};