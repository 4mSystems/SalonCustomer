var obj = {
    "salon_id": "2"
}
getAllProducts()

function getAllProducts() {
    $("#product_categories").empty();
    $.ajax({
        url: "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/products",
        type: 'POST',
        data: obj,
        dataType: 'json', // added data type
        success: function(res) {
            if (res != null) {
                if (res.data.length < 0) {} else {
                    $("#product_categories").append('<p><a onclick="getProducts()">كل المنتاجات</a></p>');
                    res.data.CategoryProduct.forEach(categorylist);
                    res.data.products.forEach(productslist);
                }

                function categorylist(value) {
                    $("#product_categories").append('<p><a id="cat_id" data-cat-id="' + value.id + '">' + value.name + '</a></p>');
                }

                var script1 = document.createElement("script");
                script1.src = "./assets/js/jquery.nice-select.min.js";
                document.body.appendChild(script1);

                var script2 = document.createElement("script");
                script2.src = "./assets/js/vendor/owlSlider.js";
                document.body.appendChild(script2);

                var script = document.createElement("script");
                script.src = "./assets/js/main.js";
                document.body.appendChild(script);
                $("#loader").fadeOut();

            }
        }
    });
}


function getProducts() {
    $("#service_item").empty();
    $(".latest-product-area .loadingio-spinner-spinner").prop("style", "display:inline");
    $.ajax({
        url: "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/products",
        type: 'POST',
        data: obj,
        dataType: 'json', // added data type
        success: function(res) {
            if (res != null) {
                if (res.data.length < 0) {} else {
                    $("#product_categories").append('<p><a onclick="getProducts()">كل المنتاجات</a></p>');
                    res.data.products.forEach(productslist);
                }
                $(".latest-product-area .loadingio-spinner-spinner").hide();
            }
        }
    });
}

function productslist(value) {
    $("#service_item").append('<div class="col-xl-4 col-lg-4 col-md-6 col-sm-6"> <div class="product-card">' +
        '<div class="product-tumb">' +
        '<img src="' + value.main_image + '" alt="">' +
        '</div>' +
        '<div class="product-details">' +
        '<span class="product-catagory">' + value.category.name + '</span>' +
        '<h4>' + value.name + '</h4>' +
        '<p>' + value.desc + '</p>' +
        '<div class="product-bottom-details">' +
        '<div class="product-price">' + value.price_before + 'دك</div>' +
        '<div class="product-links">' +
        '<a href=""><i class="fa fa-shopping-cart"></i></a>' +
        '</div></div></div></div></div>'
    );
}

$(document).on('click', '#cat_id', function() {
    $("#service_item").empty();
    var id = $(this).data('cat-id');
    $(".latest-product-area .loadingio-spinner-spinner").prop("style", "display:inline");
    var body = {
        "salon_id": "2",
        "cat_id": id
    }
    $.ajax({
        url: "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/productsWithCat",
        dataType: "json",
        type: 'POST',
        data: body,
        success: function(res) {
            if (res.data.length == 0) {
                $("#service_item").append("<p style='text-align:center; width:100%; margin-top:30px'>لم يتم اضافة خدمات فى هذا التصنيف بعد</p>")
            } else {
                res.data.forEach(productslist);
                $(".latest-product-area .loadingio-spinner-spinner").hide();
            }

        }
    })
});