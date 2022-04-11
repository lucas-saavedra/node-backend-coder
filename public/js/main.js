let socket = io('http://localhost:8080/');
const submitMessage = (e) => {
  e.preventDefault();
  const author = {
    id: document.getElementById('email').value,
    nombre: document.getElementById('name').value,
    apellido: document.getElementById('lastName').value,
    edad: document.getElementById('age').value,
    avatar: document.getElementById('avatar').value,
    alias: document.getElementById('alias').value,
  }
  const message = document.getElementById('message').value;

  socket.emit('newMessage', {
    socketId: socket.id,
    author,
    text: message
  });

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

const author = new normalizr.schema.Entity('author');
const msg = new normalizr.schema.Entity('msg', {
  author: author
}, { idAttribute: '_id' });

const msgs = new normalizr.schema.Entity('msgs', {
  authors: [author],
  messages: [msg]
});
socket.on('messages', (messages) => {
  fetch('http://localhost:8080/templates/chatList.ejs')
    .then(response => response.text())
    .then(data => {

      const messagesDeNorm = normalizr.denormalize(messages.result, msgs, messages.entities);
      const compresion = (JSON.stringify(messagesDeNorm).length * 100) / JSON.stringify(messages).length;
      let html = ejs.render(data, { messages: messagesDeNorm.messages, idSocket: socket.id, compresion: Math.round(100 - compresion) });
      document.getElementById('chatList').innerHTML = html;
    });

}) 
