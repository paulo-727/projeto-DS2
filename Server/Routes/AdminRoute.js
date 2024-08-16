import express from "express";
import con from '../utilidades/db.js';
import bcrypt from 'bcrypt'

const router = express.Router();


router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query erro" });
    if (result.length > 0) {
      const email = result[0].email;
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"email ou senha errada" });
    }
  });
});


router.post('/add_funcionario', (req, res) => {
  const sql =`INSERT INTO employee (name,email,password, address, salary,image, category_id) VALUES(?)`
  bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err) return res.json({Status: false, Error: "Erro"})
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.address,
          req.body.salary, 
          req.body.image,
          req.body.category_id
      ]
      con.query(sql, [values], (err, result) => {
          if(err) return res.json({Status: false, Error: "Erro 404"})
          return res.json({Status: true})
      })
  })
})







router.get('/cargos', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Erro 404"})
      return res.json({Status: true, Result: result})
  })
})





router.post('/add_cargo', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  con.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Erro 404"})
      return res.json({Status: true})
  })
})


router.get('/funcionarios', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Erro 404"})
      return res.json({Status: true, Result: result})
  })
})

router.get('/funcionarios/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Erro 404"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_funcionarios/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
      Where id = ?`
  const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id
  ]
  con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Erro 404"+err})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/deletar_funcionario/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from employee where id = ?"
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Erro 404"+err})
    return res.json({Status: true, Result: result})
})
})

router.delete('/deletar_cargo/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from category where id = ?"
  con.query(sql,[id], (err, result) => {
    if(err) return res.json({Status: false, Error: "Erro 404"+err})
    return res.json({Status: true, Result: result})
})
})

router.get('/funcionario_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Erro"+err})
      return res.json({Status: true, Result: result})
  })
})


router.get('/logout', (req,res) => {
  return res.json({Status: true})
})


router.get('/admin_re', (req, res) =>{
  const sql = "select * from admin"
  con.query(sql, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Erro"+err})
    return res.json({Status: true, Result: result})
})
})

export { router as adminRouter };
