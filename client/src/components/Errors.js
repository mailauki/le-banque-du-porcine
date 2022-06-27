function Errors({errors}) {
  return(
    <>
      {errors ? (
        <div className={errors.length > 0 ? "Errors" : ""}>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Errors;