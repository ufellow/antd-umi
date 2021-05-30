import styles from './index.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react'
import { connect } from 'dva';
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
        console.log(this.props)
        this.clickHandle()
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.login_form_container}>
                <div style={{ margin: '0 auto' }}> <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '输入6到10位密码！', pattern: /^[A-Za-z0-9]{6,10}$/g }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className={styles.login_form_forgot} href="">
                            Forgot password
          </a>
                        <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                            Log in
          </Button>
          Or <a href="">register now!</a>
                    </Form.Item>
                </Form></div>
            </div>
        );
    }
    clickHandle = () => {
        console.log(this.props)
        this.props.dispatch({
            type: 'loginmodel/login'
        })
    }
}

// export default Form.create({ name: 'normal_login' })(NormalLoginForm);
const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.loginmodel.userInfo
    }
}
export default connect(mapStateToProps)(Form.create({ name: 'normal_login' })(NormalLoginForm));