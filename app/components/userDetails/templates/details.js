const css = './app/components/userDetails/styles/uploadProfilImageModal.css';

const detailsTpl = (user) =>
`<div class="card" data-id="${user.id}">
        <div class="card-image">
            <img data-action="uploadProfilImg" src="${user.img}">
            <a class="btn-floating halfway-fab waves-effect waves-light blue"
                style="right: 68px;"
                data-action="addCount">
                <i class="material-icons">add</i>
            </a>
            <a class="btn-floating halfway-fab waves-effect waves-light red"
                data-action="removeCount">
                <i class="material-icons">remove</i>
            </a>
        </div>
        <div class="card-content">
            <p>${user.name} is currently at ${user.counter}</p>
        </div>
        <div class="card-action">
            <a href="#"
                data-action="deleteUser">
                Delete user
            </a>
        </div>
      </div>

      <div data-component="deleteUserModal"></div>
      
      <div data-component="uploadProfilImageModal"></div>
      <link rel="stylesheet" type="text/css" href="${css}">`;

export default detailsTpl;

