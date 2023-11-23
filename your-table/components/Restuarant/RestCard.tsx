import Link from "next/link";
import "./RestCard.css"
import RestCardInfo from "./RestCardInfo";

export default function RestCard(props: any) {


  return (
    <div className="card-restaurant">
      <label>id {props.id}</label>
      <div className="card-restaurant__photos">
        <image>Image</image>
        </div>
      <div className="card-restaurant__name">
        <label>Name</label>
      </div>
      <RestCardInfo></RestCardInfo>
    </div>
  );
}
