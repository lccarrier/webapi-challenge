const express = "express";
const router = require("express").Router();
const actionDb = require("./data/helpers/actionModel");

router.get("/:id", validateId, (req, res) => {
  actionDb
    .get(req.params.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
})

router.post("/", validatePost, (req,res) => {
  actionDb.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.put("/:id", validateId, validatePost, (req,res) => {
  actionDb.update(req.params.id, req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.delete("/:id", validateId, (req,res) => {
  actionDb.remove(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
})

function validateId(req, res, next) {
  actionDb.get(req.params.id) 
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
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({message: "missing required text field"})
  }
  else if (!req.body) {
    res.status(400).json({message: "missing post data"})
  }
  next();
}

module.exports = router;

