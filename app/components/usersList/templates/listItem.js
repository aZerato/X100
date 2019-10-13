const listItemTpl = (user) =>
`<li class="collection-item" data-id="${user.id}">
    ${user.name} 
    <span class="badge">${user.counter}</span>
</li>`;

export default listItemTpl;