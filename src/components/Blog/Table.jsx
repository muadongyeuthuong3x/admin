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
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { creatBrand, getBrand, deleteBrandApi, editBrandApi, updateBrandApi, createBlog } from "../../api/apiClient"
import { ToastContainer, toast } from 'react-toastify';
import { imageUpload } from "../../helper/imageUpload";
import TextEditor from "../Editor/Editor";
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
      toast.error(error.response.data.message)
    }

  }, [callList])

  const [baseImage, setBaseImage] = useState({
    img: null,
  });
  const [fileUp, setFileUp] = useState()
  const targetupload = useRef(null);
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
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBaseImage({ img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (err) {
      console.log("err roi nhe!")
    }
    setImages([...images, ...newImages])
  }

  //bsse create

  const [form, setForm] = useState({
    title: '',
    summary: '',
    content:''
  })
  const onChangInput = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    console.log(name+value)
    setForm({ ...form, [name]: value });
  };

  //end



  const formDataUploadServer = async () => {

    try {

      if ((form.title).length > 1 && (form.summary).length > 1) {

        const res = await imageUpload(images);
        const data = {
          image: res[0].url,
          ...form
        }
        await createBlog(data)
        setBaseImage('')
        toast.success("Tạo blog thành công")
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
      await deleteBrandApi(id)
      setOpenDelete(false)
      setCallList(!callList)
      toast.success("Xóa brand thành công")
    } catch (error) {

    }

  }

  //

  const [dataEdit, setDataEdit] = useState({
    brandName: '',
    slug: '',
    image: '',
    id:id
  })
  const [openEdit, setOpenEdit] = useState(false)
  const openEditRow = async (id) => {
    try {
      setOpenEdit(true)
      setId(id)
      const data = await editBrandApi(id)
      setDataEdit({
        brandName: data.data.brand.brandName,
        slug: data.data.brand.slug,
        image: data.data.brand.image,
        id:id
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
    console.log(baseImage)
    try {
      if (baseImage.img !=null &&(dataEdit.brandName).length > 1 && (dataEdit.slug).length > 1) {
        const res = await imageUpload(images);
        const data = {
          image: res[0].url,
          brandName: dataEdit.brandName,
          slug: dataEdit.slug,
          id:id
        }
        await updateBrandApi(data)
        setBaseImage('')
        toast.success("Sửa brand thành công")
        setOpenEdit(false)
        setCallList(!callList)
      }
      else if((dataEdit.brandName).length > 1 && (dataEdit.slug).length > 1) {
        const data = {
          image: dataEdit.image,
          brandName: dataEdit.brandName,
          slug: dataEdit.slug,
          id:id
        }
        await updateBrandApi(data)
        setBaseImage('')
        toast.success("Sửa brand thành công")
        setOpenEdit(false)
        setCallList(!callList)
      }
      else {
        toast.error("Tất cả các trường phải có")
      }


    } catch (error) {

    }

  }

  const handleChangeContent=(newState) => {
    setForm({ ...form, content: newState });
    console.log(newState)
  }

  return (
    <div className="TableBrand">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick />
      <div className="brandCreate" onClick={handleOpen}>
        <Button variant="contained" >Tạo blog mới</Button>
      </div>


      <div className="TableBrandScroll">
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
        <Box sx={{ ...style, width: 1200, position:'relative' }}>
          <h2 id="parent-modal-title">Tạo Blog</h2>

          <TextField
            id="standard-textarea"
            label="Tiêu đề blog"
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="title"
            value={form.title}
            onChange={onChangInput}
          />
          <TextField
            id="standard-textarea"
            label="Tóm tắt"
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="summary"
            value={form.summary}
            onChange={onChangInput}
          />
          <div className="textimageBrand"> Content: </div>
          <div style={{
            height:380,
            marginTop:5,
            // marginBottom:30,
            paddingBottom:50,
          }}>
            <TextEditor  onEditorStateChange={handleChangeContent}/>
          </div>

          <div className="textimageBrand"> Ảnh blog : </div>
          <div
            className="imgbrand"
            onClick={() => targetupload.current.click()}
          >
            {baseImage.img === null ? (
             <>
             <PhotoIcon/>
             </>
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
            <div onClick={handleClose}>
              <Button  variant="outlined" >Hủy Tạo</Button> </div>
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
              <Button  variant="outlined" onClick={handleCloseEdit}>Hủy Sửa</Button> </div>
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
              <Button  variant="outlined" onClick={handleCloseDelete}>Hủy bỏ </Button> </div>
            <div>   <Button variant="contained" onClick={deleteBrand} >Đồng ý</Button> </div>
          </div>

        </Box>

      </Modal>

    </div>
  );
}
