import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Spinner from '../components/Spinner';


const Register = () => {
const navigate = useNavigate()
const [loading,setLoading] = useState(false)

    //form submit
    const submitHandler = async (values) => {
       try {
            setLoading(true)
            await axios.post('/users/register',values)
            message.success('Registration Successfull')
            setLoading(false)
            navigate('/login')
       } catch (error) {
            setLoading(false)
            message.error('something went wrong')

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
     {loading && <Spinner/>}
       <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register Form</h1>

        <div className='border-box'>
        <Form.Item label="Name" name="name" >
            <Input  placeholder="Enter Your Name"/>
        </Form.Item>
        <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter Your Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Enter Your Password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
        Already Register ?
            <Link to="/login">  Click Here to login </Link>
            <button className="btn btn-success">Register</button>
            </div>
        </div>
       </Form>
    
    </div>

    </>
  );
}

export default Register