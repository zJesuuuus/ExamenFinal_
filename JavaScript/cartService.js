function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de carritos de compras</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando...</p>';

    // Usar la Fake Store API correcta
    fetch("https://fakestoreapi.com/carts", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(carts => {
        if (carts.length > 0) {
            let cartList = `
            <button type="button" class="btn btn-outline-danger" onclick="addUser()"><i class="fa-solid fa-user-plus"></i></button>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario ID</th>
                            <th>Fecha</th>
                            <th>Productos</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            carts.forEach(cart => {
                const date = new Date(cart.date).toLocaleDateString();
                const productCount = cart.products.length;
                
                cartList += `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        <td>${date}</td>
                        <td>${productCount} producto${productCount !== 1 ? 's' : ''}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info btn-sm" 
                                    onclick="viewCartDetail(${cart.id})">
                                Ver
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            cartList += `
                    </tbody>
                </table>
            `;
            document.getElementById('info').innerHTML = cartList;
        } else {
            document.getElementById('info').innerHTML = '<p>No se encontraron carritos</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('info').innerHTML = '<p>Error al cargar los carritos</p>';
    });
}

function viewCartDetail(cartId) {
    fetch(`https://fakestoreapi.com/carts/${cartId}`)
    .then(response => response.json())
    .then(cart => {
        // Primero obtener los detalles de los productos
        const productPromises = cart.products.map(item => 
            fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(res => res.json())
                .then(product => ({
                    ...product,
                    quantity: item.quantity
                }))
        );

        Promise.all(productPromises)
        .then(products => {
            // Construir la lista de productos para el modal
            let productList = '';
            let total = 0;
            
            products.forEach(product => {
                const subtotal = product.price * product.quantity;
                total += subtotal;
                
                productList += `
                    <tr>
                        <td>
                            <img src="${product.image}" 
                                 alt="${product.title}" 
                                 style="width: 50px; height: 50px; object-fit: cover;">
                        </td>
                        <td>${product.title}</td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td>${product.quantity}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });

            const modalContent = `
                <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="modalCartLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="modalCartLabel">Detalle del carrito #${cart.id}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                      </div>
                      <div class="modal-body">
                        <div class="mb-3">
                            <p><strong>Usuario ID:</strong> ${cart.userId}</p>
                            <p><strong>Fecha:</strong> ${new Date(cart.date).toLocaleString()}</p>
                        </div>
                        
                        <h6>Productos</h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productList}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="4" class="text-end">Total:</th>
                                        <th>$${total.toFixed(2)}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            
            document.getElementById('showModal').innerHTML = modalContent;
            const modal = new bootstrap.Modal(document.getElementById('modalCart'));
            modal.show();
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo obtener detalle del carrito.');
    });
}