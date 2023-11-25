import { PropsWithChildren } from "react";
import "./MainContainer.css"


export default function MainContainer({children,} : PropsWithChildren) {

    return (
        <div className="main_container">
            {children}
        </div>
    )
}