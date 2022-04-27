import  React , {useState ,useRef} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Table.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [baseImage, setBaseImage] = useState({
    img: null,
  });


  const targetupload = useRef(null);
  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBaseImage({ img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const [form , setForm] = useState({
    brandName	:'',
    
  })

  const formDataUploadServer = async()=>{
     
  }
  return (
      <div className="TableBrand">
      <h3>Brands</h3>
      <div className="brandCreate" onClick={handleOpen}>
      <Button variant="contained" >Thêm Brand</Button>
      </div>
     
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Tạo thêm brand</h2>
        
          <TextField
          id="standard-textarea"
          label="Thêm brand mới "
          placeholder="..."
          multiline
          variant="standard"
         className="inputBrand"
        />

<TextField
          id="standard-textarea"
          label="Thêm slug"
          placeholder="..."
          multiline
          variant="standard"
          className="inputBrand"
        />

      <div  className="textimageBrand"> Ảnh brand : </div>
      <div
              className="imgbrand"
              onClick={() => targetupload.current.click()}
            >
              {baseImage.img === null ? (
                ""
              ) : (
                <img src={baseImage.img} width="100" height="100" />
              )}
            </div>
            <input
              ref={targetupload}
              type="file"
              onChange={(e) => handleUpload(e)}
              className="inputImage"
            />

            <div className="groupButtonBrand"> 
             <div  onClick={handleClose}> 
            <Button variant="contained" variant="outlined" >Hủy Tạo</Button> </div>
            <div>   <Button variant="contained" >Tạo mới</Button> </div>
            </div>
          
        </Box>

      </Modal>
      </div>
  );
}
