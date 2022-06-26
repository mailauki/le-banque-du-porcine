import IconButton from '@mui/material/IconButton';
import { Add, Clear } from '@mui/icons-material';

function ListEl({list}) {
  function handleDelete() {
    console.log("delete")
    console.log({list})
  }
  return(
    <div className="ListEl">
      {list.name}
      <IconButton
        onClick={handleDelete}
        id="button"
        aria-label="delete list"
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
    </div>
  )
}

export default ListEl;