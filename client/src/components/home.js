import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import '../App.css';
import logo from '../icinema.png'
import  styled  from "styled-components";


export class Home extends React.Component{
    
    render(){
       
                return(
                    
            <Container className="container">
                
            <div className="top">
            <img src={logo} />
         <NavLink className="signIn-btn" to="/login">Sign In </NavLink>
       </div>
     
       <div className="content">
           <Title>Number one place to come see your favourite movie</Title>
           <SubTitle> Book Tickets Online now!</SubTitle>
           
           <Link className="signUp-btn" to="/register">Get started</Link>
        
         
       </div>
       </Container>
              
                );
    }
}


const Container = styled.div`
.signIn-btn{
   right: 0;
   margin: 1.125rem 3% 0;
   padding: 0.4375rem 1.0625rem;
   font-weight: 400;
   line-height: normal;
   border-radius: 0.1875rem;
   fone-size: 1rem;
   background: var(--main-red);
   position: absolute;
   color: white;
   translate: transform(-50%, -50%);
   cursor: pointer;
   transition: background 0.2s ease-in;
   &:hover{
       background: var(--main-red-hover);
   }
}

// Header Top
.top{
    position: relative;
    height: 10 rem;
    z-index: 1;
}

//Header Content
.content{
    width: 65%;
    position: relative;
    margin: 4.5rem auto 0;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    flex-direction: column;
    z-index: 1;
}

// sign up button
.signUp-btn{
    display: inline-block;
    background: var(--main-red);
    text-transform: uppercase;
    border: none;
    outline: none;
    margin: 0 33%;
    padding: 1.5rem;
    border-radius: 0.1875rem;
    font-size: 2rem;
    color: white;
    text-align: center;
    box-shadow: 0 1px 0 rgba(0,0,0,0.45);
    transition: background 0.2s ease-in;
    cursor:pointer;
    &:hover{
        background: var(--main-red-hover);
    }
}

`;
 
// Main Title
const Title = styled.h1`
margin: 0 0 1.2rem;
font-size: 4rem;
color: white;
font-weight: 700;
line-height: 1.1em;

`;

// Sub Title
const SubTitle = styled.h2`
margin: 0 0 1.875rem;
font-size: 1.875rem;
color: white;
font-weight: 400;
line-height: 1.25em;
text-transform: uppercase;

`;
