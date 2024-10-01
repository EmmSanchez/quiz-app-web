// LOGIN SECTION ------------------------------------------------------------------
// eslint-disable-next-line react/prop-types
export function Login ({handleChange, handleSubmit, status}) {
  return (
    <>
      <h1 className="title">MN Quiz</h1>
      <ul>
        <li>Se le plantearán 6 problemas uno tras otro.</li>
        <li>Se concederán puntos por respuesta correcta y tiempo en responderla.</li>
        <li>
          Se le plantearán 6 problemas uno tras otro. Cada pregunta tiene cuatro opciones. Sólo
          puede elegir una opción.
        </li>
        <li>Cada pregunta tiene cuatro opciones. Sólo puede elegir una opción.</li>
        <li>El resultado se dará a conocer al final del quiz.</li>
      </ul>
      <form className="user_form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          disabled={status}
          className={status ? 'button button-disabled' : 'button'}
        >
          Iniciar
        </button>
      </form>
    </>
  )
}