import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react'
import '../App.css'
import firebase from '../firebase.js';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            color: '',
            icon: '',
            friends: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('friends');
        const friend = {
            name: this.state.name,
            color: this.state.color,
            icon: this.state.icon
        }
        itemsRef.push(friend);
        this.setState({
            name: '',
            color: '',
            icon: ''
        });
    }
    componentDidMount() {
        const friendsRef = firebase.database().ref('friends');
        friendsRef.on('value', (snapshot) => {
            let friends = snapshot.val();
            let newState = [];
            for (let friend in friends) {
                newState.push({
                    id: friend,
                    name: friends[friend].name,
                    color: friends[friend].color,
                    icon: friends[friend].icon
                });
            }
            this.setState({
                friends: newState
            });
        });
    }
    removeFriend(friendId) {
        const friendRef = firebase.database().ref(`/friends/${friendId}`);
        friendRef.remove();
    }
    render() {
        return (
            <div className='app'>
                <div className="wrapper">
                    <h1>Friends List</h1>
                </div>
                <div className='container'>
                    <section className='add-item'>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
                            <input type="text" name="color" placeholder="Color" onChange={this.handleChange} value={this.state.color} />
                            <input type="text" name="icon" placeholder="Icon" onChange={this.handleChange} value={this.state.icon} />
                            <button>Add Player</button>
                        </form>
                    </section>
                    <section className='display-item'>
                        <div className="wrapper">
                            <ul>
                                {this.state.friends.map((friend) => {
                                    return (
                                        <li key={friend.id}>
                                            <h3>{friend.name}</h3>
                                            <p>Color: {friend.color}</p>
                                            <p>Icon: {friend.icon}</p>
                                            <button onClick={() => this.removeFriend(friend.id)}>Delete Player</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
export default Registration;