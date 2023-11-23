import { PropsWithChildren } from "react";
import "./RestContainer.css";
import RestCard from "./RestCard";

export default function RestContainer(props:any ) {
  return <div className="restaurants-container">
    {props.restData.map((data : any)  => {
        console.log(data)
        return (<RestCard key={data} id={data}></RestCard>)
        
    })}
    
  </div>;
}
