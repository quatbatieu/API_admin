const baseUrl = "https://62a694e897b6156bff7bc30e.mockapi.io/api/Phone";
function apiGetproduct(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {
      name: search, // products?name = "Xiaomi"
    },
  });
}
function apiAddproduct(product) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: product,
  });
}
function apiDelete(productId){
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "DELETE",
   
  });
}
function apiGetdetail(productId){
  return axios({
    url: `${baseUrl}/${productId}`  ,
    method: "GET",
  });
}
function apiupdateProduct(product){
  return axios({
    url: `${baseUrl}/${product.id}`  ,
    method: "PUT",
    data:product
  });
}