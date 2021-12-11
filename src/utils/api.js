import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';

/*-------Proyectos------*/
export const obtenerProyectos = async (successCallback, errorCallback) => {

  const query = `
  {getProjects {
    _id
    codigoProyecto
    nombre
    objGenerales
    objEspecificos
    presupuesto
    fInicio
    fFinal
    estadoProyecto
    fase
    nombreLider
    documentoLider
  }}
`
await request('http://localhost:3001/api', query).then(successCallback);

};

export const registrarProyectos = async (data, successCallback, errorCallback) => {
  const mutation = `mutation
  registerProject($projectInput:ProjectInput!){   
    registerProject(input: $projectInput) {
      _id
      codigoProyecto
      nombre
      objGenerales
      objEspecificos
      presupuesto
      fInicio
      fFinal
      estadoProyecto
      fase
    }
  }`

  let varInputProject =
  {
  "projectInput": {
    "codigoProyecto": data.codigoProyecto,
    "nombre": data.nombre,
    "objGenerales": "mejorar cosas",
    "objEspecificos": "mejorar una cosa",
    "presupuesto": 80000,
    "fInicio": "2021-12-01",
    "fFinal": "2021-12-08",
    "nombreLider": data.lider,
    "documentoLider": "123456789",//data.documentoLider,
    "estadoProyecto" : data.estadoProyecto
  }
}
  
  await request('http://localhost:3001/api', mutation, varInputProject).then(successCallback);
};

export const editarProyectos = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:3001/proyectos/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

/*---------Usuarios-------------*/

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: 'http://localhost:3001/usuarios/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarUsuarios = async (data, successCallback, errorCallback) => {
  const mutation = `mutation
  registerUser($UserInput:UserInput!){   
    registerUser(input: $UserInput) {
      nombre
      apellido
      email
      contrasena
      documentType
      documentId
      rol
      estado
    }
  }`

  let varInputUser =
  {
  "UserInput": {
    "nombre": "Hola",
    "apellido": "Mundo",
    "email": "hola@mundo.com",
    "contrasena": "homu123*",
    "documentType": "CC",
    "documentId": "123AA4566",
    "rol": "estudiante",
    "estado": "pendiente",
  }
}
  
  await request('http://localhost:3001/api', mutation, varInputUser).then(successCallback);
};


export const editarUsuarios = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:3001/usuarios/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};