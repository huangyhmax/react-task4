import React, {Component} from 'react';

export default class SignInForm extends Component {
    render(){
        return(
            <form className="signIn" onSubmit={this.props.onSubmit}> 
                <div className="row">
                    <label className="user">用户名</label>
                    <input type="text" placeholder="Enter your name" value={this.props.formData.username}
                    onChange={this.props.onChange.bind(this,'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" placeholder="Enter your password" value={this.props.formData.password}
                    onChange={this.props.onChange.bind(this,'password')}/>
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                    <div>
                        <a href="#" className="forget" onClick={this.props.onForgotPassword}>忘记密码了？</a>
                    </div>
                    
                </div>
            </form>
        )
    }
}
