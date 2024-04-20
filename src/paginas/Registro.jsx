import React from 'react'

//Iconos importados
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

const Registro = () => {
    return (

        //Div de la pantalla Principal
        <div className='registros'>

            {/* div que contendra todo el crear cuenta */}
            <form className='principal-r' action=''>

                <h1>Registro SkyLink</h1>

                {/* div que contendra el formulario */}
                <div className='wrapper-r'>

                    {/* div del formulario izq */}
                    <div className="form-box-r">

                        <div className='form'>

                            <div className='input-box-r'>
                                <input type='text' placeholder='Nombre' required/>
                                <HiOutlineMail className='icon-r' />
                            </div>

                            <div className='input-box-r'>
                                <input type='text' placeholder='Numero de Documento' required/>
                                <PiIdentificationBadge className='icon-r' />
                            </div>

                            <div className='input-box-r'>
                                <input type='email' placeholder='Correo' required/>
                                <HiOutlineMail className='icon-r' />
                            </div>

                            <div className='input-box-r'>
                                <input type='text' placeholder='Telefono' required/>
                                <AiOutlinePhone className='icon-r' />
                            </div>
                        </div>
                    </div>

                    {/* div del formulario der */}
                    <div className="form-box-r">

                        <div className='form'>

                            <div className='input-box-r'>
                                <input type='text' placeholder='Apellidos' required/>
                                <HiOutlineMail className='icon-r' />
                            </div>

                            <div className='input-box-fecha-r'>
                                <p>Fecha de Nacimiento</p>
                                <input type='date' placeholder='f' required/>
                            </div>

                            <div className='input-box-r'>
                                <input type='password' placeholder='Clave' required/>
                                <MdPassword className='icon-r' />
                            </div>
                            
                            <div className='input-box-r'>
                                <input type='text' placeholder='Pais' required/>
                                <FaLocationDot className='icon-r' />
                            </div>
                        </div>
                    </div>

                </div>

                <button type='submit'>Registrame</button>

                {/* div para regeresar a inicio */}
                <div className='register-link-r'><p>Ya tengo una cuenta <a href='#'>Iniciar Sesion</a></p></div>
                
            </form>
        </div>
    )
}

export default Registro
