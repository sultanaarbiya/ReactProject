
import React, { useState, useEffect } from 'react';
import './UserDataForm.css';
import { v4 as uuidv4 } from 'uuid';


const UserDataForm = () => {
   
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: ''
    });
      
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    // Effect to detect unsaved changes when form data changes
    useEffect(() => {
        const handleWindowClose = (event) => {
            if (unsavedChanges) {
                const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
                // alert("You have unsaved changes. Are you sure you want to leave?")
                event.returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, [unsavedChanges]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setUnsavedChanges(true);


    };
   
     let newUserId;
      function handleGenerateUserId(){
      newUserId=  document.getElementById("user-id").innerText = uuidv4();
      console.log(newUserId);
      return newUserId;
       }
    
      let userData;
       function saveUserData(newUserId, data)
       {
          // Save data logic  (local storage )
         userData = JSON.stringify({ newUserId, data });
          localStorage.setItem('userData', userData);
          console.log('Saving data for user:', newUserId, data);
          
          
      }
   

   
    const getLocalitems = ()=>{
       
      let Data = localStorage.getItem('userData');
      
        if(Data){
          return JSON.parse(localStorage.getItem('data')) 
        
        }

     }
    
    const [Ldata,setData] = useState(getLocalitems());

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name||!formData.address||!formData.email || !formData.phone)
        {
            
                alert('Please fill out all required fields!');
        }
      
      // Save data to local storage  
        saveUserData(newUserId, formData);
        //  console.log(userId)
        // Reset form data and unsavedChanges state
        setFormData({
            name: '',
            address: '',
            email: '',
            phone: ''
        });
        setUnsavedChanges(false);
     handleGenerateUserId();
     alert(`"userData=> ",${userData}`);
    //  document.getElementById("json").innerText = userData;
    //  document.getElementById("saved").innerText = userData;
    };
    
   
    return (
        <div>
            <h2>User Data Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <button type="submit" >Submit</button>
            </form>
         </div>
    );
}

export default UserDataForm;


