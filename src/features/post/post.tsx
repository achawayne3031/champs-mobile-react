import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPost, getAllAsync } from './postSlice';
import { useAppDispatch } from '../../app/hook'
import { Loader } from '../../components/loader';

  interface postType{
    id: number,
    userId: number,
    title: string,
    body: string
  }


export function Post() {

    const post = useSelector(selectPost);
    let loading = post.loading
    let ourData = post.data;
    const dispatch = useAppDispatch()

    const showData = () => {
        return (
            <>
                { loading ? (
                        <Loader />
                    ) : (
                            <div className='container'>

                                <table className="table">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th>Title</th>
                                        <th>Body</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                         ourData.map((data: postType, index) => {
                                                return <tr key={index}>
                                                    <td>{data.title}</td>
                                                    <td>{ data.body }</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                    )
                }
            
            </>
        )
    }
    

  return (

            <div>
                <button className='btn btn-primary' aria-label="api call" onClick={ () => dispatch(getAllAsync())}>
                    call APi
                </button>
                    <h2>hello wold</h2>

                    {showData()}
            
            </div>
   

    
  );
}
