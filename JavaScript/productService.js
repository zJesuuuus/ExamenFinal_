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
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div class="card h-100 shadow-sm">
              <img src="${p.image}" class="card-img-top" style="object-fit:contain;height:180px" />
              <div class="card-body d-flex flex-column">
                <h6 class="card-title">${p.title}</h6>
                <p class="text-success fw-bold">$${p.price}</p>
                <button class="btn btn-outline-primary btn-sm mt-auto" onclick="viewProductDetail(${p.id})">
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
  
  /*  GET /products/:id  ────────────────────────────────────────── */
  function viewProductDetail(prodId) {
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
  