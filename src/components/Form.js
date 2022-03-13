/* importar la funcion HOOK para usar el estado interno de un componente */
import React, {useState} from "react";


function Form(props){
    /* useState crea una pieza de estado para un componente;
    recibe un parámetro que determina el valor inicial de ese estado;
    retorna el estado Y una función que se puede usar para actualizar ese estado */
    /* crear un estado "name" (y una funcion para actualizarlo) */
    const [name, setName] = useState("usar hooks!");

    /* el prop addTask que recibe este componente es una función que espera como parametro el nombre de la tarea */
    function handleSubmit(e){
        e.preventDefault();
        // usando regex para chequear que el string no esté vacío:
        // ^ = que no empiece con; \s = espacio; + = uno o más caracteres iguales; $ = que no termine con
        if (name !== /^\s+$/){
            props.addTask(name);
        }
        // una vez que ya agregamos el nuevo elemento con su nombre, vaciamos el campo de input
        setName("");
    }

    function handleChange(e){
        /* e representa en react al onChange (?): un console.log(e) retorna un SyntheticBaseEvent Object
        cuyo _reactName es "onChange", y type es "change" 

        e.target represena el elemento que disparó el evento change (el elemento <input> nuevo!);
        value es el texto dentro de ese elemento */
        setName(e.target.value);
    }

    return(
        /* ejecutar la función deseada */
        <form onSubmit={handleSubmit}>
            <h2 className='label-wrapper'>
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                /* tomar valores del estado de este componente */
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    )
}

export default Form;