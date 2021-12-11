import React, { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerUsuarios, editUserState} from '../utils/api';
import { nanoid } from 'nanoid';
import RegistrarUsuario from './RegistrarUsuario';

const GestionarUsuarios = () => {

    const [usuario, setUsuario] = useState([]);
    const [mostrarTablaUsuarios, setMostrarTablaUsuarios] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Editar mi perfil');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    
    
    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerUsuarios((response) => {
                console.log('la respuesta que se recibio fue', response);
                setUsuario(response.getUsers);
            },
            (error) => {
                console.error('Salio un error:', error);
            }
            );
            setEjecutarConsulta(false); 
        }
    }, [ejecutarConsulta]);

        //obtener lista desde el back 
        useEffect(() => {
            if (mostrarTablaUsuarios) {
                setEjecutarConsulta(true);
            }
        }, [mostrarTablaUsuarios]);


        return (
            <div>
                <div>
                    <button
                    onClick={() => {
                        setMostrarTablaUsuarios(!mostrarTablaUsuarios)
                    }}
                    className="botonCrear">                
                    {textoBoton}
                    </button>
                </div>
    
                {mostrarTablaUsuarios ? (
                <TablaUsuarios listaUsuarios={usuario} setEjecutarConsulta={setEjecutarConsulta}/>
                ) : (
                    <RegistrarUsuario
                        setMostrarTablaUsuarios={setMostrarTablaUsuarios}
                        listaUsuarios={usuario}
                        setUsuario={setUsuario}/>
                    )}
                <ToastContainer position='bottom-center' autoClose={5000} />
            </div>
        );
    };  


    /*------------ Tabla Usuarios --------------*/


const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

    useEffect(() => {
        setUsuariosFiltrados(
            listaUsuarios.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
          })
        );
        console.log(setUsuariosFiltrados, busqueda)

    }, [busqueda, listaUsuarios]);

        return (
            <div>
                <Header/>
                <div className="textosInicioSeccion">
                <div className="tituloSeccion">Gestionar Usuarios</div>
                <div className="descripcionSeccion">Aquí encuentras los usuarios, los actualizas o agregas nuevos.</div>
            </div>   
                <section>    
                    <ul className="posicionBuscador"> 
                        <li>
                            <div className="label">Ingresa el ID del usuario:</div>
                            <input id="busqueda" type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                        </li>
                    </ul>
                    <div className="proyectTable">
                        <table summary="Usuarios registrados" className="usersTable">
                            <caption></caption>
                                <thead>
                                <tr>
                                    <th scope="col">ID Usuario</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Documento</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col" id="acciones">Acción</th>
                                    <th></th> 
                                </tr>
                                </thead>
                                <tbody>
                            {usuariosFiltrados.map((usuario) => {   
                            return (
                                <FilaUsuario
                                    key={nanoid()}
                                    usuario={usuario}
                                    setEjecutarConsulta={setEjecutarConsulta}
                                    />
                                );                   
                            })}
                        </tbody>
                        </table>
                        <ToastContainer position='bottom-center' autoClose={5000} />
                </div>
            </section>
        <Footer/>
    </div>
    );
};

/*--Fila de Usuarios donde se pueden editar. Esta función permite editar cada registro de la tabla de usuario, solo permite editar estado y rol---*/

const FilaUsuario = ({usuario, setEjecutarConsulta})=>{

    const [edit, setEdit] = useState(false);
    const [infoUsuario, setInfoUsuario] = useState(
        {
            _id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            contrasena: usuario.contrasena,
            documentId: usuario.documentId,
            rol: usuario.rol,
            estado: usuario.estado,
        }
    );

    const actualizarDatosUsuarios = async () =>{
       
        await editUserState(
            {   
                _id:usuario._id,
                nombre: infoUsuario.nombre,
                apellido: infoUsuario.apellido,
                email: infoUsuario.email,
                documentId: infoUsuario.documentId,
                rol: usuario.rol,
                estado: usuario.estado,
            },
            (response) => {
                toast.success('Usuario editado con éxito');
                setEdit(false);
            },
            (error) => {
                toast.error('Error editando el Usuario');
                console.error(error);
            }
        );
    };
    
    return(
        <tr>
            { edit ? (
            <>
            <td>{usuario._id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.email}</td>
            <td>{usuario.documentId}</td>
            <td>
             <select name="rol" className="listaUsuarios" required value={infoUsuario.rol} onChange={(e)=>setInfoUsuario({...infoUsuario, rol:e.target.value})} >
                <option disabled value={0}> Selecciona un rol</option>
                    <option>Estudiante</option>
                    <option>Lider</option>
                    <option>Administrador</option>
            </select>
            </td>
             <td>
             <select name="estado" className="listaUsuarios" required value={infoUsuario.estado} onChange={(e)=>setInfoUsuario({...infoUsuario, estado:e.target.value})}>
                <option disabled value={0}>Seleccione el estado</option>
                    <option>Pendiente</option>
                    <option>Autorizado</option>
                    <option>No Autorizado</option>
            </select>
            </td>
            <td>
            <button className="checkButton" onClick={actualizarDatosUsuarios}>
                        <span className="material-icons">check</span></button></td>
            <td>
            <button className="cancelButton" onClick={()=>setEdit(!edit)}> 
                    <span className="material-icons">cancel</span>
                    </button>
            </td>          
            </> 
            ) : (
                    <> 
                    <td>{usuario._id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.documentId}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.estado}</td>
                    <td><button className="editButton" onClick={()=>setEdit(true)}> 
                        <span className="material-icons">edit</span></button></td>
                    <td></td>            
                </>
            )
            }        
        </tr>     
        
    ) 
   
};

    
export default GestionarUsuarios;

