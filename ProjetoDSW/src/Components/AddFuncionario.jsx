import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFuncionario = () => {
  const [employee, setFuncionario] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCargo] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/cargos")
      .then((result) => {
        if (result.data.Status) {
          setCargo(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_funcionario', employee)
    .then(result => console.log(result.data))
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Adicionar Funcionario</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Entre Nome"
              onChange={(e) =>
                setFuncionario({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Entre Email"
              autoComplete="off"
              onChange={(e) =>
                setFuncionario({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Entre Senha"
              onChange={(e) =>
                setFuncionario({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salario
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Entre Salario"
              autoComplete="off"
              onChange={(e) =>
                setFuncionario({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Endereço
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Rua 25 de fevereiro,jardim Brasil, 123"
              autoComplete="off"
              onChange={(e) =>
                setFuncionario({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Cargo
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setFuncionario({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Selecionar Imagem
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setFuncionario({...employee, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Funcionario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default  AddFuncionario;