var express = require("express");
var router = express.Router();

const { DataValidator } = require("../middlewares/DataValidator");
const { insertEstudiante, actualizarEstudiante } = require("../lib/schema/User");
const {
  createEstudiante,
  findStudent,
  updateEstudiante,
  deleteEstudiante,
} = require("../services/Estudiante.services");

/* GET users listing. */
/**
 * @swagger
 *  /students:
 *   get:
 *       description: Estudiantes Ingresados
 *       parameters:
 *        - name: id
 *          description: Id del Estudiante
 *          in: query
 *       responses:
 *        200:
 *            description: Correcto
 */
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
  /**
  * @openapi
  * /students:
  *   post:
  *       description: Ingresar Estudiante
  *       parameters:
  *        - name: primer_nombre
  *          description: Primer nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_nombre
  *          description: Segundo nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: primer_apellido
  *          description: Primer apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_apellido
  *          description: Segundo apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: carrera
  *          description: Carrera que sigue el Estudiante
  *          in: query
  *          required: true
  *        - name: nivel
  *          description: Nivel que esta el Estudiante
  *          in: query
  *          required: true 
  *       responses:
  *        200:
  *            description: Correcto!
  */
  .post("/", DataValidator("query", insertEstudiante), async (req, res) => {
    try {
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        carrera,
        nivel,
      } = req.query;

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
  /**
  * @openapi
  * /students:
  *   put:
  *       description: Actualizar Estudiante
  *       parameters:
  *        - name: id
  *          description: Id del estudiante para actualizar
  *          in: query
  *          required: true
  *        - name: primer_nombre
  *          description: Primer nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_nombre
  *          description: Segundo nombre del Estudiante
  *          in: query
  *          required: true
  *        - name: primer_apellido
  *          description: Primer apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: segundo_apellido
  *          description: Segundo apellido del Estudiante
  *          in: query
  *          required: true
  *        - name: carrera
  *          description: carrera que sigue el Estudiante
  *          in: query
  *          required: true
  *        - name: nivel
  *          description: nivel que esta el Estudiante
  *          in: query
  *          required: true
  *       responses:
  *        200:
  *            description: Correcto!
  */
  .put("/", DataValidator("query", actualizarEstudiante), async (req, res) => {
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
      } = req.query;
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
  /**
 * @swagger
 *  /students:
 *   delete:
 *       description: Eliminar 
 *       parameters:
 *        - name: id
 *          description: Id del estudiante a eliminar
 *          in: query
 *       responses:
 *        200:
 *            description: Correcto!
 */
  .delete("/", async (req, res) => {
    try {
      const {
        query: { id },
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
