import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { editPreset } from '../features/users/currentUserSlice';
import Errors from "../components/Errors";
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

function Profile() {
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()
  const [preset, setPreset] = useState(10)
  const [username, setUsername] = useState(currentUser ? currentUser.username : "")
  const [firstName, setFirstName] = useState(currentUser ? currentUser.first_name : "")
  const [errors, setErrors] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    
    dispatch(editPreset(parseFloat(preset)))
  }

  return (
    <>
      <h1>Profile</h1>
      {/* <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-input">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <button className="form-input button" type="submit">Edit Account</button>
        <Errors errors={errors} />
      </form> */}

      {/* <form className="Form" onSubmit={handleSubmit}>
        <TextField
          label="Preset add to balance: "
          sx={{
            backgroundColor: "#fff",
            borderRadius: "4px",
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
        />
        <button className="form-input button" type="submit">Edit Preset</button>
        <Errors errors={errors} />
      </form> */}
    </>
  )
}

export default Profile;
