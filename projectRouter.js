const express = "express";
const router = require("express").Router();
const projectDb = require("./data/helpers/projectModel");
const actionDb = require("./data/helpers/actionModel");

router.post("/", validatePost, (req,res) => {
  projectDb.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get("/", (req, res) => {
  projectDb
    .get()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

router.get("/:id", validateId, (req, res) => {
  projectDb
    .get(req.params.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

router.put("/:id", validateId, validatePost, (req, res) => {
  projectDb.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.delete("/:id", validateId, (req,res) => {
  projectDb.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => [
      res.status(500).json(error)
    ])
})

router.get("/projectId/:id", (req, res) => {
  const projId = req.params.id
  console.log(projId)
  projectDb.getProjectActions(projId)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

function validateId(req, res, next) {
  projectDb.get(req.params.id) 
   .then(user => {
     if (user) {
       next();
     }
     else {
       res.status(404).json({message: "invalid id"})
     }
   })
}

function validatePost(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({message: "missing required text field"})
  }
  else if (!req.body) {
    res.status(400).json({message: "missing post data"})
  }
  next();
}

function getActions(req, res, next) {
  actionDb.get() 
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(404).json(error)
    })
  next()
}
 
module.exports = router;
