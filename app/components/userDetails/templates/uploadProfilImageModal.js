const UploadProfilImageModalTpl = (user) =>
    `<div class="modal">
        <div class="modal-content">
            <h4>Are you sure ?</h4>
            <p>Update the ${user.name}'s profile image ?</p>
            <input type="file" />
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-red btn-flat" data-action="Upload">
                Upload
            </a>
        </div>
    </div>`;

export default UploadProfilImageModalTpl;