function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de productos</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando...</p>';
  
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(products => {
        /* tarjetas en grid */
        const grid = products
          .map(
            p => `
            <button type="button" class="btn btn-outline-danger" onclick="addProduct()">Agregar Producto</button>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div class="card h-100 shadow-sm bg-danger-subtle">
              <img src="${p.image}" class="card-img-top" style="object-fit:contain;height:180px" />
              <div class="card-body d-flex flex-column">
                <h6 class="card-title">${p.title}</h6>
                <p class="text-danger fw-bold">$${p.price}</p>
                <button class="btn btn-outline-danger btn-sm mt-auto" onclick="showProduct(${p.id})">
                  Ver detalle
                </button>
              </div>
            </div>
          </div>`
          )
          .join('');
  
        document.getElementById('info').innerHTML =
          '<div class="row">' + grid + '</div>';
      })
      .catch(() =>
        (document.getElementById('info').innerHTML =
          '<p>Error al cargar los productos.</p>')
      );
  }

  function showProduct(prodId) {
    fetch(`https://fakestoreapi.com/products/${prodId}`)
      .then(r => r.json())
      .then(p => {
        const modalHTML = `
          <div class="modal fade" id="modalProduct" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">${p.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-5 text-center">
                      <img src="${p.image}" class="img-fluid rounded" />
                    </div>
                    <div class="col-md-7">
                      <p class="h4 text-success">$${p.price}</p>
                      <p>${p.description}</p>
                      <p><strong>Categoría:</strong> ${p.category}</p>
                      <p><strong>Rating:</strong> ${p.rating.rate} ⭐ (${p.rating.count} reviews)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        document.getElementById('showModal').innerHTML = modalHTML;
        new bootstrap.Modal('#modalProduct').show();
      })
      .catch(() => alert('No se pudo obtener el detalle del producto.'));
  }
  
   function addProduct(){
    const modalProduct = `
        <div class="modal fade fst-italic" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Add Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <form id="formAddProduct">
                            <div class="mb-3">
                                <label for="idProduct" class="form-label">ID: </label>
                                <input type="number" class="form-control" id="idProduct" placeholder="Id product input " required>
                            </div>
                            <div class="mb-3">
                                <label for="titleProduct" class="form-label">Title: </label>
                                <input type="text" class="form-control" id="titleProduct" placeholder="Title product input" required>
                            </div>
                            <div class="mb-3">
                                <label for="priceProduct" class="form-label">Price: </label>
                                <input type="number" class="form-control" id="priceProduct" placeholder="Price product input" required>
                            </div>
                            <div class="mb-3">
                                <label for="descProduct" class="form-label">Description: </label>
                                <input type="text" class="form-control" id="descProduct" placeholder="Description input" required>
                            </div>
                            <div class="mb-3">
                                <label for="categoryProduct" class="form-label">Category: </label>
                                <input type="text" class="form-control" id="categoryProduct" placeholder="Category product input" required>
                            </div>
                            <div class="mb-3">
                                <label for="imagenProduct" class="form-label">Imagen: </label>
                                <input type="url" class="form-control" id="imagenProduct" placeholder="Imagen product input url" required>
                            </div>
                            <div class="mb-3 text-center">
                                <button class="btn btn-success" type="submit" onclick="saveProduct()"><i class="fa-solid fa-floppy-disk"></i> Save </button>
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
    document.getElementById('showModal').innerHTML = modalProduct
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}

function saveProduct(){
    const form = document.getElementById('formAddProduct')
    if(form.checkValidity()){
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const avatar = document.getElementById('avatar').value
        const userData = {first_name, last_name, email, avatar}

        fetch("https://reqres.in/api/users", {
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