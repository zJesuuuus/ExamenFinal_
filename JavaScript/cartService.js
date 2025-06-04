function getCarts(){
    document.getElementById('cardHeader').innerHTML = '<h4>Carrito de Compras</h4>'
    document.getElementById('info').innerHTML = '' 
    fetch("https://fakestoreapi.com/carts",{
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
            let listCarts = `
                <table class="table table-danger">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User Id</th>
                            <th scope="col">Dates</th>
                            <th scope="col">Number of Products</th>
                            <th scope="col">Quantity of Products</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.forEach(cart => {
                listCarts = listCarts.concat(`
                    <tr> 
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        <td>${cart.date}</td>
                        <td>${cart.products[0].productId}</td>
                        <td>${cart.products[0].quantity}</td>
                    </tr>
    
                    `)
            });
    
            listCarts = listCarts.concat(`
                    </tbody>
                </table>
                `)
            document.getElementById('info').innerHTML = listCarts
            }
            else{
                document.getElementById('info').innerHTML = '<h3>No se encontraron Compras</h3>'
            }
        })
}