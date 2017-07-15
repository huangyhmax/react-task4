import React, { Component } from 'react';
import './UserDialog.css';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInOrSignUp from './SignInOrSignUp'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud';
import logo from './img/clipboard.svg'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }
    // switch(e){
    //     this.setState({
    //         selected: e.target.value
    //     })
    // }
    signUp(e){
        e.preventDefault()
        let {email, username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
            console.log(user)  //user>>>leanCloud.js>>>var user
            console.log(1)
        }
        let error = (error)=>{
            // alert(error)
            switch(error.code){
                case 202:
                    alert('用户名已被占用')
                break
                default:
                    alert(error)
                break
            }
        }
        signUp(email, username, password, success, error)
    }


    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            // alert(error)
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                break
                default:
                    alert(error)
                break
            }
        }
        signIn(username, password, success, error)
    }

    changeFormData(key, e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value //!!!!![key]
        this.setState(stateCopy)
        console.log(this.state.formData.username)
        console.log(this.state.formData.password)
    }

    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)  
    }

    render(){
        return (
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <div className="pics">
                    <img src={logo} alt="欢迎图标"/>                    
                    <h4>Welcom to <strong>To Do List</strong></h4>
                </div>
            {this.state.selectedTab === 'signInOrSignUp' ? <SignInOrSignUp
                    formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}
                /> : <ForgotPasswordForm
                formData={this.state.formData}
                onSubmit={this.resetPassword.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onSignIn={this.returnToSignIn.bind(this)}
                />}
            </div>
        </div>
        )
    }
    
}