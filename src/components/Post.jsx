import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from "../logo.svg";
import { Avatar, Button } from "@mui/material"
import { db } from '../firebase';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AppleIcon from '@mui/icons-material/Apple';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ForestIcon from '@mui/icons-material/Forest';

function Post({ userName, avatarImg, postImg, postCaption, id, username }) {

    const [post, setPosts] = useState("");
    const [comment, setComment] = useState([]);
    const [emoji, setEmoji] = useState(false);

    const comments = () => {
        if (post === "") {
            alert("Write a comment")
        }
        else {
            db.collection("instagram").doc(id).collection("massage").add({
                massage: post,
                username: username.displayName,
            })
            setPosts("");
        }
    }

    useEffect(() => {
        db.collection("instagram").doc(id).collection("massage").orderBy("username", 'asc').onSnapshot(snapshot =>
            setComment(
                snapshot.docs.map(doc => doc.data())
            )
        )
    }, [id])

    console.log("comments", comment);

    const emojiType = () => {
        if (emoji) {
            setEmoji(false)
        }
        else {
            setEmoji(true)
        }
    }

    return (
        <PostWrapper>
            <PostHeader>
                <AvatarImg src={avatarImg} />
                <h3>{userName}</h3>
            </PostHeader>

            <PostImg src={postImg} alt="Logo" />
            <PostComment>
                <PostCaption>
                    {userName} : <PostStrong> {postCaption} </PostStrong>
                </PostCaption>
                {comment.map((comment, index) => (
                    <PostCaption key={index}>
                        {comment.username}  : <PostStrong> {comment.massage} </PostStrong>
                    </PostCaption>
                ))}
            </PostComment>

            <PostEmoji show={emoji} >
                <SentimentSatisfiedAltIcon className="icon__modal" />
                <AppleIcon
                    onClick={() => setPosts("💻")}
                    className="icon__modal" />
                <RocketLaunchIcon
                    onClick={() => setPosts("🚀")}
                    className="icon__modal" />
                <ForestIcon
                    onClick={() => setPosts("🎄")}
                    className="icon__modal" />
                <PhoneIphoneIcon
                    onClikc={() => setPosts("☎️")}
                    className="icon__modal" />
            </PostEmoji>

            <PostFooter>
                {username?.displayName ? (
                    <>
                        <SentimentSatisfiedAltIcon
                            onClick={emojiType}
                            className="smile__icon" />
                        <input type="text"
                            placeholder='write comments'
                            onChange={e => setPosts(e.target.value)}
                            value={post} />
                        <Button
                            className="comment__btn"
                            onClick={comments}
                        >
                            Comment
                        </Button>
                    </>
                ) : (
                    <h3 style={{ color: "red" }}> Sorry please Login or Sign up </h3>
                )}
            </PostFooter>
        </PostWrapper>
    )
}

const PostWrapper = styled.div`
    max-width:500px;
    position: relative;
    background-color: #fff;
    border: 1px solid grey;
    margin: 20px auto;

    @media screen and (max-width:550px) {
        width: 100% !important;
    }
`;

const PostHeader = styled.div`
    display:flex;
    align-items: center;
    padding: 20px;
`;

const PostComment = styled.div`
    height:100px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none !important;
    }
`;

const PostEmoji = styled.div`
    width:200px;
    height: 50px;
    top: 85%;
    background: #fff;
    position: absolute;
    display:${props => props.show ? "flex" : "none"};

    .icon__modal{
        color:blue;
        margin: 10px;
        font-size: 20px;
    }
`;

const PostFooter = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border-top: 1px solid lightgray;
    h3 {
        margin:10px 0;
        font-size: 18px;
    }

    input{
        width:80%;
        border:none;
        outline: none;
        font-size:18px;
        text-transform:capitalize;
        color: #000;
        padding:10px 15px;
    }

    .comment__btn{
        color: #000 !important;
    }

    .smile__icon{
        color:yellow !important;
    }
`;

const PostImg = styled.img`
    width:100%;
    object-fit: contain;
    object-position:center;
    border-top:1px solid lightgray;
    border-bottom:1px solid lightgray;
`;


const PostCaption = styled.h4`
    font-weight: normal;
    padding: 20px;
`;

const PostStrong = styled.strong``;

const AvatarImg = styled(Avatar)`
    margin:0 10px !important;
    vertical-align: middle;
`;

export default Post
