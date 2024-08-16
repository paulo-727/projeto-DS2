import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Funcionarios = () => {
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/funcionarios')
            .then(result => {
                if (result.data.Status) {
                    setFuncionario(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))

    }, [])

    const handleDeletar = (id) => {
        axios.delete('http://localhost:3000/auth/deletar_funcionario/' + id)
        .then(result => {
            if(result.data.Status){
                window.location.reload()

            }else {
                alert(result.data.Error)
            }
        })
    }
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Lista de Funcionarios</h3>
      </div>
      <Link to="/Home/add_funcionario" className="btn btn-success">
        Add Funcionario
      </Link>
      <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>Cargo</th>
                            <th>Salario</th>
                            <th>Ação</th>

                        </tr>
                    </thead>
                    <tbody>
            {funcionario.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.category_id}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/home/edit_funcionarios/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Editar
                  </Link>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleDeletar(e.id)}>deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  );
};

export default Funcionarios;
