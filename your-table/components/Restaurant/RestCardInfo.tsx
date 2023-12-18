import Typography from '@mui/material/Typography';

export default function RestCardInfo(props: any) {
  return (
    <>
      <div className="card-restaurant__address">
      <Typography variant='h6'>
        Кухни: {props.resData.typeKitchen.join(", ")}
        </Typography>
      </div>
      <div className="card-restaurant__kitchen">
        <Typography variant='h6' gutterBottom>{props.resData.address}</Typography>
      </div>
    </>
  );
}