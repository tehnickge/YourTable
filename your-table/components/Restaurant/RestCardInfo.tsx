import Typography from '@mui/material/Typography';
import { Kitchen } from '@prisma/client';

export default function RestCardInfo(props: any) {
  return (
    <>
      <div className="card-restaurant__address">
      <Typography variant='h6'>
        Кухни: {props.resData.kitchens.map((kitchen : Kitchen)=> kitchen.type).join(", ")}
        </Typography>
      </div>
      <div className="card-restaurant__kitchen">
        <Typography variant='h6' gutterBottom>{props.resData.address.city}</Typography>
      </div>
    </>
  );
}