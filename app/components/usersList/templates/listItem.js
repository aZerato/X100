const listItemTpl = (user) =>
`<li class="collection-item ${user.isSelected ? 'teal lighten-4' : ''}" data-id="${user.id}">
    ${user.name} 
    <span class="badge">${user.counter}</span>
</li>`;

export default listItemTpl;