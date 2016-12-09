var gzip = function(obj) {
  var textEncoder = new TextEncoder(),
      arrayData = textEncoder.encode(JSON.stringify(obj)),
      arrayCompressed = deflate_compress(arrayData),
      stringCompressed = String.fromCharCode.apply(null, arrayCompressed);
  return stringCompressed;
  //return btoa(stringCompressed);
}

var compress = function(input) {
  //TODO our code goes here
  //Currently assumes input is an JSON array -- will not handle anything else!
  var keys, output, column, key, i, j, textEncoder, textDecoder;

  keys = Object.keys(input[0]);
  output = [gzip(keys)];

  for (i = 0; i < keys.length; i++) {
    column = [];
    key = keys[i];
    for (j = 0; j < input.length; j++) {
      column[j] = input[j][key];
    }

    output[i+1] = gzip(column)
  }

  return output;
};

//run after document has loaded
document.addEventListener('DOMContentLoaded', function() {
  var loadData, compressData,
      loadButton = document.getElementById('loadButton'),
      compressButton = document.getElementById('compressButton'),
      inputFile = document.getElementById('inputFile'),
      inputData = document.getElementById('inputData'),
      outputData = document.getElementById('outputData'),
      inputSize = document.getElementById('inputSize'),
      outputSize = document.getElementById('outputSize');

  loadData = function() {
    var url = inputFile.value,
        request = new XMLHttpRequest();
    //open get request
    request.open('GET', url, true);
    //callback after JSON is loaded
    request.onload = function() {
      if (request.status < 200 || request.status >= 400) {
        inputData.value = "Error loading file (server)"
      }
      inputData.value = request.responseText;
      inputSize.innerHTML = inputData.value.length;
    };
    //callback on error
    request.onerror = function() {
      inputData.value = "Error loading file (network)";
      inputSize.innerHTML = 0
    };
    //send request
    request.send();
  };

  compressData = function() {
    //outputData.value = JSON.stringify(compress(JSON.parse(inputData.value)));
    outputData.value = compress(JSON.parse(inputData.value));
    outputSize.innerHTML = outputData.value.length;
  };

  //bind events
  loadButton.addEventListener('click', loadData);
  compressButton.addEventListener('click', compressData);

  //prefill
  inputFile.value = 'simple.json';
  loadData();
});