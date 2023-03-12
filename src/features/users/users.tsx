import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, selectUser, deleteUser, updateUser } from './userSlice';
import { useAppSelector, useAppDispatch } from '../../app/hook'
import { Loader } from '../../components/loader';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Modal, Button} from 'react-bootstrap';


  interface postType{
    id: number,
    name: string,
    email: string,
  }


export function User() {

    const user = useSelector(selectUser);
    let loading = user.loading
    let ourData = user.data.data;
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        email: "",
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (data: postType) => {

        setShow(true);
        setFormData(
            {
                id: data.id,
                name: data.name,
                email: data.email
            }
        )
    } 

    
    


    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(updateUser(formData))
        handleClose()
       
    }




  
    useEffect(() => {
        dispatch(getAllUsers());
    },[]);

    const deleteUserData = (user: number) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => dispatch(deleteUser(user))
              },
              {
                label: 'No',
                
              }
            ]
          });
    }



    const showData = () => {
        return (
            <>
                  <div className='container mt-3 mb-4'>
                        <div className='row'>
                            <div className='col-md-1'></div>
                                <div className='col-md-10'>
                                    { loading ? 
                                        (
                                            <Loader />
                                        ) : (
                                        
                                            <table className="table table-striped">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>S/N</th>
                                                        <th>Name</th>
                                                        <th>Email Address</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        ourData.map((data: postType, index) => {
                                                            return <tr key={index}>
                                                                <td>{ index + 1 }</td>
                                                                <td>{data.name}</td>
                                                                <td>{ data.email }</td>
                                                                <td className='btn-wrapper'>
                                                                    <button onClick={() => handleShow(data)} className='fa fa-edit btn btn-primary'></button>
                                                                    <button onClick={ () => deleteUserData(data.id)}  className='fa fa-remove btn btn-danger'></button>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
            
            </>
        )
    }
    

  return (
            <div>
                
                <Modal show={show} onHide={handleClose} centered>

                    <Modal.Header>
                        <Modal.Title>Edit User Data</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>

                        <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        name="name"
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

                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                    </Modal.Footer>
                </Modal>

                {showData()}
            </div>
   
  );
}
