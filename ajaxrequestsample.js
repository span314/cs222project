var url = 'lisitngs100.json',
    request = new XMLHttpRequest();
//open get request
request.open('GET', url, true);

//callback after JSON is loaded
request.onload = function() {
  if (request.status < 200 || request.status >= 400) {
    console.log("Error loading file")
  }
  data = JSON.parse(request.responseText);
  console.log("Data loaded")
};

request.send();