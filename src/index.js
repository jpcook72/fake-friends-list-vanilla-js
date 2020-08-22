import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');



/*const render = (friends)=> {
  const ul = document.querySelector('ul');
  const error = document.querySelector('#error');
  error.innerText = '';
  friends.sort((a, b)=> b.rating - a.rating);
  const html = friends.map( friend => {
    return `
      <li data-id='${friend.id}'>
        <h2>${ friend.name }</h2>
        <span>${ friend.rating }</span>
        <button data-id='${friend.id}'>+</button><button data-id='${friend.id}'>-</button><button data-id='${friend.id}'>x</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
};

const init = async()=> {
  const response = await axios.get('/api/friends');
  let friends = response.data;
  render(friends);
  const ul = document.querySelector('ul');
  const form = document.querySelector('form');
  const error = document.querySelector('#error');

  ul.addEventListener('click', async(ev)=> {
    if(ev.target.tagName === 'BUTTON'){
      if(ev.target.innerHTML === 'x'){
        const id = ev.target.getAttribute('data-id')*1;
        await axios.delete(`/api/friends/${id}`); 
        friends = friends.filter(friend => friend.id !== id); 
        render(friends);
      }
      else {
        const id = ev.target.getAttribute('data-id')*1;
        const friend = friends.find(item => item.id === id);
        const increase = ev.target.innerHTML === '+';
        friend.rating = increase ? ++friend.rating : --friend.rating;
        await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating }); 
        render(friends);
      }
    }
  });

  form.addEventListener('submit', async(ev)=> {
    ev.preventDefault();
    try {
      const response = await axios.post('/api/friends');
      friends.push(response.data);
      render(friends);
    }
    catch(ex){
      error.innerText = ex.response.data.error;
    }s
  });
};

init();*/

const FriendList = (props) => {
  const friendArr = props.friends.map( friend =>       
  <li data-id={friend.id} key={friend.id}>
    <h2>{ friend.name }</h2>
      <span>{ friend.rating }</span>
    <button data-id={friend.id} onClick={props.buttonClicks}>+</button>
    <button data-id={friend.id} onClick={props.buttonClicks}>-</button>
    <button data-id={friend.id} onClick={props.buttonClicks}>x</button>
  </li>
)
  return friendArr;
}

class Friends extends React.Component{
  constructor(){
    super()
    this.state={
      friends:[],
    }
    this.buttonClicks = this.buttonClicks.bind(this);
  }
  async buttonClicks(ev) {
    console.log(ev);
    if(ev.target.innerHTML === 'x'){
      const id = ev.target.getAttribute('data-id')*1;
      await axios.delete(`/api/friends/${id}`); 
      friends = this.state.friends.filter(friend => friend.id !== id);
    }
    else {
      const id = ev.target.getAttribute('data-id')*1;
      const friend = this.state.friends.find(item => item.id === id);
      const increase = ev.target.innerHTML === '+';
      friend.rating = increase ? ++friend.rating : --friend.rating;
      await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating });
    }
  }
  async componentDidMount() {
    try {
      const response = await axios.get('/api/friends');
      let friends = response.data;
      console.log('in component did mount', friends);
      await this.setState({ friends: friends })
    }
    catch(err) {
      console.log('did not mount');
    }
  }
  render(){
  return(     
    <div>
      <h1>Friends (The List)</h1>
      <form>
        <button>Create</button>
      </form>
      <div id='error'></div>
      <ul>
        <FriendList friends={this.state.friends} buttonClicks={ this.buttonClicks }/>
      </ul>
    </div>
  )}

  }
ReactDOM.render(
  <Friends />,
  document.getElementById('app')
);
