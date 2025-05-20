export const initialStore=()=>{
  return{
    BASE_URL: "https://playground.4geeks.com/contact/agendas", 
    SLUG: "AnnoyingAnn",
    contacts: [
    //  {
    //    id: 1,
    //    name: "Make the bed",
    //    phone: "89573",
    //    address: "888 street",
    //    email: "rhfy@gmail", 
//
    //  },
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "SET_CONTACTS":
      const newStore = {...store};
      newStore.contacts = action.payload;
      return newStore;
    case "ADD_CONTACT":
      const newContact = action.payload;
      return {
        ...store,
        contacts: [...store.contacts, newContact]
      };
    case "DELETE_CONTACT":
      const newContacts = store.contacts.filter(contact => contact.id !== action.payload);
      return {
        ...store,
        contacts: newContacts
      };
    case "UPDATE_CONTACT":
      const updatedContacts = store.contacts.map(contact => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload };
        }
        return contact;
      });
      return {
        ...store,
        contacts: updatedContacts
      };
  //  case 'add_contact':
//
  //    const { id, name, phone, email, address } = action.payload
//
  //    return {
  //      ...store,
  //      contacts: store.contacts.concat((contacts) => (contacts.id === id ? { ...todo, background: color } : todo))
  //    };
    default:
      throw Error('Unknown action.');
  }    
}
