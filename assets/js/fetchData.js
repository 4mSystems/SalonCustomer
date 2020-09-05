var salonId = "2";
var obj = {
    "salon_id": salonId
}
var pageid = location.pathname,
    mainUrl, catUrl, SearchUrl, serviceId;

if (pageid == "/Services.html") {
    mainUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/services";
    catUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/servicesWithCat";
    serviceId = sessionStorage.getItem("serviceId");
    SearchUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/servicesWithName";

} else if (pageid == "/Products.html") {
    mainUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/products";
    catUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/productsWithCat";
    serviceId = sessionStorage.getItem("productId");
    SearchUrl = "http://vqb.mqu.mybluehost.me/BeautyCenterApp/public/api/productsWithName"

}


getAllServices();

function getAllServices() {

    $("#service_item").empty();

    $.ajax({
        url: mainUrl,
        type: 'POST',
        data: obj,
        dataType: 'json', // added data type
        success: function (res) {
            if (res != null) {
                if (res.data.length < 0) {

                } else {
                    if (pageid == "/Services.html") {
                        $("#service_categories").append('<p><a onclick="getService()" id="all">كل الخدمات</a></p>');
                        res.data.CategoryServices.forEach(categorylistServices);
                        if (!serviceId) {
                            res.data.services.forEach(serviceslist);
                        } else {
                            getServiceById(serviceId);
                        }

                    } else if (pageid == "/Products.html") {
                        $("#product_categories").append('<p><a onclick="getService()" id="all">كل المنتاجات</a></p>');
                        res.data.CategoryProduct.forEach(categorylistProduct);
                        if (!serviceId) {
                            res.data.products.forEach(serviceslist);
                        } else {
                            getServiceById(serviceId);
                        }
                    }
                }

                function categorylistServices(value) {
                    $("#service_categories").append('<p><a id="cat_id" data-cat-id="' + value.id + '">' + value.name + '</a></p>');
                }

                function categorylistProduct(value) {
                    $("#product_categories").append('<p><a id="cat_id" data-cat-id="' + value.id + '">' + value.name + '</a></p>');
                }
                Scripts();
            }
        }
    });

}

// filter for get all category
function getService() {

    $("#service_item").empty();
    $(".latest-product-area .loadingio-spinner-spinner").prop("style", "display:inline");
    $.ajax({
        url: mainUrl,
        type: 'POST',
        data: obj,
        dataType: 'json', // added data type
        success: function (res) {
            if (res != null) {
                if (res.data.length < 0) {

                } else {
                    if (pageid == "/Services.html") {
                        res.data.services.forEach(serviceslist);
                    } else if (pageid == "/Products.html") {
                        res.data.products.forEach(serviceslist);
                    }
                }
            }
            $(".select_option_list").click();
            $(".latest-product-area .loadingio-spinner-spinner").hide();
        }
    });
    $("#cat-select").text($("#all").text());
}

function serviceslist(value) {
    var imageUrl,html;
    if (value.image != null) {
        imageUrl = value.image;
    } else {
        imageUrl = value.main_image;
    }
    if(value.price_after != null){
        html = '<div class="product-price"><small>' + value.price_before + 'دك</small> ' + value.price_after + 'دك</div>' 
    }else{
        html = '<div class="product-price">' + value.price_before + 'دك</div>' 
    }
    $("#service_item").append('<div class="col-xl-4 col-lg-4 col-md-6 col-sm-6"> <div class="product-card">' +
        '<div class="product-tumb">' +
        '<img src="' + imageUrl + '" alt="">' +
        '</div>' +
        '<div class="product-details">' +
        '<span class="product-catagory">' + value.category.name + '</span>' +
        '<h4>' + value.name + '</h4>' +
        '<p>' + value.desc + '</p>' +
        '<div class="product-bottom-details">' +
        html +
        '<div class="product-links">' +
        '<a onclick="addToCart(' + value.id + ')"><i class="fa fa-shopping-cart"></i></a>' +
        '</div></div></div></div></div>'
    );
}

$(document).on('click', '#cat_id', function () {
    var id = $(this).data('cat-id');
    getServiceById(id);
    $("#cat-select").text($(this).text());
});

function getServiceById(id) {
    $("#service_item").empty();
    $(".latest-product-area .loadingio-spinner-spinner").prop("style", "display:inline");

    var body = {
        "salon_id": salonId,
        "cat_id": id
    }

    $.ajax({
        url: catUrl,
        dataType: "json",
        type: 'POST',
        data: body,
        success: function (res) {
            if (res.data.length == 0) {
                if (pageid == "/Services.html") {
                    $("#service_item").append("<p style='text-align:center; width:100%; margin-top:30px'>لم يتم اضافة خدمات فى هذا التصنيف بعد</p>");
                } else if (pageid == "/Products.html") {
                    $("#service_item").append("<p style='text-align:center; width:100%; margin-top:30px'>لم يتم اضافة منتاجات فى هذا التصنيف بعد</p>");
                }
            } else {
                res.data.forEach(serviceslist);
            }
            $(".select_option_list").click();
            $(".latest-product-area .loadingio-spinner-spinner").hide();

        }
    });
}

function Scripts() {
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

function search(e) {
    event.preventDefault();

    var searchValue;
    if (pageid == "/Services.html") {
        searchValue = $("#service-search").val();
    } else if (pageid == "/Products.html") {
        searchValue = $("#product-search").val();
    }

    if (!searchValue) {

        return;
    }
    $("#service_item").empty();
    $(".latest-product-area .loadingio-spinner-spinner").prop("style", "display:inline");
    var body = {
        "salon_id": salonId,
        "name": searchValue
    }

    $.ajax({
        url: SearchUrl,
        dataType: "json",
        type: 'POST',
        data: body,
        success: function (res) {
            if (res.data.length == 0) {
                if (pageid == "/Services.html") {
                    $("#service_item").append("<p style='text-align:center; width:100%; margin-top:30px'>لا توجد خدمة يحتوى على كلمة " + searchValue + "</p>");
                } else if (pageid == "/Products.html") {
                    $("#service_item").append("<p style='text-align:center; width:100%; margin-top:30px'>لا يوجد منتج يحتوى على كلمة " + searchValue + "</p>");
                }
            } else {
                res.data.forEach(serviceslist);
            }

            $(".latest-product-area .loadingio-spinner-spinner").hide();

        }
    });

}

