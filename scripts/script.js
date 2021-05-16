// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const header = document.querySelector('header')
const settings = header.querySelector('img');
const title = header.querySelector('h1');

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let count = 1;
      entries.forEach(entry => {
        const num = count;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', () =>{
          setState({state: 'entry', number: num, entry: newPost.entry});
        });
        count+=1;
      });
    });
});

window.addEventListener('popstate',(e)=>{
  setState(e.state);
})

settings.addEventListener('click',()=>{
  setState({state:'settings'});
});

title.addEventListener('click', ()=>{
  setState({state:'home'});
})
