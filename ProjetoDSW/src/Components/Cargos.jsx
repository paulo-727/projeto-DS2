import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
    const [cargos, setCargos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/cargos')
            .then(result => {
                if (result.data.Status) {
                    setCargos(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleDeletar = (id) => {
        axios.delete('http://localhost:3000/auth/deletar_cargo/' + id)
        .then(result => {
            if(result.data.Status){
                window.location.reload()

            }else {
                alert(result.data.Error)
            }
        })
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Lista de Cargos</h3>
            </div>
            <Link to="/Home/add_cargo" className='btn btn-success'>Add Cargo</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                    <tr>
                            <th>Nome</th>

                            <th>Ação</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cargos.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td> 





                                <td><button className="btn btn-warning btn-sm" onClick={() => handleDeletar(c.id)}>deletar</button></td>
                            </tr>
                            
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Category