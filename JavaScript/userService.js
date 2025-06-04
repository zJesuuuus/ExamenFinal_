function getUsers(page){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usuarios</h4>'
    fetch('https://fakestoreapi.com/users')
    
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })

    .then((response) =>{
        if(response.status === 200){
            let listUsers = `
                <table class="table table-danger fst-italic">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                <tbody>
        `
            response.body.forEach(user => {
                listUsers = listUsers.concat(`
                    <tr class="fst-italic"> 
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" onclick="showInfoUser('${user.id}')">View</button>
                        </td>
                    </tr>
                    `)
            });

            listUsers = listUsers.concat(`
                    </tbody>
                </table>
                `)
            document.getElementById('info').innerHTML = listUsers
        }
        else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron Usuarios</h3>'
        }
    })   
}