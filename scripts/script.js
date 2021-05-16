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
          window.history.pushState({state: 'entry', number: num, entry: newPost.entry},'','/Lab7//#entry' + num);
          setState({state: 'entry', number: num, entry: newPost.entry});
        });
        count+=1;
      });
    });
});

window.addEventListener('popstate',(e)=>{
  if(e.state==null){
    setState({state:'home'});
  }
  else if(e.state.state=="entry"){

    setState({state: 'entry', number: e.state.number, entry: e.state.entry});
  }
  else{
    setState({state:'home'});
  }
  
})

settings.addEventListener('click',()=>{
  var where = window.location.href.split("#");
  if(where.length==1 || where[1]!="settings"){
    window.history.pushState({state:'settings'},'','/Lab7/#settings');
    setState({state:'settings'});
  }
  
});

title.addEventListener('click', ()=>{
  var where = window.location.href.split("#");
  if(where.length!=1){
    window.history.pushState({state:'home'}, "", window.location.origin);
    setState({state:'home'});
  }
  
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('worked');
    }, function(err) {
      // registration failed :(
        console.log('doesnt worked');
    });
  });
}