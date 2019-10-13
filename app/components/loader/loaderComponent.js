import loaderTpl from './templates/loader.js';

export default class LoaderComponent {

    static render(appDom) {
        this.domElements = appDom.querySelectorAll(`[data-component]`);

        this.domElements.forEach(dom => {
            dom.innerHTML = loaderTpl;
        });
    }
}