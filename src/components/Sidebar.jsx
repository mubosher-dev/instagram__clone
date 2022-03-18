import React from 'react'
import styled from "styled-components"
import { Button } from "@mui/material"

function Sidebar() {
    return (
        <Wrapper>
            <Button className="btn">  Instagram </Button>
            <Button className="btn"> Facebook </Button>
            <Button className="btn"> Google </Button>
            <Button className="btn"> Amazom </Button>
            <Button className="btn"> Telegram </Button>
            <Button className="btn"> Whatsap </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:300px;
    height: 100vh;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    flex-direction: column;

    .btn{
        padding:10px;
        color: red;
        text-align: left !important;
    }
`;

export default Sidebar