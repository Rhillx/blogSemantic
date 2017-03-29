(function(){ //IIFE : Immediatly invoked function expression.

  function GET(url) {
      return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('GET', url);
          request.onload = () => {
              const data = JSON.parse(request.responseText);
              resolve(data)
          };
          request.onerror = (err) => {
              reject(err)
          };
          request.send();
      });
  } // GET

  function POST(url, data) {
      return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('POST', url);
          request.setRequestHeader('Content-Type', 'application/json');

          request.onload = () => {
              const data = JSON.parse(request.responseText);
              resolve(data)
          };
          request.onerror = (err) => {
              reject(err)
          };

          request.send(JSON.stringify(data));
      });
  } // POST

  function PUT(url, data) {
      return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('PUT', url);
          request.setRequestHeader('Content-Type', 'application/json');

          request.onload = () => {
              const data = JSON.parse(request.responseText);
              resolve(data)
          };
          request.onerror = (err) => {
              reject(err)
          };

          request.send(JSON.stringify(data));
      });
  } // POST

  function DELETE(url, data) {
      return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('DELETE', url);
          request.setRequestHeader('Content-Type', 'application/json');

          request.onload = () => {
              const data = JSON.parse(request.responseText);
              resolve(data)
          };
          request.onerror = (err) => {
              reject(err)
          };

          request.send(JSON.stringify(data));
      });
  } // DELETE


  //Render funtions

  function renderToPage(blogItems){
    const container = document.querySelector('.js-blogPost')
    container.innerHTML = "";
    $('.js-modal-holder').empty()


    for(const blogItem of blogItems){
      const div = document.createElement('div')
      div.innerHTML =
`<h3 class="main-title">${blogItem.data.title}</h3>
  <p class="main-body">${blogItem.data.blog}</p>
`;

      div.classList.add('ui','centered','aligned','ten','column','grid')
      container.appendChild(div)

        const modal = `
        <div class="ui small modal js-modal-${blogItem.id}">
          <div class="header">Edit/Delete Blog</div>
          <div class="content">
            <div class="ui form">
              <input class="blogtitle js-updatedblogtitle" placeholder="Blog Title" value="${blogItem.data.title}"/><br />
              <textarea class="blogbody js-updatedblogbody" placeholder="Blog Body">${blogItem.data.blog}</textarea>
            </div>
            </div>
            <div class="actions">
              <div class="ui approve green button js-re-submit">Re-Submit</div>
              <div class="ui cancel red button js-delete">Delete</div>
          </div>
        </div>
        `;

        const modalParent = document.createElement('div');
        modalParent.innerHTML = modal;

        $('.js-modal-holder').append(modalParent)

        const deletebtn = modalParent.querySelector('.js-delete')
        deletebtn.addEventListener('click', (e)=>{
              $('.js-modal-holder').empty()
                  const {id} = blogItem;


              DELETE('/api/blog/' + id)
                  .then((data) => {
                      renderToPage(data);
                      renderToList(data);
                      // window.location.href ='/'
                  })
                  .catch((e) => {
                      alert(e)
                  });
        })



        const update = document.querySelector('.js-re-submit')
          update.addEventListener('click', (e)=>{
              const {id} = blogItem;
              // console.log(document.querySelector('.js-updatedblogbody').value)
              PUT('/api/blog/'+ id, {
                blog: document.querySelector('.js-updatedblogbody').value,
                title: document.querySelector('.js-updatedblogtitle').value
              })
              .then((data)=>{
                // console.log(blogItem);
                renderToPage(data);
                renderToList(data);
                // window.location.href = '/'
              })
              .catch((e)=>{
                alert(e)
              })
          })





      }
    }

  function renderToList(blogItems){
    const panel = document.querySelector('.js-panel')
    panel.innerHTML = "";
    for(const blogItem of blogItems){
      const id = blogItem.id

      const button= document.createElement('button')
      button.innerHTML =
  `${blogItem.data.title}`

      button.classList.add('ui','inverted','teal','fluid','button','jsedit')
      panel.appendChild(button)

      button.addEventListener('click', (e)=>{
        button.classList.remove('teal');
        $(`.js-modal-${blogItem.id}`).modal('show');
    })


  }
}















  //calling functions

  GET('/api/blogs')
    .then((blogItems) => {
      // console.log(blogItems);
      renderToPage(blogItems);
      renderToList(blogItems);
  });





  const createbtn = document.querySelector('.js-create')
    createbtn.addEventListener('click', (e)=>{
    // console.log('button clicked!');
    $('.fullscreen.modal').modal('toggle')
  });

  const submit= document.querySelector('.js-submit')
    submit.addEventListener('click', ()=>{

    const input = document.querySelector('.js-title');
    const body = document.querySelector('.js-textArea')
    input.setAttribute('disabled', 'disabled');
    body.setAttribute('disabled', 'disabled');

    POST('/api/blogs', {
      title: input.value,
      blog: body.value,
      when: new Date().getTime() + 9 * 60 * 60 * 1000
    }).then((data) => {
      input.removeAttribute('disabled');
      body.removeAttribute('disabled');
      input.value = '';
      body.value = '';
      window.location.href = '/';
  })

});

  const editDelbtn = document.querySelector('.js-edit-delete')
  editDelbtn.addEventListener('click', (e)=>{
    // console.log('edit clicked');
    $('.ui.sidebar').sidebar('toggle')
  });



})();
