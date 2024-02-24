import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {
const [loading,setLoading] = useState(false)
const navigate = useNavigate()
    //form submit
    const submitHandler = async (values) => {
       try {
           setLoading(true)
           const {data} = await axios.post('/users/login',values)
           setLoading(false)
           message.success('login Success')
           localStorage.setItem('user',
           JSON.stringify({...data.user, password:' '})
           );
           navigate('/');
       } catch (error) {
            message.error('something went wrong')
            setLoading(false)
       }
    };

     // prevent for login user
     useEffect(() => {
        if(localStorage.getItem('user')){
            navigate("/");
        }
    },[navigate]);
    
  return (
    <>
        <div className="register-page">
         {loading && <Spinner /> }
        <Form layout="vertical" onFinish={submitHandler}>
        <h1>Login Form</h1>

        <div className='border-box'>
        
        <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter Your Name" />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter Your Name" />
        </Form.Item>
        <div className="d-flex justify-content-between">
        Not a user ? 
            <Link to="/register">Click Here to register </Link>

        </div>
        <div>
        <button className="btn btn-success " >Login</button>
        </div>
        </div>
       </Form>
        </div>
    </>
  )
}

export default Login;