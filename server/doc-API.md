Get-Out App
==========

POST /register
- Create New User

Request Headers
{
    Not needed
}


Request Body
{
    "email": "adul@gmail.com",
    "password": "adul2222",
    "location": "jakarta"
}


Response (201 -  Created)
{
    "id": 5,
    "email": "adul@gmail.com",
    "location": "jakarta"
}

Response (400 - Bad Request)
{
    "message": [
        "Email is required
        "Email not valid",
        "Email must be unique",
        "Password is required",
        "Password minimal 8 characters"
    ]
}

Response (500 -  Internal server error)
{
    "message": "Internal server error"
}


POST /login
- User login

Request Headers
{
    Not needed
}


Request Body
{
    "email": "adul@gmail.com",
    "password": "adul2222",
}

Response (200 - Ok)
{
    "access_token": <get by sistem>
}

Response (400 - Bad Request)
{
    "error": `wrong email or password`
}

Response (404 - Data not found)
{
    "error": `email not found`
}


GET /informations/weather
- Get informations about weather

Request Headers
{
    "access_token": "<generate by system>"
}


Response (200-Ok)
{
    "weather": "Clouds",
    "temp": 20.94,
    "city": "Bandung"
}

Response (500 - Internal Server error)
{
    "message": "internal server error"
}


GET /informations/air
- Get informations about air

Request Headers
{
    "access_token": "<generate by system>"
}


Response (200-Ok)
{
    "aqius": 89,
    "index": "Moderate",
    "color": "yellow"
}

Response (500 - Internal Server error)
{
    "message": "internal server error"
}


GET /informations/news
- Get informations about news

Request Headers
{
    "access_token": "<generate by system>"
}


Response (200-Ok)
[
    {
        "title": "Regent-elect in NTT is an American citizen: Elections Supervisory Agency | Coconuts Bali",
        "published": "2021-02-03 03:12:18 +0000",
        "url": "https://coconuts.co/bali/news/regent-elect-in-ntt-is-an-american-citizen-elections-supervisory-agency/",
        "image": "https://coconuts.co/wp-content/uploads/2021/02/orient-p-riwu-kore-tangkapan-layar-facebook-orientriwukore_169.jpeg"
    },
    {
        "title": "Police pursuing suspects in suspected murder of woman in Denpasar | Coconuts Bali",
        "published": "2021-02-03 10:08:27 +0000",
        "url": "https://coconuts.co/bali/news/police-pursuing-suspects-in-suspected-murder-of-woman-in-denpasar/",
        "image": "https://coconuts.co/wp-content/uploads/2020/10/police-line-3953745_1280-1.jpg"
    },
    {
        "title": "Bali authorities say people are still taking COVID-19 lightly | Coconuts Bali",
        "published": "2021-02-02 10:06:50 +0000",
        "url": "https://coconuts.co/bali/news/bali-authorities-say-people-are-still-taking-covid-19-lightly/",
        "image": "https://coconuts.co/wp-content/uploads/2021/02/p7iu2f7slkuwk2ud0p1x.jpg"
    }
]

Response (500 - Internal Server error)
{
    "message": "internal server error"
}