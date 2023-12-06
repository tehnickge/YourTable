import RestCard from "./RestCard";

export default function RestContainer(props:any ) {
  return <div className="restaurants-container">
    {props.restData.map((data : any)  => {
        return (<RestCard key={data} id={data}></RestCard>)
    })}
    
  </div>;
}
