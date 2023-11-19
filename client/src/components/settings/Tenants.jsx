import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Tenants() {
    const [tenants, setTenants] = useState([]);
    const [newTenant, setNewTenant] = useState("");
    const [deleteTenant, setDeleteTenant] = useState(null); //index: null, name: ""

    useEffect(() => {
      const fetchTenants = async () => {
        const res = await axios.get("/settings/tenants")
        setTenants(res.data[0].tenants || [])
      }
      fetchTenants()
    }, []);

    const handleDelete = (tenant, index) => {
      setDeleteTenant({...deleteTenant, index:index, name:tenant});
    };

    const confirmDelete = async() => {
      if (deleteTenant !== null) {
        try {
          // await axios.delete(`/settings/${deleteTenant.name}`) //TODO fix the delete function in server
          const updatedTenants = [...tenants];
          updatedTenants.splice(deleteTenant.index, 1);
          setTenants(updatedTenants);
          setDeleteTenant(null); 
        } catch(err) {
          console.log(err)
        }
      }
    };

    const cancelDelete = () => {
      setDeleteTenant(null);
    };

    const handleAddTenant = async () => {
      if (newTenant.trim() !== "") {
        const isDuplicate = tenants.length > 0 && tenants.some((tan) => tan.toLowerCase() === newTenant.toLowerCase());

        if (!isDuplicate) {
          // If it's not a duplicate, proceed with adding the new tenant
          await axios.put(`/settings/${newTenant}`);
          setTenants([...tenants, newTenant]);
          setNewTenant("");
        } else {
          alert("Duplicate tenant name. Choose a different name.");
          setNewTenant("")
        }
      }
    };

    return (
        <div>
          {tenants &&
            <ul>
                {tenants.map((tenant, index) => (
                    <li className="tenant-row" key={index}>
                        <a style={{ paddingRight: "20px" }}>{tenant}</a>
                        <FontAwesomeIcon icon={faTimes} onClick={() => handleDelete(tenant, index)} />
                    </li>
                ))}
            </ul>
          }
                
            {deleteTenant !== null && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}

            <div>
                <input
                    type="text"
                    value={newTenant}
                    onChange={(e) => setNewTenant(e.target.value)}
                    placeholder="Enter new tenant"
                />
                <button onClick={handleAddTenant}>Add Tenant</button>
            </div>
        
        </div>
    );
}

export default Tenants;
