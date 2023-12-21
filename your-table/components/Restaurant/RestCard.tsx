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
       <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.resData?.photos[0]}
          alt="green iguana"
          
        />
        <CardContent>
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
