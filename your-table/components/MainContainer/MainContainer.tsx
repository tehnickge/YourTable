import { PropsWithChildren } from "react";

export default function MainContainer({children,} : PropsWithChildren) {

    return (
        <div className="main_container mx-0 md:mx-20 bg-gray-400 h-screen">
            {children}
        </div>
    )
}