const { ObjectId } = require("mongodb");
const { MongoConnection } = require("../lib/Mongo");
const COLLECTION = "estudiantes";

const findStudent = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const student = DB.collection(COLLECTION);
      const studentList = await student.find({}).toArray();
      if (id != undefined) {
        var filterResult = studentList.filter((es) => es._id == id);
        resolve(filterResult);
      }
      resolve(studentList);
    } catch (error) {
      reject(error);
    }
  });

const createEstudiante = (
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  carrera,
  nivel
) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const estudiantes = DB.collection(COLLECTION);
      const result = await estudiantes.insertOne({
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        carrera: carrera,
        nivel: nivel,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

const updateEstudiante = (
  id,
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  carrera,
  nivel
) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const estudiantes = DB.collection(COLLECTION);
      const result = await estudiantes.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            carrera: carrera,
            nivel: nivel,
          },
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

const deleteEstudiante = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const estudiantes = DB.collection(COLLECTION);
      const result = await estudiantes.deleteOne({ _id: ObjectId(id) });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createEstudiante,
  findStudent,
  updateEstudiante,
  deleteEstudiante,
};
