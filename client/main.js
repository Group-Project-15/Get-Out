let base_url = "http://localhost:3000/"

    function aut () {
      if(!localStorage.getItem("access_token")) {
        $("#name").hide()
        $("#form-login").show()
        $("#google-button").show()
        $("#welcome").show()
        $("#form-register").hide()
        $("#logout").hide()
        $("#register").show()
        
      } else {
        $("#name").show()
        $("#form-login").hide()
        $("#google-button").hide()
        $("#welcome").hide()
        $("#form-register").hide()
        $("#logout").show()
        $("#register").hide()
        getWeather()
        getAirQuality()
        getNews()

      }
    }
    function login() {
      const email = $("#login-email").val()
      const password = $("#login-password").val()
      $.ajax({
        url: base_url + "login",
        method: "POST",
        data: {
          email, 
          password
        }
      })
        .done(response => {
          localStorage.setItem("access_token", response.token)
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
        .always(_ => {
          $("#form-login").trigger("reset")
        })
    }

    function logout() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
    })
      aut()
    }


    function showRegisterForm() {
        $("#form-login").hide()
        $("#form-register").show()
        $("#form-edit-todo").hide()
        $("#todo-table").hide()
        $("#form-add-todo").hide()
        $("#logout").hide()
        $("#name").hide()
        $("#register").hide()
        $("#google-button").show()
        $("#welcome").hide()
    }

    function register() {
      const email = $("#register-email").val()
      const password = $("#register-password").val()
      const location = $("#register-location").val()
      $.ajax({
        url: base_url + "register",
        method: "POST",
        data: {
          email, 
          password,
          location
        }
      })
        .done(response => {
          aut()
        })
        .fail((xhr, text) => {
          console.log(xhr, text)
        })
    }

    function onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token
      $.ajax({
        url: base_url + 'googlelogin',
        method: 'POST',
        data: {
          googleToken: id_token
        }
      })
        .done(response => {
          console.log(response)
          localStorage.setItem("access_token", response.token)
          aut()
        })
        .fail(err => {
          console.log(err)
        })
    }

    // ========== menampilkan information =============
    function getWeather() {
        $.ajax({
            url: base_url + "informations/weather",
            method: "GET",
            headers: {
                token: localStorage.getItem("access_token")
            }
          })
            .done(response => {
                $("#information").empty()
            })
            .fail(err => {
                console.log(err)
            })
    }
    function getAirQuality() {
        $.ajax({
            url: base_url + "informations/air",
            method: "GET",
            headers: {
                token: localStorage.getItem("access_token")
            }
          })
          .done(response => {
            $("#information").empty()
          })
          .fail(err => {
            console.log(err)
          })
    }
    function getNews() {
        $.ajax({
            url: base_url + "informations/news",
            method: "GET",
            headers: {
                token: localStorage.getItem("access_token")
            }
          })
          .done(response => {
            $("#information").empty()
          })
          .fail(err => {
            console.log(err)
          })
    }

    $(document).ready(function(){
      aut()
      $("#form-login").on("submit", (e) => {
        e.preventDefault()
        login()
      })
      
      $("#logout").on("click", (e) => {
        e.preventDefault()
        logout()
      })

      $("#register").on("click", (e) => {
        e.preventDefault()
        showRegisterForm()
      })
      $("#form-register").on("submit", (e) => {
        e.preventDefault()
        register()
      })

    });