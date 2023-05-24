import React, { useState } from 'react';
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

const AddPerson = ({ open, handleClose, onSubmit}) => {
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
      const [gender, setGender] = useState('')
      const [name, setName] = useState('')
      const [surname, setSurname] = useState('')
      const [bdate, setBdate] = useState('')
      const createPerson = (e) =>{
        const personData = {
          name,
          surname,
          gender,
          bdate:bdate.$d.toLocaleDateString()
        }
        onSubmit(personData)
        handleClose()
      }
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
            <Typography variant='h5'>Добавить нового члена </Typography>
                <Stack direction={'column'} spacing={2}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Мужчина" onClick={e=> setGender('М')} />
                        <FormControlLabel value="female" control={<Radio />} label="Женщина" onClick={e =>setGender('Ж')} />
                    </RadioGroup>

                    <TextField id="outlined-basic" label="Имя" variant="outlined" value={name} onChange={e=>setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Фамилия" variant="outlined" onChange={e=>setSurname(e.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker label={'Дата рождения'} onChange={(newValue)=>{setBdate(newValue)}}/>
                    </LocalizationProvider>
                </Stack>
                <Button variant='outlined' color='success' onClick={createPerson} sx={{marginTop:2}}>Добавить</Button>

            </FormControl>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};

export default AddPerson;