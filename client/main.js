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
        $("#information").hide()
        $("#cancel").hide()
        
      } else {
        $("#name").show()
        $("#form-login").hide()
        $("#google-button").hide()
        $("#welcome").hide()
        $("#form-register").hide()
        $("#logout").show()
        $("#register").hide()
        $("#information").show()
        $("#cancel").hide()
        getWeather()
        getAirQuality()
        getNews()

      }
    }

    // ========== login ==========
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
          localStorage.setItem("access_token", response.access_token)
          aut()
        })
        .fail((xhr, text) => {
          let errorMsg = xhr.responseJSON.Error
          $(".errorClass").remove()
          $("#form-login").append(`<center><p class="errorClass"><b style="color: red;">${errorMsg}</b></p></center>`);
        })
        .always(_ => {
          $("#isi-form-login").trigger("reset")
        })
    }

    // ============log out ===========
    function logout() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
    })
      aut()
    }

    // ============ show form register ===========
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
        $("#cancel").show()
    }

    // ============= register ==============
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
          console.log(xhr, "<<<<ERROR");
          let errorMsg = xhr.responseJSON.error
          $(".errorClass").remove()
          $("#form-register").append(`<center><p class="errorClass"><b style="color: red;">${errorMsg}</b></p></center>`);
        })
        .always(_ => {
          $("#isi-form-register").trigger("reset")
        })
    }

    // =========== google login ============
    function onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token
      console.log(id_token);
      $.ajax({
        url: base_url + 'googlelogin',
        method: 'POST',
        data: {
          googleToken: id_token
        }
      })
        .done(response => {
          localStorage.setItem("access_token", response.access_token)
          aut()
        })
        .fail(err => {
          console.log(err)
        })
    }

    // ========== menampilkan information 3RD API weather, AirQuality, news=============
    function getWeather() {
        $.ajax({
            url: base_url + "informations/weather",
            method: "GET",
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
            .done(response => {
                $("#weather-api").empty()
                $("#weather-api").append(`
                    <div class="card col-md-6" style="width: 18rem">
                        <div class="card-body" >
                        <h5 class="card-title">Weather</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${response.weather}</h6>
                        <h5 class="card-title">Temp</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${response.temp}°C</h6>
                        <p class="card-text">${response.city}</p>
                        </div>
                    </div>
                `)

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
              access_token: localStorage.getItem("access_token")
            }
          })
          .done(response => {
            $("#air-api").empty()
            $("#air-api").append(`
            <div class="card col-md-6" style="width: 18rem">
              <div class="card-body" style="background-color: ${response.color};">
                <h5 class="card-title">Air Quality</h5>
                <h6 class="card-subtitle mb-2 text-muted">${response.aqius}</h6>
                <h5 class="card-title">Index</h5>
                <h6 class="card-subtitle mb-2 text-muted">${response.index}</h6>
                <!-- {
                  response dari server 
              "aqius": 86,
              "index": "Moderate",
              "color": "yellow"
          } -->
              </div>
            </div>
            `)
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
              access_token: localStorage.getItem("access_token")
            }
          })
          .done(response => {
            $("#news-api").empty()
            response.forEach(value => {
                $("#news-api").append(`
                <div class="card" style="width: 18rem">
                  <div class="card-body" ">
                    <h5 class="card-title">News</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${value.title}</h6>
                    <img src=${value.image} height="150" width="200"><br>
                  </div>
                </div>
                
                `)
            })
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

      $("#cancel").on("click", (e) => {
        aut()
      })

    });