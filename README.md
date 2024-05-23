To use the API, you need to send a GET request to the server's endpoint with the desired prompt as a query parameter. Here's how you can do it using different methods:

### Using cURL (Command Line)

```sh
curl "http://localhost:8000/?prompt=school%20teacher"
```

### Using Fetch API (JavaScript)

```javascript
fetch('http://localhost:8000/?prompt=school%20teacher')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Axios (JavaScript)

```javascript
axios.get('http://localhost:8000/?prompt=school%20teacher')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

### Using Python Requests (Python)

```python
import requests

response = requests.get('http://localhost:8000/', params={'prompt': 'hot school teacher'})
data = response.json()
print(data)
```

### Using Postman (GUI)

1. Open Postman.
2. Create a new GET request.
3. Enter the URL `http://localhost:8000/` and add the query parameter `prompt` with your desired prompt value (`beautiful potrait of Indian culture` in this example).
4. Click Send.