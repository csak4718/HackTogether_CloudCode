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


Parse.Cloud.define("removeUserFromInterestedHackers", function(request, response){
    Parse.Cloud.useMasterKey();
    var interestId = request.params.interestId;
    var delete_userId = request.params.delete_userId;

    var userQuery = new Parse.Query(Parse.User);
    userQuery.get(delete_userId, {
        success: function(delete_user){
            var interestQuery = new Parse.Query(Parse.Object.extend("Interest"));
            interestQuery.get(interestId, {
                success: function(interest){
                    var interested_hackers = interest.relation("interested_hackers");
                    interested_hackers.remove(delete_user);
                    interest.save(null, {
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

Parse.Cloud.define("removeUserFromSkilledHackers", function(request, response){
    Parse.Cloud.useMasterKey();
    var skillId = request.params.skillId;
    var delete_userId = request.params.delete_userId;

    var userQuery = new Parse.Query(Parse.User);
    userQuery.get(delete_userId, {
        success: function(delete_user){
            var skillQuery = new Parse.Query(Parse.Object.extend("Skill"));
            skillQuery.get(skillId, {
                success: function(skill){
                    var skilled_hackers = skill.relation("skilled_hackers");
                    skilled_hackers.remove(delete_user);
                    skill.save(null, {
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

Parse.Cloud.define("removeUserFromHackersNeedGuy", function(request, response){
    Parse.Cloud.useMasterKey();
    var hackathonId = request.params.hackathonId;
    var delete_userId = request.params.delete_userId;

    var userQuery = new Parse.Query(Parse.User);
    userQuery.get(delete_userId, {
        success: function(delete_user){
            var hackathonQuery = new Parse.Query(Parse.Object.extend("Hackathon"));
            hackathonQuery.get(hackathonId, {
                success: function(hackathon){
                    var hackersNeedGuy = hackathon.relation("hackersNeedGuy");
                    hackersNeedGuy.remove(delete_user);
                    hackathon.save(null, {
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

Parse.Cloud.define("removeUserFromHackers", function(request, response){
    Parse.Cloud.useMasterKey();
    var hackathonId = request.params.hackathonId;
    var delete_userId = request.params.delete_userId;

    var userQuery = new Parse.Query(Parse.User);
    userQuery.get(delete_userId, {
        success: function(delete_user){
            var hackathonQuery = new Parse.Query(Parse.Object.extend("Hackathon"));
            hackathonQuery.get(hackathonId, {
                success: function(hackathon){
                    var hackers = hackathon.relation("hackers");
                    hackers.remove(delete_user);
                    hackathon.save(null, {
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


Parse.Cloud.define("removeUnwantedMyHackathon", function(request, response){
    Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var delete_myHackathonId = request.params.delete_myHackathonId;

    var hackathonQuery = new Parse.Query(Parse.Object.extend("Hackathon"));
    hackathonQuery.get(delete_myHackathonId, {
        success: function(delete_myHackathon){
            var userQuery = new Parse.Query(Parse.User);
            userQuery.get(userId, {
                success: function(user){
                    var myHackathons = user.relation("myHackathons");
                    myHackathons.remove(delete_myHackathon);
                    user.save(null, {
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

Parse.Cloud.define("removeUnwantedMyNeedGuyHackathon", function(request, response){
    Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var delete_myNeedGuyHackathonId = request.params.delete_myNeedGuyHackathonId;

    var hackathonQuery = new Parse.Query(Parse.Object.extend("Hackathon"));
    hackathonQuery.get(delete_myNeedGuyHackathonId, {
        success: function(delete_myNeedGuyHackathon){
            var userQuery = new Parse.Query(Parse.User);
            userQuery.get(userId, {
                success: function(user){
                    var myNeedGuyHackathons = user.relation("myNeedGuyHackathons");
                    myNeedGuyHackathons.remove(delete_myNeedGuyHackathon);
                    user.save(null, {
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

Parse.Cloud.define("removeUnwantedMyInterest", function(request, response){
    Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var delete_myInterestId = request.params.delete_myInterestId;

    var interestQuery = new Parse.Query(Parse.Object.extend("Interest"));
    interestQuery.get(delete_myInterestId, {
        success: function(delete_myInterest){
            var userQuery = new Parse.Query(Parse.User);
            userQuery.get(userId, {
                success: function(user){
                    var interests = user.relation("interests");
                    interests.remove(delete_myInterest);
                    user.save(null, {
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

Parse.Cloud.define("removeUnwantedMySkill", function(request, response){
    Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var delete_mySkillId = request.params.delete_mySkillId;

    var skillQuery = new Parse.Query(Parse.Object.extend("Skill"));
    skillQuery.get(delete_mySkillId, {
        success: function(delete_mySkill){
            var userQuery = new Parse.Query(Parse.User);
            userQuery.get(userId, {
                success: function(user){
                    var skills = user.relation("skills");
                    skills.remove(delete_mySkill);
                    user.save(null, {
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
                            // TODO send invite notification to this pendingMember of this group
                            sendInviteNotification(group.get("groupName"), pendingMember);
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

function sendInviteNotification(group_name, pendingMember) {
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user", pendingMember);
    Parse.Push.send({
        where: pushQuery,
        data: {
            uri: "hacktogether://groupManage/invitations",
            title: "Group Invitation",
            alert: group_name + " invites you to join"
        }
    });
}


Parse.Cloud.define("instantMessageNotification", function(request, response) {
  Parse.Cloud.useMasterKey();
  var senderId = request.params.senderId;
  var recipientId = request.params.recipientId;
  var textMessage = request.params.textMessage;
  var conversationId = request.params.conversationId;
  var isGroupChat = request.params.isGroupChat;

  var senderQuery = new Parse.Query(Parse.User);
  senderQuery.get(senderId, {
    success: function(sender){
        var recipientQuery = new Parse.Query(Parse.User);
        recipientQuery.get(recipientId, {
            success: function(recipient) {
                sendIMNotification(sender, recipient, conversationId, textMessage, isGroupChat); // snederId needs to change to conversation-id
            }
        });
    }
  });

});

function sendIMNotification(sender, recipient, conversationId, textMessage, isGroupChat) {
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user", recipient);
    pushQuery.equalTo("inMessageActivity", false);
    if (isGroupChat){
      Parse.Push.send({
          where: pushQuery,
          data: {
              title: "Group Chat",
              uri: "hacktogether://im/" + conversationId,
              alert: textMessage
          }
      }, {
        success: function() {
          // Push was successful
        },
        error: function(error) {
          // Handle error
        }
      });
  }
  else{
    Parse.Push.send({
        where: pushQuery,
        data: {
            title: sender.get("nickname"),
            uri: "hacktogether://im/" + conversationId,
            alert: textMessage
        }
    }, {
      success: function() {
        // Push was successful
      },
      error: function(error) {
        // Handle error
      }
    });
  }
}
