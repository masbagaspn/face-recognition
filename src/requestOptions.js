export const requestOptions = (urlText) => {
    return {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key fcd32680230b46feb69e1ed86b7e3fe7'
        },
        body: JSON.stringify({
          "user_app_id": {"user_id": "masbagaspn","app_id": "exercise"},"inputs": [{"data": {"image": {"url": urlText}}}]
        }
      )
    } 
}