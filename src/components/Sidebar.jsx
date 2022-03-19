import React from 'react'
import styled from "styled-components"
import { Button } from "@mui/material"

function Sidebar({ username }) {
    return (
        <Wrapper>
            <div className="userWrapper">
                <img src="https://nevomusic.net/wp-content/uploads/2019/10/Alisher-Fayz-ava.jpg" alt="userImg" />
                {username?.displayName ? (
                    <h4>{username.displayName}</h4>
                ) : (<></>)}
            </div>
            <UserSubscribeDisplay>
                <div className='user__subscribe'>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/57003102?v=4" alt="my_teacher_friend" />
                    </div>
                    <div>
                        <h4>Javohir Dev</h4>
                        <p>18 years old web developer</p>
                    </div>
                    <div>
                        <Button>Subscribe</Button>
                    </div>
                </div>
                <div className='user__subscribe'>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/57003102?v=4" alt="my_teacher_friend" />
                    </div>
                    <div>
                        <h4>Javohir Dev</h4>
                        <p>18 years old web developer</p>
                    </div>
                    <div>
                        <Button>Subscribe</Button>
                    </div>
                </div>

                <div className='user__subscribe'>
                    <div>
                        <img src="https://avatars.githubusercontent.com/u/57003102?v=4" alt="my_teacher_friend" />
                    </div>
                    <div>
                        <h4>Javohir Dev</h4>
                        <p>18 years old web developer</p>
                    </div>
                    <div>
                        <Button>Subscribe</Button>
                    </div>
                </div>

            </UserSubscribeDisplay>
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

   .userWrapper{
       display:flex;
       align-items:center;
       justify-content: center;

       img{
           width:100px;
           height: 100px;
           border-radius: 100%;
           object-fit: cover;
       }

       h4{
           margin:0 10px;
           text-transform: capitalize;
       }
   }
`;

const UserSubscribeDisplay = styled.div`
    .user__subscribe{
        display:flex;
        align-items: center;
        justify-content: center;

        img{
            width: 70px;
            border-radius: 50%;
        }
        div{
            padding: 10px;
        }
        div:nth-child(2){
            padding: 0;
            overflow-x:scroll;
            ::-webkit-scrollbar{
                display: none;
            }
            h4{
                font-size: 14px;
            }
            p{
                font-size:10px;
                letter-spacing: 1.5px;
                color: lightgray;
            }
        }
    }
`;

export default Sidebar
