import { PropsWithChildren } from "react";


export default function MainContainer({children,} : PropsWithChildren) {

    return (
        <div className="main_container">
            {children}
        </div>
    )
}