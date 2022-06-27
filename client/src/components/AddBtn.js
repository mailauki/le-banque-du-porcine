import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

function AddBtn({onClick}) {
  return(
    <IconButton
      onClick={onClick}
      id="button"
      aria-label="add"
      component="span"
      color="primary"
      // sx={{
      //   "&:hover": {
      //     backgroundColor: "#eee2",
      //     color: "#eee"
      //   }
      // }}
    >
      <Add fontSize="small" />
    </IconButton>
  )
}

export default AddBtn;