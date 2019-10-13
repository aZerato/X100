const DeleteUserModalTpl = (user) =>
    `<div class="modal">
        <div class="modal-content">
            <h4>Are you sure ?</h4>
            <p>Delete the user ${user.name} ?</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-red btn-flat" data-action="Yes">
                Yes
            </a>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat" data-action="No">
                No
            </a>
        </div>
    </div>`;

export default DeleteUserModalTpl;