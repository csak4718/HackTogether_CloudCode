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

Parse.Cloud.define("removeUnwantedGroupInterest", function(request, response){
    Parse.Cloud.useMasterKey();
    var groupId = request.params.groupId;
    var delete_groupInterestId = request.params.delete_groupInterestId;

    var interestQuery = new Parse.Query(Parse.Object.extend("Interest"));
    interestQuery.get(delete_groupInterestId, {
        success: function(delete_groupInterest){
            var groupQuery = new Parse.Query(Parse.Object.extend("Group"));
            groupQuery.get(groupId, {
                success: function(group){
                    var groupInterests = group.relation("groupInterests");
                    groupInterests.remove(delete_groupInterest);
                    group.save(null, {
                        success: function(pendingMember){
                            console.log("save success");
                        },
                        error: function(pendingMember, error){
                            console.log("save failed");
                        }
                    });
                }
            });
        }
    });
});

Parse.Cloud.define("removeUnwantedLookForSkill", function(request, response){
    Parse.Cloud.useMasterKey();
    var groupId = request.params.groupId;
    var delete_lookForSkillId = request.params.delete_lookForSkillId;

    var skillQuery = new Parse.Query(Parse.Object.extend("Skill"));
    skillQuery.get(delete_lookForSkillId, {
        success: function(delete_lookForSkill){
            var groupQuery = new Parse.Query(Parse.Object.extend("Group"));
            groupQuery.get(groupId, {
                success: function(group){
                    var lookForSkills = group.relation("lookForSkills");
                    lookForSkills.remove(delete_lookForSkill);
                    group.save(null, {
                        success: function(pendingMember){
                            console.log("save success");
                        },
                        error: function(pendingMember, error){
                            console.log("save failed");
                        }
                    });
                }
            });
        }
    });
});

Parse.Cloud.define("addGroupToInviteGroup", function(request, response){
    Parse.Cloud.useMasterKey();
    var groupId = request.params.groupId;
    var pendingMemberId = request.params.pendingMemberId;

    var groupQuery = new Parse.Query(Parse.Object.extend("Group"));
    groupQuery.get(groupId, {
        success: function(group) {
            var pendingMemberQuery = new Parse.Query(Parse.User);
            pendingMemberQuery.get(pendingMemberId, {
                success: function(pendingMember){
                    var inviteGroups = pendingMember.relation("inviteGroups");
                    inviteGroups.add(group);
                    pendingMember.save(null, {
                        success: function(pendingMember){
                            console.log("save success");
                        },
                        error: function(pendingMember, error){
                            console.log("save failed");
                        }
                    });
                },
                error: function(pendingMember, error){
                    console.log("fail to get pendingMember");
                }
            });
        },
        error: function(group, error){
            console.log("fail to get group");
        }
    });
});
