<a name="top"></a>
# Gigapet backend


Gigapet API for PTCT Build Week, Jan 2020

- [Auth](#auth)
	- [Logs in a registered parent](#logs-in-a-registered-parent)
	- [Registers a New Parent](#registers-a-new-user)
	


# <a name='auth'></a> Auth

## <a name='logs-in-a-registered-parent'></a> Logs in a registered parent
[Back to top](#top)

<p>Log a parent in, receive token on successful login</p>

	POST /api/auth/login


### Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  username | String | <p>The Parent's username</p>|
|  password | String | <p>The Parent's password</p>|

### Param Examples

(json)
Sample-Request:

```
{
    "username": "johndoe",
    "password": "123456"
}
```

### Success Response

Success-Response:

```
{
    "message": "Welcome back johndoe!",
    "token": "Generated Token"
}
```

### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  message | json | <p>Welcome Message</p>|

### Error Response

Error-Response:

```
{
    "username": "Required"
}
```
Error-Response:

```
{
    "code": 404,
    "error": "User Not Found"
}
```
Error-Response:

```
{
    "code": 401,
    "error": "Invalid Credentials"
}
```
## <a name='registers-a-new-parent'></a> Registers a New Parent
[Back to top](#top)

<p>Registers a New Parent to the Database</p>

	POST /api/auth/register





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Parent name | String | <p>The Parent's Name
|  username | String | <p>The parent's Username</p>|
|  password | String | <p>The parent's Password</p>|
|  email | String | <p>The parent's Email</p>|

### Param Examples

(json)
Sample-Request:

```
{
    "parent_name": "John Doe",
    "username": "johndoe",
    "password": "123456"
    "email": "john@doe.com",
}
```

### Success Response

Success-Response:

```
{
    "message": "Welcome to Gigapet John Doe"
}
```

### 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  message | json | <p>Welcome Message</p>|

### Error Response

Error-Response:

```
{
    "username": "Required"
}
```
Error-Response:

```
{
    "code": 400,
    "error": "Username is already taken"
}
```
Error-Response:

```
{
    "code": 400,
    "error": "Email is already taken"
}
```