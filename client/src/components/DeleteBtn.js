import IconButton from '@mui/material/IconButton';
import { Clear } from '@mui/icons-material';

function DeleteBtn({onClick}) {
  return(
    <IconButton
      onClick={onClick}
      id="button"
      aria-label="delete"
      component="span"
      color="primary"
      sx={{
        marginLeft: "10px",
        "&:hover": {
          backgroundColor: "#eee2",
          color: "#eee"
        }
      }}
    >
      <Clear fontSize="small" />
    </IconButton>
  )
}

export default DeleteBtn;