import EventManager from '../../managers/eventManager.js';
import EventsType from '../../managers/eventsType.js';

import deleteUserModalTpl from './templates/uploadProfilImageModal.js';

export default class UploadProfilImageModalComponent {
    componentName = 'uploadProfilImageModal';
    usersService;
    
    user = undefined;
    fileReady = false;

    constructor(appDom, usersService) {      
        this.dom = appDom.querySelectorAll(`[data-component='${this.componentName}']`)[0];
        
        this.usersService = usersService;
    }

    initializeComponent() {
        this.eventsListeners();
    }

    render() {
        if (this.user !== undefined)
        {
            this.dom.innerHTML = deleteUserModalTpl(this.user);
            this.domModal = this.dom.querySelectorAll('.modal')[0];
            this.modalInstance = M.Modal.init(this.domModal);
            this.modalInstance.open();
            this.fileReady = false;
            this.btnsBinding();
        }
    }

    eventsListeners() {
        let self = this;

        EventManager.subscribe(EventsType.UserSelectedForImg, (user) => { self.showModal(user) });
    }

    showModal(user) {
        this.user = user;
        this.render();
    }

    btnsBinding() {
        let self = this;

        this.inputUpload = this.dom.querySelectorAll('input[type=file]')[0];
        this.inputUpload.addEventListener('change', () => {
            let file = self.inputUpload.files[0];
            if (file !== undefined)
            {
                let reader = new FileReader();
                reader.addEventListener('load', (event) => {
                    self.user.img = event.target.result;
                    self.fileReady = true;
                });

                reader.readAsDataURL(file);
            }
            else self.fileReady = false;
        });

        this.btnUpload = this.dom.querySelectorAll('[data-action="Upload"]')[0];
        this.btnUpload.addEventListener('click', () => {
            if (self.fileReady === true)
            {
                self.usersService.update(self.user);
            }
        });
    }
}