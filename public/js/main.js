let socket = io('http://localhost:8080/');

const submitMessage = (e) => {
  e.preventDefault();
  socket.emit('newMessage', {
    socketId: socket.id,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  })
}
const submitProduct = (e) => {
  e.preventDefault();
  socket.emit('newProduct', {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  })
}

socket.on('products', (products) => {
  fetch('http://localhost:8080/templates/productList.ejs')
    .then(response => response.text())
    .then(data => {
      let html = ejs.render(data, { products });
      document.getElementById('productList').innerHTML = html;
    });
})
socket.on('messages', (messages) => {
  fetch('http://localhost:8080/templates/chatList.ejs')
    .then(response => response.text())
    .then(data => {
      let html = ejs.render(data, { messages, id: socket.id });
      document.getElementById('chatList').innerHTML = html;
    });

}) 
