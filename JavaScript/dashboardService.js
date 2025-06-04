/*tokenValidate();
 SERVICIO PARA USUARIOS 
function getUsers(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usuarios</h4>'
    fetch("https://reqres.in/api/users?page=1",{
        method: "GET", 
        headers: {
            "Content-type" : "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })

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
                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Avatar</th>
                        </tr>
                    </thead>
                <tbody>
        `
            response.body.data.forEach(user => {
                listUsers = listUsers.concat(`
                    <tr> 
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="Avatar del Usuario"></td>
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
*/
/* SERVICIO PARA USUARIOS 
function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Productos</h4>'
    document.getElementById('info').innerHTML = '' 
    fetch("https://reqres.in/api/unknown",{
        method: "GET", 
        headers: {
            "Content-type" : "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                    }
                })
        })
    
    .then((response) =>{
        if(response.status === 200){
            let listUsers = `
                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Year</th>
                            <th scope="col">Color</th>
                            <th scope="col">Pantone_Value</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.data.forEach(user => {
                listUsers = listUsers.concat(`
                    <tr> 
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.year}</td>
                        <td>${user.color}</td>
                        <td>${user.pantone_value}</td>
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
        
function logout(){
    localStorage.removeItem('token')
    location.href = '../index.html'
}
    
function tokenValidate(){
    const TOKEN = localStorage.getItem('token')
    if(TOKEN !== 'QpwL5tke4Pnpja7X4'){
        location.href = '../index.html'
    }
    console.log('Autenticado' , TOKEN)
}

function logout(){
    localStorage.removeItem('token')
    location.href = '../index.html'
}

function tokenValidate(){
    const TOKEN = localStorage.getItem('token')
    if(TOKEN !== 'QpwL5tke4Pnpja7X4'){
        location.href = '../index.html'
    }
    console.log('Autenticado' , TOKEN)
}*/