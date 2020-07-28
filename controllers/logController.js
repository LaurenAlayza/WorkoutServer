let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Log = require("../db").import("../models/log");

//Create log with POST; Allows users to create a workout log
//with descriptions, definitions, results, and owner properties.
router.post("/log", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner: req.user.id, //******Errors? */
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET all log entries; Gets all logs for an individual user.
router.get("/log", (req, res) => {
  Log.findAll()
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//GET all log entries by user; Gets individual logs by id for
//an individual user.
router.get("/log/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: {
      owner: userid,
    },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//PUT method; Allows individual logs to be updated by a user.
router.put("/log/:id", validateSession, function (req, res) {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner: req.user.id, //******Errors? */
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.update(logEntry, query)
    .then((logs) => res.status(200).json({ logs:logs }))
    //.catch((err) => res.status(500).json({ error: err }));
});

//Allows individual logs to be deleted by a user.
router.delete("/log/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log entry removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
