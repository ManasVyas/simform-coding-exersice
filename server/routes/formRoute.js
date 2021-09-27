const router = require("express").Router();
const formController = require("../controllers/formController");

router.get("/", formController.getAllForms);
router.get("/:id", formController.getFormByFormId);
router.post("/add", formController.createForm);

module.exports = router;
