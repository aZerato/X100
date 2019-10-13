import listItemTpl from './listItem.js';

const listTpl = (items) =>
`<ul class="collection with-header">
    <li class="collection-header">
        <h4>Users List</h4>
    </li>
    ${items.map(item => listItemTpl(item)).join('')}
</ul>`;

export default listTpl;

