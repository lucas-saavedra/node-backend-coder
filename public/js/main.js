let socket = io('http://localhost:8080/');
const submitMessage = (e) => {
  e.preventDefault();
  socket.emit('newMessage', {
    socketId: socket.id,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  });
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}
const submitProduct = (e) => {
  e.preventDefault();
  socket.emit('newProduct', {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  });
  document.getElementById('title').value = '';
  document.getElementById('price').value = '';
  document.getElementById('thumbnail').value = '';
}


(async () => {
  try {
    const template = await fetch('http://localhost:8080/templates/productList.ejs');
    const templateToTex = await template.text();
    const productList = await fetch('http://localhost:8080/api/productos-test');
    const { products } = await productList.json()
    let html = ejs.render(templateToTex, { products });
    document.getElementById('productList').innerHTML = html;
  } catch (error) {
    console.log(error.message);
  }

})()


socket.on('messages', (messages) => {
  fetch('http://localhost:8080/templates/chatList.ejs')
    .then(response => response.text())
    .then(data => {
      let html = ejs.render(data, { messages, id: socket.id });
      document.getElementById('chatList').innerHTML = html;
    });

}) 
