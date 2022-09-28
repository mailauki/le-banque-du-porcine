import { IconButton, Tooltip } from '@mui/material';
import { Add, Clear, Delete, Edit } from '@mui/icons-material';

function IconBtn({onClick, button}) {
  return(
    <Tooltip title={button} arrow>
      <IconButton
        onClick={onClick}
        id="button"
        aria-label={button}
        component="span"
        color="primary"
        // sx={{
        //   "&:hover": {
        //     backgroundColor: "#eee2",
        //     color: "#eee"
        //   }
        // }}
      >
        {(() => {
        switch(button) {
          case "Add":
            return <Add fontSize="small" />
          case "Delete":
            return <Delete fontSize="small" />
          case "Edit":
            return <Edit fontSize="small" />
          default:
            return null
        }
      })()}
      </IconButton>
    </Tooltip>
  )
}

export default IconBtn;