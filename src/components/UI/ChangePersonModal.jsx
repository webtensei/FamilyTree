import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const ChangePersonModal = ({nodeData, open, handleClose,onSubmit}) => {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [gender,setGender] = useState('')
    const [bdate,setBdate] = useState('')



    useEffect(()=>{
        setName(nodeData?.attributes.name)
        setSurname(nodeData?.attributes.surname)
        setGender(nodeData?.attributes.gender)
        setBdate(dayjs(`${nodeData?.attributes.bdate}`))
    },[nodeData])

    const changePerson = () =>{
        const changedPersonData = {
            name,
            surname,
            gender,
            bdate:bdate.$d.toLocaleDateString()
          }
          onSubmit(nodeData.id, changedPersonData)
          handleClose()
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    return (
        <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
            <FormControl>
            <Typography variant='h5'>Изменить информацию </Typography>
                <Stack direction={'column'} spacing={2}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Мужчина" checked={gender==='М'?true:false} onClick={e=>setGender('М')}/>
                        <FormControlLabel value="female" control={<Radio />} label="Женщина"  checked={gender!=='М'?true:false} onClick={e=>setGender('Ж')}/>
                    </RadioGroup>

                    <TextField id="outlined-basic" label="Имя" value={name} variant="outlined" onChange={e=>{setName(e.target.value)}}/>
                    <TextField id="outlined-basic" label="Фамилия" variant="outlined" value={surname} onChange={e=>{setSurname(e.target.value)}}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'Дата рождения'} value={bdate} onChange={(e) => setBdate(e)}
/>
                    </LocalizationProvider>
                </Stack>
                <Button variant='outlined' color='success' onClick={changePerson} sx={{marginTop:2}}>Обновить</Button>

            </FormControl>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};

export default ChangePersonModal;