import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
const PersonCard = (nodeData,handleNodeAdd, handleNodeDelete,handleNodeChange) => {

  const { nodeDatum } = nodeData;
  const returnNodeInfo = () =>{
    handleNodeAdd(nodeDatum)
  }
  const returnNodeId = () =>{
    handleNodeDelete(nodeDatum.id)
  }
  const returnNodeChangeInfo = () =>{
    handleNodeChange(nodeDatum)
  }
    return (
      <g>
      <foreignObject width={400} height={250} x={0} y={-75}>
      <Paper component={Stack} direction={'row'} className="card-so-wrapper" elevation={2} style={{width:'max-content', borderRadius:24, justifyContent:'space-evenly'}} sx={nodeDatum.attributes.gender==='М'?{bgcolor:'cyan'}:{bgcolor:'pink'}}>
        <Stack p={2} spacing={1}>
            <Typography variant='h6'>{nodeDatum.attributes.name} {nodeDatum.attributes.surname} </Typography>
            <Typography>{nodeDatum.attributes.gender}</Typography>
            <Typography>{nodeDatum.attributes.bdate}</Typography>
            <Stack direction={'row'}><Button size='small' startIcon={<EditIcon/>} onClick={returnNodeChangeInfo}>Изменить</Button>{nodeDatum.id !== 'root'? <Button size='small' startIcon={<PersonRemoveIcon/>} onClick={returnNodeId}>Удалить</Button> : <></>}</Stack>
        </Stack>
        {nodeDatum.children?<Button sx={{transform:'rotate(90deg)'}} onClick={returnNodeInfo}>Добавить</Button>:<></>}
      </Paper>
      </foreignObject>

      </g>

    )}
export default PersonCard;




