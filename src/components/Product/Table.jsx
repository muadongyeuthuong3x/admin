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
import { getType ,postProduct ,getProduct ,deleteProductApi } from "../../api/apiClient"
import { ToastContainer, toast } from 'react-toastify';
import { imageUpload } from "../../helper/imageUpload";
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
  const [images, setImages] = useState([])
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [baseImage, setBaseImage] = useState({
    img: null,
  });

  //image
  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []
    files.forEach(file => {
      if (!file) return err = "File does not exist."

      if (file.size > 1024 * 1024 * 5) {
        return err = "The image largest is 5mb."
      }

      return newImages.push(file)
    })
    if (err) {
      console.log("err roi nhe!")
    }
    setImages([...images, ...newImages])
  }

  //bsse create
  
  const [dataList, setDataList] = useState()
  const [callList, setCallList] = useState(false)
  const [listProduct , setListProduct] = useState()
  const callApiList = async () => {
    const data = await getType()
    setDataList(data.data.types.rows)
  }
  const getProductApi = async()=>{
    const data = await getProduct ()
    setListProduct(data.data.products.rows)
  }
  useEffect(() => {
    try {
      callApiList()
      getProductApi()
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }, [callList])

  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    discount:'',
    slug:'',
    summary:'',
    typeId:'',
    image:'',
    typeId:''
  })

  useEffect(() => {
    try {
      callApiList()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [callList])


  const onChangInput = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setForm({ ...form, [name]: value });
  };




  const formDataUploadServer = async () => {
    
    try {

      if ((form.productName).length > 1 && (form.productPrice).length > 1 && (form.slug).length>1 && (form.summary).length>1 &&(form.typeId) !=0) {
        const res = await imageUpload(images);
        const arr = [];
        for(var i = 0 ; i< res.length ; i ++){
        arr.push(res[i].url)
        }
        const data = {
          image: arr.toString(),
          productName: form.productName,
          slug: form.slug,
          summary:form.summary,
          discount:form.discount,
          productPrice:form.productPrice,
          typeId:form.typeId
        }
        setImages([])
        await postProduct(data)
        setBaseImage('')
        toast.success("Tạo brand thành công")
        setCallList(!callList)
        setOpen(false)
      } else {
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
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const deleteBrand = async () => {
    try {
      await deleteProductApi(id)
      setOpenDelete(false)
      setCallList(!callList)
      toast.success("Xóa product thành công")
    } catch (error) {

    }

  }

  //


  const [openEdit, setOpenEdit] = useState(false)


 

  const  openEditRow = (data:any)=>{

  }



  return (
    <div className="TableBrand">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick />
      <div className="brandCreate" onClick={handleOpen}>
        <Button variant="contained" >Thêm Product</Button>
      </div>


      <div className="TableBrandScroll">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>	productName </TableCell>
                <TableCell align="left">productPrice</TableCell>
                <TableCell align="left">discount</TableCell>
                <TableCell align="left">	slug </TableCell>
                <TableCell align="left">		summary  </TableCell>
                <TableCell align="left">	image </TableCell>
                <TableCell align="left">	createdAt </TableCell>
                <TableCell align="left">Status</TableCell>


              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {!!listProduct && listProduct.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.productName}
                  </TableCell>
                  <TableCell align="left">{row.productPrice}</TableCell>

                  <TableCell align="left">{row.discount}</TableCell>
                  <TableCell align="left">{row.slug}</TableCell>
                  <TableCell align="left">{row.summary}</TableCell>
                  <TableCell align="left"><img src={(row.image).split(",")[0]} alt="error" className="imgavatarbrand" /></TableCell>
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
          <h2 id="parent-modal-title">Tạo thêm brand</h2>

          <TextField
            id="standard-textarea"
            label="Thêm tên product mới "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="productName"
            value={form.productName}
            onChange={onChangInput}
          />

<TextField
           
            label="Giá product mới "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            type="number"
            name="productPrice"
            value={form.productPrice}
            onChange={onChangInput}
          />

<TextField
          
            label="Giảm product mới "
            placeholder="..."
            type="number"
            multiline
            variant="standard"
            className="inputBrand"
            name="discount"
            value={form.discount}
            onChange={onChangInput}
          />

<TextField
            id="standard-textarea"
            label="Slug "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="slug"
            value={form.slug}
            onChange={onChangInput}
          />

<TextField
            id="standard-textarea"
            label="summary"
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="summary"
            value={form.summary}
            onChange={onChangInput}
          />

            <div className="optionBrand">
            <label>Danh sách Product</label>
            <select name="typeId"     value={form.typeId}  onChange={onChangInput}>

            {!!dataList&& dataList.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.typeName}
                    </option>
                  );
                })}

            </select>
          </div>

          <div className="textimageBrand"> Ảnh Product: </div>
     <input type="file" multiple onChange={handleChangeImages} />

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
          <h2 id="parent-modal-title">Sửa brand</h2>

          <TextField
            id="standard-textarea"
            label="Thêm brand mới "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="brandName"
            value={dataEdit.brandName}
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
            value={dataEdit.slug}
            onChange={onChangInputEdit}
          />

          <div className="textimageBrand"> Ảnh brand cũ : </div>
          <div
            className="imgbrand"
          >
            <img src={dataEdit.image} width="100" height="100" />
          </div>

          <div className="textimageBrand"> Ảnh brand mới : </div>
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
            multiple
            accept="image/*"
            onChange={handleChangeImages}
            // onChange={(e) => handleUpload(e)}
            className="inputImage"
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
