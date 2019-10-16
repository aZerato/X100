const userRandomTpl = (selection) =>
    `<div class="col s4"></div>
    <div class="col s4">
        <a class="waves-effect waves-light btn 
            ${selection.status === 0 ? "red pulse" : selection.status === 1  ? "cyan" : "orange pulse" }" 
            style="width: 100%; height: 100px; margin: 50px 0; display: flex;"
            data-action="StartSelection">
            <p style="margin: auto; text-align: center; font-size: 20px;">
              ${selection.text}
            </p>
        </a>
    </div>
    <div class="col s4"></div>`;

export default userRandomTpl;

