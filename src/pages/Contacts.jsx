import React, { useEffect, useState } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Contacts = () => {
    const {store, dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    const params = useParams();
    const [contactToDelete, setContactToDelete] = useState(null);
    async function fetchTasks() {
        const response = await fetch(
            `${store.BASE_URL}/${store.SLUG}`
        );
        const body = await response.json();
        if (!response.ok) throw new Error(`status: ${response.status}, message: ${body}`);
        dispatch ({
            type: "SET_CONTACTS", 
            payload: body.contacts
        });       
    };
    useEffect(() => {
        fetchTasks();
    }, [])
    const [showModal, setShowModal] = useState(false);
    async function deleteContact (id) {
      const response = await fetch(
        `${store.BASE_URL}/${store.SLUG}/contacts/${id}`, {
          method: "DELETE"});
      if (!response.ok) {
        const body = await response.json();
        throw new Error(`status:${response.status}, message:${body}`);
      }
      await fetchTasks();
    };
//    const deleteContact(id){
//        fetch(`${store.BASE_URL}/${store.SLUG}/contacts/${id}`, {
//            method: "DELETE", 
//            headers: {
//                "Content-Type": "application/json",
//            },
//        })
//        .then(() => 
//        fetch(`${store.BASE_URL}/${store.SLUG}/contacts`, {
//            method: "GET", 
//            headers: {
//                "Content-Type":"application/json", 
//            },
//        })
//    )
//    };
    return (
    <div className="text-center mt-5">
        <h1>Contact List</h1>
        {showModal && (
            <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this contact?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    if (contactToDelete) {
                      await deleteContact(contactToDelete);
                    }
                    setShowModal(false);
                    setContactToDelete(null);
                  }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
            <ul className="list-group m-2">
		{store.contacts.map((contact)=>{
			return (
        <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center position-relative">
          <img src="https://placehold.co/200x200" className="rounded-circle" />
          <div className="container">
            <h5 className="text-start">{contact.name}</h5>
            <p className="text-start">
              <i className="fa-solid fa-phone p-2"></i>{contact.phone}
            </p>
            <p className="text-start">
              <i className="fa-solid fa-envelope p-2"></i>{contact.email}
            </p>
            <p className="text-start">
              <i className="fa-solid fa-location-dot p-2"></i>{contact.address}
            </p>
          </div>
          <div className="m-2 d-flex position-absolute top-0 end-0">
            <i className="fa-solid fa-pencil p-2"
            key={contact.id}
			onClick={(event) => navigate(`/contacts/${contact.id}`)}
      style={{ cursor: "pointer" }}></i>
            <i
              className="fa-solid fa-trash p-2"
              onClick={() => {
                setContactToDelete(contact.id);
                setShowModal(true);
              }}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </li>
			)
		})}
      </ul>
        </div>
    )
    };