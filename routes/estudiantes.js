var express = require("express");
var router = express.Router();

const { DataValidator } = require("../middlewares/DataValidator");
const { insertEstudiante } = require("../lib/schema/User");
const {
  createEstudiante,
  findStudent,
  updateEstudiante,
  deleteEstudiante,
} = require("../services/Estudiante.services");

/* GET users listing. */
router
  .get("/", async function (req, res, next) {
    try {
      const {
        query: { id },
      } = req;
      const student = await findStudent(id);
      res.status(200).json({
        msg: "Lista de Estudiantes",
        body: student,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })
  .post("/", DataValidator("body", insertEstudiante), async (req, res) => {
    try {
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        carrera,
        nivel,
      } = req.body;

      const result = await createEstudiante(
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        carrera,
        nivel
      );

      res.status(200).json({
        msg: "Estudiante Creado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  })
  .put("/", DataValidator("body", insertEstudiante), async (req, res) => {
    try {
      const {
        query: { id },
      } = req;
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        carrera,
        nivel,
      } = req.body;
      const result = await updateEstudiante(
        id,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        carrera,
        nivel
      );
      const EstudianteActualizado = await findStudent(id);

      res.status(200).json({
        msg: "Usuario Actualizado",
        body: EstudianteActualizado,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const result = await deleteEstudiante(id);
      const StudentDeleted = await findStudent();

      res.status(200).json({
        msg: "Usuario Eliminado",
        body: StudentDeleted,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  });

module.exports = router;
