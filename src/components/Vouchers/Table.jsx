
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
import DatePicker from 'react-date-picker';
import moment from "moment"
import {
  creatVouchersApi,
  getVouchersApi,
  deleteVouchersApi,
  editVouchersApi,
  updateVouchersApi
} from "../../api/apiClient"
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
    const data = await getVouchersApi()
    setDataList(data.data.vouchers.rows)
  }


  useEffect(() => {
    try {
      callApiList()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [callList])

  const [form, setForm] = useState({
    voucherName: '',
    voucherPercent: '',
    amount: '',
    startDate: new Date(),
    endDate: new Date()
  })

  const onChangInput = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setForm({ ...form, [name]: value });
  };
  const [endTime, setEndTime] = useState(new Date())

  const [startTime, setStartTime] = useState(new Date())
  const onChangInputStartTime = (e) => {
    const timeS = new Date(e)
    if (timeS.getTime() > endTime.getTime()) {
      toast.error("Th???i gian b???t ?????u ph???i nh??? h??n th???i gian k???t th??c")
    } else {

      setStartTime(timeS);
    }
  }

  const onChangInputEndTime = (e) => {
    const timeE = new Date(e)
    if (startTime.getTime() > timeE.getTime()) {
      toast.error("Th???i gian k???t th??c ph???i l???n h??n th???i gian b???t ?????u")
    } else {
      setEndTime(timeE);
    }
  }

  const formDataUploadServer = async () => {
    try {
      if ((form.voucherName).length > 1 &&
        (form.voucherPercent).length > 1 && (form.amount).length > 1) {
        const data = {
          voucherName: form.voucherName,
          voucherPercent: form.voucherPercent,
          amount: form.amount,
          startDate: startTime,
          endDate: endTime
        }
        await creatVouchersApi(data)
        toast.success("T???o Voucher th??nh c??ng")
        setCallList(!callList)
        setOpen(false)
      }
      else {
        toast.error("T???t c??? c??c tr?????ng ph???i c??")
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

  const deleteSize = async () => {
    try {
      console.log(id)
      await deleteVouchersApi(id)
      toast.success("X??a Vouchers th??nh c??ng")
      setOpenDelete(false)
      setCallList(!callList)
    } catch (error) {

    }
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  //edit 
  const [dataEdit, setDataEdit] = useState({
    voucherName: '',
    voucherPercent: '',
    amount: '',
  })
  const [openEdit, setOpenEdit] = useState(false)
  const openEditRow = async (id) => {
    try {
      setOpenEdit(true)
      setId(id)
      const data = await editVouchersApi(id)
      setDataEdit({
        voucherName: data.data.voucher.voucherName,
        voucherPercent: data.data.voucher.voucherPercent,
        amount: data.data.voucher.amount,
      })
      const timeS = new Date(data.data.voucher.startDate)
      setStartTime(
        timeS
      )
      const timeE = new Date(data.data.voucher.endDate)
      setEndTime(timeE)
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
      console.log( (dataEdit.voucherPercent))
      if ((dataEdit.voucherName).length > 1 &&
        (dataEdit.voucherPercent) > 1 && (dataEdit.amount) > 1 ) {
        const data = {
          voucherName: dataEdit.voucherName,
          voucherPercent: dataEdit.voucherPercent,
          amount: dataEdit.amount,
          startDate: startTime,
          endDate: endTime,
          id: id
        }
        await updateVouchersApi(data)
        toast.success("S???a Voucher th??nh c??ng")
        setOpenEdit(false)
        setCallList(!callList)
      }
      else {
        toast.error("T???t c??? c??c tr?????ng ph???i c??")
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
        <Button variant="contained" >Th??m Voucher</Button>
      </div>


      <div className="TableBrandScroll">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>voucherName </TableCell>
                <TableCell>	voucherPercent </TableCell>
                <TableCell>	amount</TableCell>
                <TableCell>startDate </TableCell>
                <TableCell>	endDate </TableCell>
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
                    {row.voucherName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.voucherPercent}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {(row.startDate).slice(0, 10)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {(row.endDate).slice(0, 10)}
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
          <h2 id="parent-modal-title">T???o th??m vouchers</h2>

          <TextField
            id="standard-textarea"
            label="Th??m voucherName m???i "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="voucherName"
            value={form.voucherName}
            onChange={onChangInput}
          />

          <TextField
            id="standard-textarea"
            label="Th??m voucherPercent m???i "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="voucherPercent"
            value={form.voucherPercent}
            onChange={onChangInput}
          />

          <TextField
            id="standard-textarea"
            label="Th??m s??? l?????ng  "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="amount"
            value={form.amount}
            onChange={onChangInput}
          />

          <div>
            <label>Ng??y b???t ?????u </label>
            <br />
            <DatePicker onChange={onChangInputStartTime} value={startTime} className="startDate" />
          </div>


          <div>
            <label>Ng??y k???t th??c </label>
            <br />
            <DatePicker onChange={onChangInputEndTime} value={endTime} className="startDate" />
          </div>



          <div className="groupButtonBrand">
            <div onClick={handleClose}>
              <Button variant="contained" variant="outlined" >H???y T???o</Button> </div>
            <div>   <Button variant="contained" onClick={formDataUploadServer} >T???o m???i</Button> </div>
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
          <h2 id="parent-modal-title">S???a Voucher</h2>

          <TextField
            id="standard-textarea"
            label="S???a voucherName "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="voucherName"
            value={dataEdit.voucherName}
            onChange={onChangInputEdit}
          />

          <TextField
            id="standard-textarea"
            label="Th??m voucherPercent m???i "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="voucherPercent"
            value={dataEdit.voucherPercent}
            onChange={onChangInputEdit}
          />

          <TextField
            id="standard-textarea"
            label="Th??m s??? l?????ng  "
            placeholder="..."
            multiline
            variant="standard"
            className="inputBrand"
            name="amount"
            value={dataEdit.amount}
            onChange={onChangInputEdit}
          />

          <div>
            <label>Ng??y b???t ?????u </label>
            <br />
            <DatePicker onChange={onChangInputStartTime} value={startTime} className="startDate" />
          </div>


          <div>
            <label>Ng??y k???t th??c </label>
            <br />
            <DatePicker onChange={onChangInputEndTime} value={endTime} className="startDate" />
          </div>


          <div className="groupButtonBrand">
            <div >
              <Button variant="contained" variant="outlined" onClick={handleCloseEdit}>H???y S???a</Button> </div>
            <div>   <Button variant="contained" onClick={formEditDataUploadServer} >?????ng ??</Button> </div>
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
          <h2 id="parent-modal-title">B???n c?? ch???c ch???n x??a type n??y kh??ng</h2>
          <div className="groupButtonBrand">
            <div >
              <Button variant="contained" variant="outlined" onClick={handleCloseDelete}>H???y b??? </Button> </div>
            <div>   <Button variant="contained" onClick={deleteSize} >?????ng ??</Button> </div>
          </div>

        </Box>

      </Modal>
    </div>
  );

}