function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de usuarios</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando...</p>';
  
    fetch('https://fakestoreapi.com/users')
      .then(r => r.json())
      .then(users => {
        let table = `
        <button type="button" class="btn btn-outline bg-danger-subtle" onclick="addUser()"><i class="fa-solid fa-user-plus"></i></button>
          <table class="table table-hover fst-italic bg-danger-subtle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Nombre de Usuario</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
        `;
        users.forEach(u => {
          table += `
            <tr>
              <td>${u.id}</td>
              <td>${u.name.firstname} ${u.name.lastname}</td>
              <td>${u.username}</td>
              <td>
                <button class="btn btn-outline-danger btn-sm" onclick="viewUserDetail(${u.id})">
                  Ver
                </button>
              </td>
            </tr>
          `;
        });
        table += '</tbody></table>';
        document.getElementById('info').innerHTML = table;
      })
      .catch(() =>
        (document.getElementById('info').innerHTML =
          '<p>Error al cargar la lista de usuarios.</p>')
      );
  }

  function viewUserDetail(userId) {
    fetch(`https://fakestoreapi.com/users/${userId}`)
      .then(r => r.json())
      .then(u => {
        const modalHTML = `
          <div class="modal fade fst-italic" id="modalUser" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Usuario #${u.id}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <p><strong>Nombre:</strong> ${u.name.firstname} ${u.name.lastname}</p>
                  <p><strong>Usuario:</strong> ${u.username}</p>
                  <p><strong>Username:</strong> ${u.username}</p>
                  <p><strong>Telefono:</strong> ${u.phone}</p>
                  <p><strong>Direccion:</strong> ${u.address.city}, ${u.address.street} #${u.address.number}</p>
                </div>
              </div>
            </div>
          </div>`;
        document.getElementById('showModal').innerHTML = modalHTML;
        new bootstrap.Modal('#modalUser').show();
      })
      .catch(() => alert('No se pudo obtener el detalle del usuario.'));
  }
  function showModalUser(user){
    console.log ('UserModal', user)
    const modalUser = `
        <div class="modal fade fst-italic" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user"></i> Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${user.avatar}" class="card-img-top" alt="User Avatar">
                    <div class="card-body">
                        <h5 class="card-title">Info User</h5>
                        <p class="card-text">First Name : ${user.first_name}</p>
                        <p class="card-text">Last Name : ${user.last_name}</p>
                        <p class="card-text">Email : ${user.email}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}

function addUser(){
    const modalUser = `
        <div class="modal fade fst-italic" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Add User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <form id="formAddUser">
                        <div class="mb-3">
                                <label for="idUser" class="form-label">ID: </label>
                                <input type="number" class="form-control" id="idUser" placeholder="Id input " required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email: </label>
                                <input type="email" class="form-control" id="email" placeholder="Email input " required>
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username: </label>
                                <input type="text" class="form-control" id="username" placeholder="Username input" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password: </label>
                                <input type="password" class="form-control" id="password" placeholder="Password input" required>
                            </div>
                            <div class="mb-3 text-center">
                                <button class="btn btn-success" type="submit" onclick="saveUser()"><i class="fa-solid fa-floppy-disk"></i> Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}

function saveUser(){
    const form = document.getElementById('formAddUser')
    if(form.checkValidity()){
        const idUser = document.getElementById('idUser').value
        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const userData = {idUser, email, username, password}

        fetch("https://fakestoreapi.com/users", {
        method: "POST", 
        headers: {
            "Content-type" : "application/json",
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify(userData)
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
        .then((response)=>{
            if(response.status === 201){
                document.getElementById('info').innerHTML = '<h3>The user was register success!</h3>'
            }
            else{
                document.getElementById('info').innerHTML = '<h3>The user was register error!</h3>'
            }
            const modalId = document.getElementById('modalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
        form.reportValidity()
    }
}