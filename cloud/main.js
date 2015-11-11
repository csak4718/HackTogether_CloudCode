var fs = require('fs');
var layer = require('cloud/layer-parse-module/layer-module.js');


var layerProviderID = 'layer:///providers/b0d544e8-48d6-11e5-be48-7f0cfa061608';  // Should have the format of layer:///providers/<GUID>
var layerKeyID = 'layer:///keys/65f33194-493d-11e5-9495-7f0cfa061608';   // Should have the format of layer:///keys/<GUID>
var privateKey = fs.readFileSync('cloud/layer-parse-module/keys/layer-key.js');
layer.initialize(layerProviderID, layerKeyID, privateKey);


Parse.Cloud.define("generateToken", function(request, response) {
    var currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');
    var userID = currentUser.id;
    var nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');
        response.success(layer.layerIdentityToken(userID, nonce));
});
