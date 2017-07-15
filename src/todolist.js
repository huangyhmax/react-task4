/*JSX写todolist*/

import React,{Component} from 'react';
import {render} from 'react-dom';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStorage from './localStorage';
import './todolist.css';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut} from './leanCloud';
// import {setData} from './Storage';

// const TodoContainer=document.getElementById('container');

export default class Listtodo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: getCurrentUser() || {},
            newTodo:'',
            add:'',
            todoList:localStorage.load('todoList') || []
        }
            
        
    }
    render(){
        
        // let todos=this.state.todoList.map((item,index)=>{
        let todos = this.state.todoList
        .filter((item)=> !item.deleted)
        .map((item,index)=>{
            return (
                // <li>
                // <input type="checkbox" className="chexb"/>
                // <input type="text" className="listcxt" value={item.title} />
                // <span className="delicon">x</span>
                // </li>
            
                <TodoItem 
                    todos={item} 
                    onToggle={this.toggle.bind(this)}
                    onDelete={this.delete.bind(this)}
                />
            )        
        })
        let mainpanel=(
            <div>
                <h1>{this.state.user.username||'My '} To do List
                {this.state.user.id ? <button className="loginout" onClick={this.onsignOut.bind(this)}>退出登录</button> : null}
                </h1>
                <TodoInput content={this.state.newTodo} 
                    onChange={this.changeTitle.bind(this)}
                    onSubmit={this.addTodo.bind(this)} />
                <ul className="items">
                    {todos}
                </ul>
                
            </div>
        )
        let deletepanel=(
            <span>面板二</span>

        )
        let userdig=(
            <div>
                {this.state.user.id ? 
                    null : 
                    <UserDialog 
                        onSignUp={this.onSignUp.bind(this)}
                        onSignIn={this.onSignIn.bind(this)}/>}
            </div>
        )
        // console.log(todos)
        return(
            <div>
                <Todonew>
                    <section name="备忘录">{mainpanel}</section>
                    <section name="回收站">{deletepanel}</section>
                </Todonew>
                <div>
                    {userdig}
                </div>
            </div>
        )
    }
    componentDidUpdate(){
        localStorage.save('todoList',this.state.todoList)
    }
    onSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
    }
    onsignOut(){
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
        
    }
    onSignUp(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
    }
    toggle(e, todo){
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state)
        //localStorage.save('todoList',this.state.todoList)
    }
    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
        // localStorage.save('todoList',this.state.todoList)
    }
    addTodo(event){
        this.state.todoList.push({
            title: event.target.value,
            status: null,
            deleted: false
        })
        this.setState({
            newTodo: '',
            todoList: this.state.todoList
        })
        // localStorage.save('todoList',this.state.todoList)
        
    }
    delete(event, todos){
        todos.deleted = true
        this.setState(this.state) 
        // localStorage.save('todoList',this.state.todoList)
    }
}

class Todonew extends Component{
    constructor(props){
        super(props);
        this.state={
            currentIndex:0,
        }
    }
    render(){
        
        return (
            <div  className="aa">
                <nav>
                    <ul>
                        {React.Children.map(this.props.children,
                            (element,index)=>(
                                <li className={this.addTitleClass(index)}
                                onClick={this.changeTab.bind(this,index)}>
                                     {element.props.name}                                     
                                </li>
                            )
                        )}
                    </ul>
                </nav>
                <div>
                        {React.Children.map(this.props.children,
                            (element,index)=>(
                                <div className={this.addPanelClass(index)}>
                                     {element}
                                </div>
                                )
                        )}
                </div>
            </div>

        )   
    }
    changeTab(index){
        this.setState({
            currentIndex: index
        })
        console.log(111)
    }
    addTitleClass(index){
        return index==this.state.currentIndex?'noteclass active':'noteclass';
    }
    addPanelClass(index){
        return index==this.state.currentIndex?'right hover':'right';
    }
}
