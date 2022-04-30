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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { creatBrand, getBrand, deleteBrandApi, editBrandApi } from "../../api/apiClient"
import axios from "axios";
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
    const data = await getBrand()
    setDataList(data.data.brands.rows)

  }

  useEffect(() => {
    try {
      callApiList()
    } catch (error) {

    }

  }, [callList])

  const [baseImage, setBaseImage] = useState({
    img: null,
  });
   const [fileUp , setFileUp] = useState()
  const targetupload = useRef(null);
  
  const handleUpload = (e) => {
    const reader = new FileReader();
    console.log(e.target.files)
    setFileUp((e.target.files[0]))
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBaseImage({ img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const [form, setForm] = useState({
    brandName: '',
    slug: '',
  })
  const onChangInput = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    setForm({ ...form, [name]: value });
  };
    

  const formDataUploadServer = async () => {
    try {
      
      const data = {
        image: "https://res.cloudinary.com/oke-nhe/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1613809307/Screenshot_279_lian0d.png",
        brandName: form.brandName,
        slug: form.slug
      }
     
      const dataImage: any = new FormData();
      dataImage.append("file" , fileUp)
      dataImage.append("upload_preset","g4prsuzo")
     const resImage = await axios.post("https://api.cloudinary.com/v1_1/oke-nhe/image/upload",dataImage)
     console.log(resImage)
      await creatBrand(data)
      setCallList(!callList)
    } catch (error) {

    }
  }

  const [id, setId] = useState()
  const [openDelete, setOpenDelete] = useState(false)
  const openDeleteRow = (id) => {
    setOpenDelete(true)
    setId(id)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const deleteBrand = async () => {
    try {
      await deleteBrandApi(id)
      setOpenDelete(false)
      setCallList(!callList)
    } catch (error) {

    }

  }

  //

  const [openEdit, setOpenEdit] = useState(false)
  const openEditRow = async (id) => {
    try {
      setOpenEdit(true)
      setId(id)
      await editBrandApi(id)
    } catch (error) {

    }

  } 

  const [formEdit ,setFormEdit] = useState()

  const onChangInputEdit =(e)=>{
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setForm({ ...formEdit, [name]: value });
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const formEditDataUploadServer = async () => {
    try {
      await deleteBrandApi(id)
      setOpenDelete(false)
      setCallList(!callList)
    } catch (error) {

    }

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
              <TableCell>brand Name</TableCell>
              <TableCell align="left">Slug</TableCell>
              <TableCell align="left">Avatar</TableCell>
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
                  {row.brandName}
                </TableCell>
                <TableCell align="left">{row.slug}</TableCell>

                <TableCell align="left"><img src={row.image} alt="error" className="imgavatarbrand" /></TableCell>
                <TableCell align="left"> {(row.createdAt).slice(0, 10)}  </TableCell>

                <TableCell align="left">
                  <div className="groupIcon">
                    <DeleteForeverIcon className="icondelete" onClick={() => openDeleteRow(row.id)} />
                    < EditSharpIcon className="iconedit" onClick={() => openEditRow(row.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination count={10} color="primary" />
      </Stack>


      {/* Create */}
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
            name="brandName"
            value={form.brandName}
            onChange={onChangInput}
          />

          <TextField
            id="standard-textarea"
            label="Thêm slug"
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="slug"
            value={form.slug}
            onChange={onChangInput}
          />

          <div className="textimageBrand"> Ảnh brand : </div>
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
            <div onClick={handleClose}>
              <Button variant="contained" variant="outlined" >Hủy Tạo</Button> </div>
            <div>   <Button variant="contained" onClick={formDataUploadServer} >Tạo mới</Button> </div>
          </div>

        </Box>

      </Modal>

      {/* edit */}


      <Modal
        open={openEdit}
        onClose={handleCloseDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Sửa brand</h2>

          <TextField
            id="standard-textarea"
            label="Thêm brand mới "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="brandName"
            value={form.brandName}
            onChange={onChangInputEdit}
          />

          <TextField
            id="standard-textarea"
            label="Thêm slug"
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="slug"
            value={form.slug}
            onChange={onChangInputEdit}
          />

          <div className="textimageBrand"> Ảnh brand cũ : </div>
          <div
            className="imgbrand"
            onClick={() => targetupload.current.click()}
          >
            <img src={baseImage.img} width="100" height="100" />
          </div>

          <div className="groupButtonBrand">
            <div >
              <Button variant="contained" variant="outlined" onClick={handleCloseDelete}>Hủy Sửa</Button> </div>
            <div>   <Button variant="contained" onClick={formEditDataUploadServer} >Đồng ý</Button> </div>
          </div>

        </Box>

      </Modal>


      {/* xoa */}

      <Modal
        open={openEdit}
        onClose={handleCloseDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Bạn có chắc chắn xóa brand này không</h2>
          <div className="groupButtonBrand">
            <div >
              <Button variant="contained" variant="outlined" onClick={handleCloseDelete}>Hủy bỏ </Button> </div>
            <div>   <Button variant="contained" onClick={deleteBrand} >Đồng ý</Button> </div>
          </div>

        </Box>

      </Modal>

    </div>
  );
}
