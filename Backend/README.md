# API Documentation: /users/register

## Endpoint Description
The `/users/register` endpoint is used to register a new user in the system. It validates the input data, hashes the password, and creates a new user record in the database. Upon successful registration, it returns a JSON Web Token (JWT) for authentication.

## HTTP Method
`POST`

## Endpoint
`/users/register`

## Request Body
The request body should be in JSON format and include the following fields:

| Field              | Type   | Required | Description                                      |
|--------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname` | String | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname`  | String | No       | The last name of the user (minimum 3 characters).  |
| `email`             | String | Yes      | The email address of the user (must be valid).    |
| `password`          | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success Response
**Status Code:** `201 Created`

**Response Body:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "1234567890abcdef",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "<JWT_TOKEN>"
  }
}
```

### Error Responses
| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `400 Bad Request` | Validation errors in the request body.          |
| `500 Internal Server Error` | An unexpected error occurred on the server. |

**Example Error Response:**
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Notes
- The `password` field is hashed before being stored in the database.
- The `email` field must be unique.
- A JWT token is returned upon successful registration, which can be used for authentication in subsequent requests.

---

# API Documentation: /users/login

## Endpoint Description
The `/users/login` endpoint is used to authenticate a user in the system. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) upon successful authentication.

## HTTP Method
`POST`

## Endpoint
`/users/login`

## Request Body
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                      |
|------------|--------|----------|--------------------------------------------------|
| `email`    | String | Yes      | The email address of the user (must be valid).    |
| `password` | String | Yes      | The password for the user (minimum 6 characters). |

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success Response
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "1234567890abcdef",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "<JWT_TOKEN>"
  }
}
```

### Error Responses
| Status Code       | Description                                      |
|-------------------|--------------------------------------------------|
| `400 Bad Request` | Validation errors in the request body.          |
| `401 Unauthorized`| Invalid email or password.                      |
| `500 Internal Server Error` | An unexpected error occurred on the server. |

**Example Error Response:**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Notes
- The `email` field must be valid and correspond to a registered user.
- The `password` field is compared with the hashed password stored in the database.
- A JWT token is returned upon successful authentication, which can be used for authorization in subsequent requests.

---

# API Documentation: /users/profile

## Endpoint Description
The `/users/profile` endpoint is used to fetch the profile details of the authenticated user. It requires the user to be logged in and provides the user's details in the response.

## HTTP Method
`GET`

## Endpoint
`/users/profile`

## Request Headers
The request must include the following headers:

| Header          | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| `Authorization` | String | Yes      | The Bearer token for the authenticated user.     |

## Response
### Success Response
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "user": {
      "_id": "1234567890abcdef",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
}
```

### Error Responses
| Status Code       | Description                                      |
|-------------------|--------------------------------------------------|
| `401 Unauthorized`| User is not authenticated.                      |
| `500 Internal Server Error` | An unexpected error occurred on the server. |

---

# API Documentation: /users/logout

## Endpoint Description
The `/users/logout` endpoint is used to log out the authenticated user. It clears the authentication token and blacklists it to prevent further use.

## HTTP Method
`GET`

## Endpoint
`/users/logout`

## Request Headers
The request must include the following headers:

| Header          | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| `Authorization` | String | Yes      | The Bearer token for the authenticated user.     |

## Response
### Success Response
**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Logged out"
}
```

### Error Responses
| Status Code       | Description                                      |
|-------------------|--------------------------------------------------|
| `401 Unauthorized`| User is not authenticated.                      |
| `500 Internal Server Error` | An unexpected error occurred on the server. |

## Notes
- The token is blacklisted upon logout to prevent reuse.