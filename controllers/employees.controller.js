const Employees = require('../models/employees.model')

exports.findAll = (req,res)=>{
    Employees.findAll({})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).send({message:err.message})
        })
}

exports.findOne = (req,res)=>{
    Employees.findByPk(req.params.id)
    .then(data=>{
        if(data)
            res.json(data)
        else
            res.status(404).json({message:`Cant find user with id ${req.params.id}`})
    })
    .catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.create = (req,res)=>{
    let employee = req.body
    Employees.create(employee)
        .then(data=>{
            res.json({message:'Successful insert.',userID:data.id})
        })
        .catch(err=>res.status(500).json({message:err.message}))
}

exports.update = (req,res)=>{
    Employees.update(req.body, {
        where: {id:req.params.id}
    })
    .then((num)=>{
        if(num==1)
            res.json({message:'Successful edit.'})
        else
            res.status(404).json({message:'Couldnt edit.'})
        
    })
    .catch((err)=>res.status(500).json({message:err.message}))
}

exports.delete = (req,res)=>{
    Employees.destroy({
        where:{id:req.params.id}
    })
    .then((num)=>{
        if(num==1)
            res.json({message:'Successful delete.'})
        else
            res.status(404).json({message:'Couldn\'t delete.'})
        
    })
    .catch((err)=>{
        res.status(500).json({message:err.message})
    })
}

