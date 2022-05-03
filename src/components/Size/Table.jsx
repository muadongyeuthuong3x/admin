
import React, { useState, useRef, useEffect } from "react";
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
import TextField from '@mui/material/TextField';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {  creatSizeApi , getSizeApi , editSizeApi , updateSizeApi , deleteSizeApi} from "../../api/apiClient"
import { ToastContainer, toast } from 'react-toastify';

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


export default function BasicTable() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [dataList, setDataList] = useState()
  const [callList, setCallList] = useState(false)
  const callApiList = async () => {
    const data = await getSizeApi()
    setDataList(data.data.sizes.rows)
  }


  useEffect(() => {
    try {
      callApiList()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [callList])

  const [form, setForm] = useState({
    sizeNumber:''
  })

  const onChangInput = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setForm({ ...form, [name]: value });
  };

  const formDataUploadServer = async () => {
    try {
      if ((form.sizeNumber).length > 1 ) {
        const data = {
          sizeNumber: form.sizeNumber,
        }
          await creatSizeApi(data)
          toast.success("Tạo Size thành công")
          setCallList(!callList)
          setOpen(false)
        }
       else {
        toast.error("Tất cả các trường phải có")
      }
    } catch (error) {
      toast.error(error)
    }
  }
 
  const [id, setId] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const openDeleteRow = (id) => {
    setOpenDelete(true)
    setId(id)
  }

  const deleteSize = async()=>{
    try {
      console.log(id)
      await deleteSizeApi(id)
      toast.success("Xóa Size thành công")
      setOpenDelete(false)
      setCallList(!callList)
    } catch (error) {
      
    }
  }
  const handleCloseDelete= ()=>{
   setOpenDelete(false)
  }
 //edit 
 const [dataEdit, setDataEdit] = useState({
  sizeNumber:''
})
const [openEdit, setOpenEdit] = useState(false)
const openEditRow = async (id) => {
  try {
    setOpenEdit(true)
    setId(id)
    const data = await editSizeApi(id)
    setDataEdit({
      sizeNumber: data.data.size.typeName,
    })
  } catch (error) {

  }

}

const onChangInputEdit = (e) => {
  var target = e.target;
  var name = target.name;
  var value = target.value;
  setDataEdit({ ...dataEdit, [name]: value });
}
const handleCloseEdit = () => {
  setOpenEdit(false)
}
const formEditDataUploadServer = async () => {
  try {
    if ((dataEdit.sizeNumber).length > 1 ) {
      const data = {
        sizeNumber: dataEdit.sizeNumber,
        id:id
      }
      await updateSizeApi(data)
      toast.success("Sửa Type thành công")
      setOpenEdit(false)
      setCallList(!callList)
    }
    else {
      toast.error("Tất cả các trường phải có")
    }


  } catch (error) {

  }

}

  return (
    <div className="TableBrand">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick />
      <div className="brandCreate" onClick={handleOpen}>
        <Button variant="contained" >Thêm Size</Button>
      </div>


      <div className="TableBrandScroll">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Size </TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {!!dataList && dataList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.sizeNumber}
                  </TableCell>
                  <TableCell align="left"> {(row.createdAt).slice(0, 10)}  </TableCell>

                  <TableCell align="left">
                    <div className="groupIcon">
                      <DeleteForeverIcon className="icondelete" onClick={() => openDeleteRow(row.id)} />
                      <EditSharpIcon className="iconedit" onClick={() => openEditRow(row.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <Stack spacing={2}>
        <Pagination count={10} color="primary" />
      </Stack> */}


      {/* Create */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Tạo thêm size</h2>

          <TextField
            id="standard-textarea"
            label="Thêm Size mới "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="sizeNumber"
            value={form.sizeNumber}
            onChange={onChangInput}
          />


          <div className="groupButtonBrand">
            <div onClick={handleClose}>
              <Button variant="contained" variant="outlined" >Hủy Tạo</Button> </div>
            <div>   <Button variant="contained" onClick={formDataUploadServer} >Tạo mới</Button> </div>
          </div>

        </Box>

      </Modal>

      {/* edit */}


      <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Sửa Size</h2>
    
              <TextField
                id="standard-textarea"
                label="Edit size "
                placeholder="..."
                multiline
                variant="standard"
                className="inputBrand"
                name="sizeNumber"
                value={dataEdit.sizeNumber}
                onChange={onChangInputEdit}
              />
    
              <div className="groupButtonBrand">
                <div >
                  <Button variant="contained" variant="outlined" onClick={handleCloseEdit}>Hủy Sửa</Button> </div>
                <div>   <Button variant="contained" onClick={formEditDataUploadServer} >Đồng ý</Button> </div>
              </div>
    
            </Box>
    
          </Modal>
    
    
          {/* xoa */}
          
          <Modal
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Bạn có chắc chắn xóa type này không</h2>
              <div className="groupButtonBrand">
                <div >
                  <Button variant="contained" variant="outlined" onClick={handleCloseDelete}>Hủy bỏ </Button> </div>
                <div>   <Button variant="contained" onClick={deleteSize} >Đồng ý</Button> </div>
              </div>
    
            </Box>
    
          </Modal>
    </div>
  );

}