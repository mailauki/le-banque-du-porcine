import { IconButton, Tooltip } from '@mui/material';
import { Clear, Delete } from '@mui/icons-material';

function DeleteBtn({onClick}) {
  return(
    <Tooltip title="Delete">
      <IconButton
        onClick={onClick}
        id="button"
        aria-label="delete"
        component="span"
        color="primary"
        sx={{
          marginRight: "6px",
          // marginLeft: "10px",
          // "&:hover": {
          //   backgroundColor: "#eee2",
          //   color: "#eee"
          // }
          backgroundColor: "rgba(255, 255, 255, 0.54)",
          color: "#000",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.54)",
            color: "#000"
          }
        }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteBtn;