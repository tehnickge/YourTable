import Link from "next/link";
import RestCardInfo from "./RestCardInfo";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function RestCard(props: any) {
  return (
    <Card sx={{ position: 3, }} variant="elevation">
      <Link href={`restaurants/${props.resData.id}`}>
       <CardActionArea sx={{
        height: [`100%`],
        backgroundColor: [`rgb(230,243,251)`],
        background: [`radial-gradient(circle, rgba(230,243,251,0.4766281512605042) 0%, rgba(248,229,255,0.4766281512605042) 100%)`]
      }}>
        <CardMedia
          component="img"
          height="1400"
          width="140"
          image={props.resData?.photos[0]}
          alt="green iguana"
          
        />
        <CardContent className=" h-full">
          <Typography gutterBottom variant="h4" component="div">
          {props.resData?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.resData?.info}
          </Typography>
          <RestCardInfo resData={props.resData}></RestCardInfo>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}
