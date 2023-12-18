import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export default function MainContainer({children,} : PropsWithChildren) {

    return (
        <Container className="my-4">
            {children}
        </Container>
    )
}