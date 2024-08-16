import React, { useEffect, useState } from 'react'
import axios from 'axios'


  const Home2 = () => {
    const [funcionarioTotal, setFuncionarioTotal] = useState(0)
    const [salarioTotal, setSalarioTotal] = useState(0)
    const [admins, setAdmins] = useState([])
    useEffect(() => {
      FuncionarioContagem();
      AdminRe();

    }, [])

  const AdminRe = () => {
    axios.get('http://localhost:3000/auth/admin_re')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })

  }  

  const FuncionarioContagem = () => {
    axios.get('http://localhost:3000/auth/funcionario_count')
    .then(result => {
      if(result.data.Status) {
        setFuncionarioTotal(result.data.Result[0].employee)
      }
    })
  }

  return (
    <div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Funcionarios</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{funcionarioTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Folha de  Pagamento</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>

            
            
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
          <h3>Gerentes</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map(a =>(
                  <tr>
                    <td>{a.email}</td>
                    <td>
                  <button
                   
                    className="btn btn-info btn-sm me-2"
                  >
                    Editar
                  </button>
                                    
                                </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
 
  )
}

export default  Home2