import React, { useState } from "react";
import {  useAppDispatch } from '../app/hook'
import { useSelector } from 'react-redux';
import { getAllUsers, AddNewUser, selectUser } from './../features/users/userSlice';





export function FormInput () {
    const user = useSelector(selectUser);
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });


    let loading = user.loading
    let saveState = user.saveState

    if(saveState === true){
        dispatch(getAllUsers())
    }

 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(AddNewUser(formData))
        setFormData({
            name: "",
            email: "",
        })

       
    }


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        />
                                </div>

                                <div className="form-group">
                                    <label>Email address:</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        />
                                </div>
                                <div className="form-group">
                                    <button disabled={loading} type="submit" name="submit" className="btn btn-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    )
}







