import {Container, Typography} from '@mui/material'

const NotFound = () => {
   return <Container sx={{padding: "3rem 0", textAlign:"center"}}>
    <Typography variant='h1' fontWeight={"bold"}>
      404
    </Typography>
    <Typography variant='h6' fontWeight={"bold"}>
      Page not found!
    </Typography>
   </Container>;
}
 
export default NotFound