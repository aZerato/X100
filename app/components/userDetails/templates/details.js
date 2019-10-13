const detailsTpl = (user) =>
`<div class="card" data-id="${user.id}">
        <div class="card-image">
          <img src="${user.img}">
        </div>
        <div class="card-content">
            <p>${user.name}</p>
        </div>
        <div class="card-action">
            <p>Is currently at ${user.counter}</p>
            <a class="btn-floating btn-large waves-effect waves-light blue"
                data-action="addCount">
                <i class="material-icons">add</i>
            </a>
            <a class="btn-floating btn-large waves-effect waves-light red"
                data-action="removeCount">
                <i class="material-icons">remove</i>
            </a>
        </div>
      </div>`;

export default detailsTpl;

