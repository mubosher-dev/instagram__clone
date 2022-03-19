import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, TextField } from "@mui/material"
import { storage, db } from '../firebase';
import firebase from 'firebase';

function ImgUpload({ username }) {

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const fileUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "stated_changed",
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("instagram").add({
                            postCaption: caption,
                            postImg: url,
                            userName: username,
                            avatarImg: "https://i.ytimg.com/vi/sNC8GPvxzd4/maxresdefault.jpg"
                        })
                    })

                setImage(null)
                setCaption("")
            }
        )
    }

    return (
        <Wrapper>
            <TextField type={"text"}
                label="enter your comment"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="postCaption"
            />
            <input
                className='input__file postCaption'
                type={"file"} onChange={handleChange} />
            <Button
                className="postCaption"
                onClick={fileUpload}>
                Upload
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:fixed;
    bottom:0;
    padding: 20px;
    width:100%;
    background: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:0 0 4px 4px #333;
    z-index:30;
    .input__file{
        border: 1px solid lightgrey;
        margin:10px 0 ;
        padding:15px;
    }

    @media screen and (max-width:550px){
        flex-wrap: wrap;

        .postCaption{
            width:99%;
        }
        .postCaption:nth-child(3){
            border:1px solid lightgray !important;
        }
    }
`;

export default ImgUpload;
