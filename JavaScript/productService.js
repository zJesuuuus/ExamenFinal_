function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Productos</h4>'
    document.getElementById('info').innerHTML = '' 
    fetch("https://fakestoreapi.com/products",{
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
            let listProduct = `
                <table class="table table-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.forEach(product => {
                listProduct = listProduct.concat(`
                    <tr> 
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td>${product.description}</td>
                        <td>${product.category}</td>
                        <td><img src="${product.image}" class="img-thumbnail" alt="Image to product"></td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" onclick="showInfoProduct('${product.id}')">Buy</button>
                        </td>
                    </tr>
    
                    `)
            });
    
            listProduct = listProduct.concat(`
                    </tbody>
                </table>
                `)
            document.getElementById('info').innerHTML = listProduct
            }
            else{
                document.getElementById('info').innerHTML = '<h3>No se encontraron Productos</h3>'
            }
        })
}