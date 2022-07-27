main();
function main() {
  apiGetproduct()
    .then(function (result) {
      const products = result.data;
      // console.log(products)
      for (var i = 0; i < products.length; i++) {
        const product = products[i];
        products[i] = new Product(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.backCamera,
          product.frontCamera,
          product.img,
          product.desc,
          product.type
        );
      }
      console.log(products);
      display(products);
    })
    .catch(function (error) {
      console(error);
    });
}
function display(products) {
  let html = "";
  for (var i = 0; i < products.length; i++) {
    const product = products[i];
    html += `<tr>
    <td>${i + 1}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>
        <img src ="${product.img}" width = "70px" height = "70px" />
    </td>
    <td>${product.desc}</td>
    <td>
        <button class = "btn btn-primary" data-toggle="modal" data-target="#myModal"
        data-type = "update"
        data-id = "${product.id}"
        >
        Cập nhật</button>
        <button class = "btn btn-danger"
        data-type = "delete"
        data-id = "${product.id}"
        >
        Xóa
        </button>
    </td>
</tr>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}
document.getElementById("btnThemSP").addEventListener("click", showAddmodal);
function showAddmodal() {
  document.querySelector(".modal-title").innerHTML = "thêm sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class = "btn btn-success " data-type = "add" >thêm</button>
    <button class = "btn btn-secondary"
     data-toggle="modal" 
     data-target="#myModal"
     >
      hủy
       </button>`;
}
document.querySelector(".modal-footer").addEventListener("click", handelSubmit);
function handelSubmit(event) {
  const type = event.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addProduct();
      break;
    case "update":
      updateProduct();
      break;
    default:
      break;
  }
}
function updateProduct() {
  var id = document.getElementById("MaSP").value;
  var names = document.getElementById("TenSP").value;
  var prices = +document.getElementById("GiaSP").value;
  var screen = document.getElementById("Screen").value;
  var backCamera = document.getElementById("camSau").value;
  var frontCamera = document.getElementById("camTruoc").value;
  var images = document.getElementById("HinhSP").value;
  var descriptions = document.getElementById("MoTaSP").value;
  var type = document.getElementById("loaiSP").value;
  var product = new Product(
    id,
    names,
    prices,
    screen,
    backCamera,
    frontCamera,
    images,
    descriptions,
    type
  );
  apiupdateProduct(product)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console(error);
    });
  resetform();
}
function addProduct() {
  var names = document.getElementById("TenSP").value;
  var prices = +document.getElementById("GiaSP").value;
  var screen = document.getElementById("Screen").value;
  var backCamera = document.getElementById("camSau").value;
  var frontCamera = document.getElementById("camTruoc").value;
  var images = document.getElementById("HinhSP").value;
  var descriptions = document.getElementById("MoTaSP").value;
  var type = document.getElementById("loaiSP").value;

  var isValid = valiDation();

  if (!isValid) {
    alert("vui lòng nhập vào các giá trị");
    return;
  }

  var product = new Product(
    null,
    names,
    prices,
    screen,
    backCamera,
    frontCamera,
    images,
    descriptions,
    type
  );
  apiAddproduct(product)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console(error);
    });
  resetform();
}
document
  .getElementById("tblDanhSachSP")
  .addEventListener("click", handelAction);
function handelAction(evt) {
  const type = evt.target.getAttribute("data-type");
  const id = evt.target.getAttribute("data-id");
  switch (type) {
    case "delete":
      deleteProduct(id);
      break;
    case "update":
      showUpdatemodal(id);
      break;
    default:
      break;
  }
}
function deleteProduct(productId) {
  apiDelete(productId)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console(error);
    });
}

function showUpdatemodal(productId) {
  document.querySelector(".modal-title").innerHTML = "cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class = "btn btn-success " data-type = "update" >cập nhật</button>
    <button class = "btn btn-secondary"
     data-toggle="modal" 
     data-target="#myModal"
     >
      hủy
       </button>`;
  apiGetdetail(productId)
    .then(function (result) {
      const product = result.data;
      document.getElementById("MaSP").value = product.id;
      document.getElementById("TenSP").value = product.name;
      document.getElementById("GiaSP").value = product.price;
      document.getElementById("Screen").value = product.screen;
      document.getElementById("camSau").value = product.backCamera;
      document.getElementById("camTruoc").value = product.frontCamera;
      document.getElementById("HinhSP").value = product.img;
      document.getElementById("MoTaSP").value = product.desc;
      document.getElementById("loaiSP").value = product.type;
    })
    .catch(function (error) {
      console(error);
    });
}
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
function valiDation() {
  let isValid = true;
  var names = document.getElementById("TenSP").value;
  var prices = +document.getElementById("GiaSP").value;
  var screen = document.getElementById("Screen").value;
  var backCamera = document.getElementById("camSau").value;
  var frontCamera = document.getElementById("camTruoc").value;
  var images = document.getElementById("HinhSP").value;
  var descriptions = document.getElementById("MoTaSP").value;
  var type = document.getElementById("loaiSP").value;

  if (!isRequired(names)) {
    isValid = false;
    document.getElementById("spTensp").style.display = "block";
    document.getElementById("spTensp").innerHTML =
      "tên sản phẩm không được để trống";
  } else {
    document.getElementById("spTensp").innerHTML = "";
  }
  if (!isRequired(prices)) {
    isValid = false;
    document.getElementById("spGia").style.display = "block";
    document.getElementById("spGia").innerHTML = "giá không được để trống";
  } else {
    document.getElementById("spGia").innerHTML = "";
  }
  if (!isRequired(screen)) {
    isValid = false;
    document.getElementById("spScreen").style.display = "block";
    document.getElementById("spScreen").innerHTML =
      "Màn hình không được để trống";
  } else {
    document.getElementById("spScreen").innerHTML = "";
  }
  if (!isRequired(backCamera)) {
    isValid = false;
    document.getElementById("spCamsau").style.display = "block";
    document.getElementById("spCamsau").innerHTML =
      "Camera sau không được để trống";
  } else {
    document.getElementById("spCamsau").innerHTML = "";
  }
  if (!isRequired(frontCamera)) {
    isValid = false;
    document.getElementById("spCamtruoc").style.display = "block";
    document.getElementById("spCamtruoc").innerHTML =
      "Camera trước không được để trống";
  } else {
    document.getElementById("spCamtruoc").innerHTML = "";
  }
  if (!isRequired(images)) {
    isValid = false;
    document.getElementById("spHinh").style.display = "block";
    document.getElementById("spHinh").innerHTML =
      "Hình ảnh không được để trống";
  } else {
    document.getElementById("spHinh").innerHTML = "";
  }
  if (!isRequired(descriptions)) {
    isValid = false;
    document.getElementById("spMota").style.display = "block";
    document.getElementById("spMota").innerHTML = "Mô tả không được để trống";
  } else {
    document.getElementById("spMota").innerHTML = "";
  }
  if (type === "chọn loại sản phẩm") {
    isValid = false;
    document.getElementById("sploai").style.display = "block";
    document.getElementById("sploai").innerHTML = "hãy chọn loại sản phẩm";
  } else {
    document.getElementById("sploai").innerHTML = "";
  }

  return isValid;
}

document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(evt) {
  if (evt.key !== "Enter") return;
  let value = evt.target.value;

  apiGetproduct(value)
    .then(function (result) {
      const products = result.data;
      console.log(products);
      for (var i = 0; i < products.length; i++) {
        const product = products[i];
        products[i] = new Product(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.backCamera,
          product.frontCamera,
          product.img,
          product.desc,
          product.type
        );
      }
      console.log(products);
      display(products);
    })
    .catch(function (error) {
      console(error);
    });
}

function resetform() {
  // document.getElementById("MaSP").value =
  document.getElementById("TenSP").value = "";
  document.getElementById("GiaSP").value = "";
  document.getElementById("Screen").value = "";
  document.getElementById("camSau").value = "";
  document.getElementById("camTruoc").value = "";
  document.getElementById("HinhSP").value = "";
  document.getElementById("MoTaSP").value = "";
  document.getElementById("loaiSP").value = "";
  $("#myModal").modal("hide");
}
