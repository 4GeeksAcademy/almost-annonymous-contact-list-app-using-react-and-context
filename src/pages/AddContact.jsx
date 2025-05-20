import React, { useState } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    async function addContact() {
        if (name === "" || phone === "" || email === "" || address === "") throw new Error (
            "missing a field"
        );
        const requestBody = {
            name: name, 
            email: email, 
            phone: phone,  
            address: address, 
        };
        const response = await fetch(`${store.BASE_URL}/${store.SLUG}/contacts`, {
            method: "POST", 
            body: JSON.stringify(requestBody), 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await response.json();
        if (!response.ok) throw new Error(`status:${response.status}, message: ${body}`);
        setName("");
        setPhone("");
        setEmail(""); 
        setAddress("");
        navigate("/");
    }
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
                    onClick={(event)=> addContact()}
                    >Save</button>
                    </div>
                </form>
            </div>
            <Link to={"/"}> go back to Contacts </Link>
        </div>
);

};