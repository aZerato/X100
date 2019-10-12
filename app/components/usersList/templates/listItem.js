const listItemTpl = (user) =>
`<li class="collection-item" data-id="${user.id}">
    ${user.name}
</li>`;

export default listItemTpl;