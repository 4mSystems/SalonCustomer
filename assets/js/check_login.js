if (sessionStorage.getItem("user_data") != null) {
    var saved_data = JSON.parse(sessionStorage.getItem("user_data"));
    console.log(saved_data.data.name);
    $('#login_item').append('<img class="img-fluid rounded-circle" style="width: 50px;height: 50px;"' +
        'src="' + saved_data.data.image + '"/>');
} else {
    $('#login_item').append('<a href="login.html" class="btn header-btn">تسجيل دخول</a>');
}