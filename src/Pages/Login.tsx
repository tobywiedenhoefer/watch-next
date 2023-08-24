import { useState } from 'react'

import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import Password from 'antd/es/input/Password';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

type FieldType = {
    email?: string,
    password?: string
}

const Login = () => {
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false);
    const onFinish = (values: FieldType) => {
        signInWithEmailAndPassword(auth, values.email!, values.password!)
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                setLoginFailed(true);
            })
    };
    const { Title } = Typography

    return (
        <div className='form-padding'>
            <Title 
                level={4} 
                className='form-title'
            >
                Log In
            </Title>
            <div className='center-container'>
                <Form 
                    name='login' 
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    labelAlign='left'
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter an email!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please enter a password!'}]}
                    >
                        <Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='form-error'>
                {loginFailed ? 
                        <Space direction='horizontal' style={{ maxWidth: 600 }}>
                            <Alert
                                message="Something went wrong."
                                description="Try re-entering your email and password and try submitting again."
                                type='error'
                                closable
                                onClose={() => {
                                    setLoginFailed(false)
                                }}
                            />
                        </Space> : null }
            </div>
        </div>
    )
}

export default Login