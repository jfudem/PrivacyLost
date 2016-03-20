/*global jQuery, console */
(function ($, document) {
    'use strict';
    //Initial Vars
    var currentState,
        //initialNumberOfpeeks = 24,
        initialNumberOfpeeks = 3,
        remainingpeeks = initialNumberOfpeeks,
        maximumCheats = 20,
        numberOfDays = 3,
        currentDay,
        lookedUpCharacter,
        deEncrypter;

    function changeToState(nextState) {
        $("#" + currentState).attr("aria-hidden", "true");
        $("#" + nextState).attr("aria-hidden", "false");
        currentState = nextState;
    }
    
    function objectTest() {
        var testObject = {
                propertyA: {
                    boolA: false,
                    boolB: false
                },
                propertyB: {
                    boolA: false,
                    boolB: false
                }
            },
            longHandValue,
            shortHandVar,
            propB;
        
        console.log("objectTest() is running");
        console.log("/////////////////////////////");
        
        testObject.propertyA.boolA = true;
        longHandValue = testObject.propertyA.boolA;
        
        console.log("testObject.propertyA.boolA = " + testObject.propertyA.boolA);
        console.log("longHandValue = " + longHandValue);
        
        shortHandVar = testObject.propertyA.boolB;
        shortHandVar = true;
        
        // This returns false
        console.log("testObject.propertyA.boolB = " + testObject.propertyA.boolB);
        console.log("shortHandVar = " + shortHandVar);
        
        propB = testObject.propertyB;
        propB.boolA = true;
        
        // This returns true and allows shorthand
        console.log("testObject.propertyB.boolA = " + testObject.propertyB.boolA + " !!!!! THIS IS MADNESS");
        console.log("propB.boolA = " + propB.boolA);
        
        console.log("testObject.propertyA.boolB = " + testObject.propertyA.boolB);

        console.log("/////////////////////////////");
        console.log("objectTest() is done");
        
        
        
        
    }
    
    function randomInt(maxValuePlusOne) {
        var randomValue = Math.floor(Math.random() * maxValuePlusOne);
        return randomValue;
    }

    function randomizeRelationships() {
        var ciPrimary,
            ciSecondary,
            numberOfPossiblities = 0,
            randRelVal = 0,
            charPrimaryRel,
            trainerVal,
            possibilityIndex;
        
        // Set lookedUpCharacter to "spouse"
        lookedUpCharacter = "spouse";
        
        // Loop Through All the characters
        for (ciPrimary in characterInfo) {
            if (characterInfo.hasOwnProperty(ciPrimary) && characterInfo[ciPrimary].hasOwnProperty("rel") === true) {
                //console.log("characterInfo." + ciPrimary + " has a property called 'rel'");
                charPrimaryRel = characterInfo[ciPrimary].rel;
                // loop through each character that the current character has a relationship with with
                for (ciSecondary in charPrimaryRel) {
                    if (charPrimaryRel.hasOwnProperty(ciSecondary) && charPrimaryRel[ciSecondary].assignedVal === null) {
                        numberOfPossiblities = charPrimaryRel[ciSecondary].possibilities.length;
                        // Check to make sure these two characters have at lest one possible relationship
                        if (numberOfPossiblities > 0) {
                            
                            // Randomly assign one of the possible relationships to this character pair. 
                            randRelVal = randomInt(numberOfPossiblities);
                            charPrimaryRel[ciSecondary].assignedVal = randRelVal;
                         
                            // Make sure the Spouse has different relationships with the trainer and dogWalker
                            // The trainer has priority
                            if (ciPrimary === "spouse" && ciSecondary === "dogWalker") {
                                trainerVal = charPrimaryRel.trainer.assignedVal;
                                if (trainerVal === randRelVal) {
                                    while (trainerVal === randRelVal) {
                                        randRelVal = randomInt(numberOfPossiblities);
                                    }
                                    charPrimaryRel[ciSecondary].assignedVal = randRelVal;
                                }
                            }
                            
                            //console.log("charPrimaryRel[ciSecondary].possibilities = " + charPrimaryRel[ciSecondary].possibilities);

                            console.log(ciPrimary + ":" + ciSecondary + " = " + charPrimaryRel[ciSecondary].assignedVal);
                            console.log("New: " + charPrimaryRel[ciSecondary].possibilities[randRelVal]);
                            console.log("///");

                            //Make sure the assigned relationship is in charPrimaryRel[ciSecondary].possibilities[randRelVal]
                            /*if (randRelVal !== 0) {
                                charPrimaryRel[ciSecondary].possibilities[0] = charPrimaryRel[ciSecondary].possibilities[randRelVal];
                            }
                            
                            // Remove unused Relationships
                            for (possibilityIndex = numberOfPossiblities; possibilityIndex > 1; possibilityIndex -= 1) {
                                charPrimaryRel[ciSecondary].possibilities.pop();
                            }*/
                            
                            //console.log("charPrimaryRel[ciSecondary].possibilities = " + charPrimaryRel[ciSecondary].possibilities);
                            //console.log("charPrimaryRel[ciSecondary].possibilities[0] = " + charPrimaryRel[ciSecondary].possibilities[0]);
                            
                            // Add Reflexive edges i.e spouse:trainer === trainer:spouse
                            if (characterInfo.hasOwnProperty(ciSecondary)) {
                                if (characterInfo[ciSecondary].hasOwnProperty("rel") === false) {
                                    characterInfo[ciSecondary].rel = {};
                                }
                                
                                if (characterInfo[ciSecondary].rel.hasOwnProperty(ciPrimary) === false) {
                                    characterInfo[ciSecondary].rel[ciPrimary] = charPrimaryRel[ciSecondary];
                                }
                            }
                            
                        }
                    }
                }
            }
                
        }
        
        console.log(characterInfo);

    }
    
    function blink(id) {
        var blinkSelector = $("#" + id),
            className = "blink",
            timeToBlink = 400;
                
        blinkSelector.addClass(className);
        setTimeout(function () {
            blinkSelector.removeClass(className);
        }, timeToBlink);
        
    }
    
    function percentChanceOfFiring() {
        var nextPeek = remainingpeeks - 1,
            percent;
        
        if (nextPeek > 0) {
            percent = 0;
        } else {
            percent = ((nextPeek *  -1) / 20) * 100;
        }
        
        return percent;
    }
    
    function updateFiringRisk() {
        var chanceOfFiring = percentChanceOfFiring(),
            fireChanceElement = $("#firechance");
        
        fireChanceElement.text(chanceOfFiring + "%");
        if (chanceOfFiring > 1) {
            fireChanceElement.addClass("risky");        
        }
        
        if (chanceOfFiring > 5) {
            $("#risk-text").addClass("risky");
        }
        
        blink("firechance");
        
    }

    function canShowContent() {
        var chanceOfFiring,
            randomValue;

        if (remainingpeeks > 0) {
            return true;
        } else {
            chanceOfFiring = remainingpeeks * -1;
            randomValue = Math.round(Math.random() * maximumCheats);
            console.log("chanceOfFiring: " + chanceOfFiring);
            console.log("randomValue: " + randomValue);
            if (randomValue <= chanceOfFiring) {
                return false;
            } else {
                return true;
            }
        }

    }
    
    function showBackgroundInfo(ciName) {
        var charRoot = characterInfo[ciName],
            /*fieldArray = [
                "firstName",
                "lastName",
                "facebookAccountNumber",
                "occupation",
                "employer",
                "criminalRecord"
            ],*/
            fieldArray = [
                {
                    property: "firstName",
                    prompt: "Name"
                },
                /*{
                    property: "lastName",
                    prompt: "Last"
                },*/
                {
                    property: "facebookAccountNumber",
                    prompt: "Facebook Account #"
                },
                {
                    property: "occupation",
                    prompt: "Occupation"
                },
                {
                    property: "employer",
                    prompt: "Employer"
                },
                {
                    property: "criminalRecord",
                    prompt: "Criminal Record"
                }
            ],
            //fieldArrayLength = fieldArray.length;
            //fieldArrayLength = 6,
            fieldArrayLength = 5,
            fieldArrayIndex = 0,
            //fieldID = "",
            //fieldResponse = "",
            backgroundClass = "background-info",
            backgroundID = backgroundClass + "-" + ciName,
            backgroundhtml = "<div id='" + backgroundID + "' class='" + backgroundClass + "'>",
            currentField,
            promptClass = "field-prompt",
            promptText = "",
            promptDelim = "<span class='delim'>: </span>",
            responseClass = "field-response",
            responseText = "",
            responseDelim = "<span class='delim'>,</span>",
            genericHolderClass = "field-holder",
            holderClassPrefix = "bg-",
            specificHolderClass = "";
        
        //$("#background-info").attr("aria-hidden", "false");
        
        for (fieldArrayIndex; fieldArrayIndex < fieldArrayLength; fieldArrayIndex += 1) {
            //fieldID = "#field-" + fieldArray[fieldArrayIndex];
            //fieldResponse = charRoot[fieldArray[fieldArrayIndex]];
            
            currentField = fieldArray[fieldArrayIndex];
            
            promptText = currentField.prompt;
            
            // JANKY JANKY JANKY - YOU SHOULD IMPROVE THIS
            if (fieldArrayIndex === 0) {
                responseText = charRoot.firstName + " " + charRoot.lastName;
            } else {
                responseText = charRoot[currentField.property];
            }
            
            specificHolderClass = holderClassPrefix + currentField.property;
            
            if (fieldArrayIndex === (fieldArrayLength - 1)) {
                responseDelim = "";
            }
            
            backgroundhtml +=
                "<span class='" + genericHolderClass + " " + specificHolderClass + "'>" +
                    "<span class='" + promptClass + "'>" +
                        promptText +
                        promptDelim +
                    "</span>" +
                    "<span class='" + responseClass + "'>" +
                        responseText +
                        responseDelim +
                    "</span>" +
                "</span>";
            
            //console.log("fieldID = " + fieldID);
            //console.log("fieldResponse = " + fieldResponse);
            //$(fieldID).text(fieldResponse);
        }
        
        //$("#field-first").text("myFirstHerePlease");
        //$("#field-first").text(charRoot.first);
        //$("#field-last").text(charRoot.last);
        
        backgroundhtml += "</div>";
        return backgroundhtml;
        
    }

    function revealButton(ciName, convButtonId) {
        var revealButtonID = "reveal-identity-button",
            buttonHTML = "<button id='" + revealButtonID + "'>Look Up Recipient ID</button>";

        if (characterInfo[ciName].identityRevealed === false) {
            //$("#background-info").attr("aria-hidden", "true");
            $("#main-view-button-holder").html(buttonHTML);
            $("#" + revealButtonID).on("click", function () {
                if (canShowContent() === true) {
                    characterInfo[ciName].identityRevealed = true;
                    addConversations();
                    $("#main-view-button-holder").html("");
                    remainingpeeks -= 1;
                    $("#peeks").text(remainingpeeks);
                    blink("peeks");
                    //$("#firechance").text(percentChanceOfFiring() + "%");
                    //blink("firechance");
                    updateFiringRisk();
                    blink(convButtonId);
                    updateQueryView(ciName);
                    //showBackgroundInfo(ciName);
                    loadDatabaseOptions();
                    setTimeout(function () {
                        blink("lookedUpUserHolder");
                        blink("userIDHolder");
                    }, 700);
                } else {
                    youAreFired();
                }
            });
        } else {
            $("#main-view-button-holder").html("");
            //showBackgroundInfo(ciName);

            
        }

    }
    
    //function newRevealButton(ciName, convButtonId, holderID) {
    function newRevealButton(ciName, buttonIndex) {
        var revealButtonID = "reveal-identity-button-" + buttonIndex,
            convButtonId = "conv-button-" + buttonIndex,
            holderID = "reveal-holder-" + buttonIndex,
            buttonHTML = "<button id='" + revealButtonID + "'>Run Background Check</button>";

        if (characterInfo[ciName].identityRevealed === false) {
            //$("#background-info").attr("aria-hidden", "true");
            $("#" + holderID).html(buttonHTML);
            $("#" + revealButtonID).on("click", function () {
                if (canShowContent() === true) {
                    characterInfo[ciName].identityRevealed = true;
                    addConversations();
                    $("#" + holderID).html("");
                    remainingpeeks -= 1;
                    $("#peeks").text(remainingpeeks);
                    blink("peeks");
                    //$("#firechance").text(percentChanceOfFiring() + "%");
                    //blink("firechance");
                    updateFiringRisk();
                    blink(convButtonId);
                    updateQueryView(ciName);
                    //showBackgroundInfo(ciName);
                    loadDatabaseOptions();
                    setTimeout(function () {
                        blink("lookedUpUserHolder");
                        blink("userIDHolder");
                    }, 700);
                } else {
                    youAreFired();
                }
            });
        } else {
            $("#" + holderID).html("");
            //showBackgroundInfo(ciName);

            
        }

    }

    function showMessage(e) {
        var conversationIndex = e.data.index,
            dayString = e.data.entryDay,
            ciName = e.data.clickedName,
            messageBodyId = e.data.messageID,
            charBranch = characterInfo[lookedUpCharacter].rel[ciName],
            relValue = charBranch.assignedVal,
            keyValue = charBranch.key,
            conversation = messages[dayString][keyValue][relValue],
            hasConfrontationLevel,
            messageConfrontationLevel;

        if (canShowContent() === true) {
            //Normal Functionality
            //conversation[conversationIndex].showBody = true;
            // Special showboday state for deencryption animation 
            conversation[conversationIndex].showBody = 0;
            hasConfrontationLevel = conversation[conversationIndex].hasOwnProperty('confrontationLevel');
            console.log("Does this message have a confrontationLevel property? " + hasConfrontationLevel);
            if (hasConfrontationLevel === true) {
                messageConfrontationLevel = conversation[conversationIndex].confrontationLevel;
                if (confrontations.hasOwnProperty(ciName) && messageConfrontationLevel > confrontations[ciName].confrontationLevel) {
                    confrontations[ciName].confrontationLevel = messageConfrontationLevel;
                    console.log("the new confrontation level for " + ciName + " is " + messageConfrontationLevel);
                }
            }
            remainingpeeks -= 1;
            $("#peeks").text(remainingpeeks);
            blink("peeks");
            //$("#firechance").text(percentChanceOfFiring() + "%");
            //blink("firechance");
            updateFiringRisk();
            updateQueryView(ciName);
            console.log("ciName = " + ciName);
            console.log("messageBodyId = " + messageBodyId);
            console.log(messageBodyId);
            console.log(" end of showMessage Logs");
            deencrypt(messageBodyId, conversation[conversationIndex].messageBody);
            quickDeencrypt(messageBodyId, conversation[conversationIndex].messageBody);
            conversation[conversationIndex].showBody = true;
        
        } else {
            youAreFired();
        }
    }

    function youAreFired() {
        console.log("YOU ARE FIRED");
        //$("#quirky-dog").trigger("pause"); // outdated
        //$("#quirky-dog").trigger("load"); // uncomment to restore sound
        updateFiringRisk();
        changeToState("end-state");
        $("#new-game").on("click", newGame);
    }

    function updateQueryView(ciName) {
        var dayString = "",
            dayIndex = 1,
            charBranch,
            relValue,
            keyValue,
            conversation,
            conversationLength = 0,
            conversationIndex,
            localMessageBody = "",
            messageHTML = "",
            senderCode = "",
            localSender = "",
            localDate = "",
            newButtonID = "",
            activateButtons = false,
            masterIndex = 0,
            pressentDate = new Date(),
            todayMonth = pressentDate.getMonth() + 1,
            todayDay = pressentDate.getDate(),
            todayYear = pressentDate.getYear() + 1900,
            lookedUpCharClass = "looked-up-char",
            secondaryCharClass = "secondary-char",
            senderCSSClass = "",
            messageBodyId = "",
            innerMessageBody = "";

        $("#results-holder").html("");

        for (dayIndex; dayIndex <= currentDay; dayIndex += 1) {
            dayString = "day" + dayIndex;
            charBranch = characterInfo[lookedUpCharacter].rel[ciName];
            relValue = charBranch.assignedVal;
            keyValue = charBranch.key;
            conversation = messages[dayString][keyValue][relValue];
            conversationLength = conversation.length;
            conversationIndex = 0;

            for (conversationIndex; conversationIndex < conversation.length; conversationIndex += 1) {
                // Replace with updateIndividualMessage function
                senderCode = conversation[conversationIndex].sender;

                if (senderCode === lookedUpCharacter) {
                    localSender =
                        "<span class='field-prompt'>" +
                            "Sender Name" +
                            "<span class='delim'>:</span> " +
                        "</span>" +
                        "<span class='field-response'>" +
                            characterInfo[lookedUpCharacter].firstName + " " + characterInfo[lookedUpCharacter].lastName +
                            "<span class='delim'>,</span>" +
                        "</span>";
                    // Set sender CSS Class
                    senderCSSClass = lookedUpCharClass;
                } else {

                    if (characterInfo[senderCode].identityRevealed === true) {
                        localSender =
                            "<span class='field-prompt'>" +
                                "Sender Name" +
                                "<span class='delim'>:</span> " +
                            "</span>" +
                            "<span class='field-response'>" +
                                characterInfo[senderCode].firstName + " " + characterInfo[senderCode].lastName +
                                "<span class='delim'>,</span>" +
                            "</span>";
                    } else {
                        localSender =
                            "<span class='field-prompt'>" +
                                "Sender ID" +
                                "<span class='delim'>:</span> " +
                            "</span>" +
                            "<span class='field-response'>" +
                                characterInfo[senderCode].facebookAccountNumber +
                                "<span class='delim'>,</span>" +
                            "</span>";
                    }
                    // Set sender CSS Class
                    senderCSSClass = secondaryCharClass;
                }

                localDate = todayDay + (dayIndex - 1);
                localDate = todayMonth + "/" + localDate + "/" + todayYear;

                localDate += " at " + conversation[conversationIndex].time;
                
                messageBodyId = "message-content-" + masterIndex;
                
                if (conversation[conversationIndex].showBody === false) {
                    newButtonID = "my-entry-button-" + masterIndex;
                    localMessageBody =
                        "Entry Encrypted<br >" +
                        "<button id='" + newButtonID + "' class='message-button'>Decrypt Message</button>";

                    activateButtons = true;
                } else {
                    console.log("showBody isn't false");
                    if (conversation[conversationIndex].showBody === true) {
                        innerMessageBody = conversation[conversationIndex].messageBody;
                    } else {
                        innerMessageBody = "";
                    }
                    
                    localMessageBody =
                        "<br ><span id='" + messageBodyId + "'>" + innerMessageBody + "</span>";
                }

                messageHTML =
                    "<li class='" + senderCSSClass + "'>" +
                        "<span class='field-holder message-sender'>" +
                            localSender +
                        "</span>" +
                        "<span class='field-holder message-date'>" +
                            "<span class='field-prompt'>" +
                                "Date" +
                                "<span class='delim'>:</span> " +
                            "</span>" +
                            "<span class='field-response'>" +
                                localDate +
                                "<span class='delim'>,</span>" +
                            "</span>" +
                        "</span>" +
                        "<span class='field-holder message-body'>" +
                            "<span class='field-prompt'>" +
                                "Message Body" +
                                "<span class='delim'>:</span> " +
                            "</span>" +
                            "<span class='field-response'>" +
                                localMessageBody +
                            "</span>" +
                        "</span>" +
                    "</li>";
                $("#results-holder").append(messageHTML);

                if (activateButtons === true) {
                    $("#" + newButtonID).on("click", {index: conversationIndex, entryDay: dayString, clickedName: ciName, messageID: messageBodyId}, showMessage);
                    activateButtons = false;
                }

                masterIndex += 1;
            // End  updateIndividualMessage function
            }

        }

    }

    function conversationClicked(e) {
        var buttonID = e.data.id,
            ciName = e.data.clickedName;
        $(".conversation-button").removeClass("selected");
        $("#" + buttonID).addClass("selected");

        // Old reveal Button location, in main message view area
        //console.log("revealbutton(ciName, buttonID) = revealbutton(" + ciName + ", " + buttonID + ");");
        //revealButton(ciName, buttonID);
        
        //$("#results-holder").html("");
        updateQueryView(ciName);

    }

    function addConversations() {
        var ciName,
            dayString,
            dayToTry,
            sender = "",
            recipient = characterInfo[lookedUpCharacter].facebookAccountNumber,
            charBranch,
            relValue,
            keyValue,
            conversation,
            mostRecentDate = "",
            htmlToAppend = "",
            buttonIndex = 0,
            buttonID = "";

        $('#asideul').html(htmlToAppend);

        for (ciName in characterInfo[lookedUpCharacter].rel) {
            if (characterInfo[lookedUpCharacter].rel.hasOwnProperty(ciName) && ciName !== lookedUpCharacter) {
                charBranch = characterInfo[lookedUpCharacter].rel[ciName];
                relValue = charBranch.assignedVal;
                keyValue = charBranch.key;

                //Check to see if there are new messages today. If there aren't new messages today, grab yesterday's conversation.
                for (dayToTry = currentDay; dayToTry >= 1; dayToTry -= 1) {
                    dayString = "day" + dayToTry;
                    // Load the current conversation
                    
                    console.log("addConversation Glitch Area");
                    console.log("lookedUpCharacter: " + lookedUpCharacter);
                    console.log("ciName: " + ciName);
                    console.log("about to print charBranch");
                    console.log(charBranch);
                    console.log("about to print keyValue");
                    console.log(keyValue);
                    console.log("////");
                    try {
                        conversation = messages[dayString][keyValue][relValue];
                    } catch (err) {
                        console.log("Begin Catch");
                        console.log("There are no messages in this branch");
                        console.log("lookedUpCharacter = " + lookedUpCharacter + "; ciName = " + ciName + "; keyValue = " + keyValue);
                        console.log("End Catch");
                    }
                    
                    //If there is a conversation from the tested day, break keeping the conversation variable set as is.
                    //Most of the time, the break will be called.
                    //The line below looks to see if there is at least one entry 
                        //in the converation array for the given day, character and relationship
                        //Eventually this should probably be stacked in case multiple levels of arrays/objects are empty
                            //IDK maybe this is sufficient. 
                            //I just want to limit the amount of empty sections I need in my data.js file 
                    if (conversation[0] !== undefined) {
                        console.log("there are no messages in this conversation. Time to break");
                        break;
                    }

                }

                // It's possible to have a character who doesn't begin talking until 1 or more days into the game
                // in the above case conversation will still be undefined even after the previous for loop finishes
                // Therefore, we check to make sure the current conversation still isn't undefined.
                // If it is undefined, we don't need to look up or load anything for this character today. 
                if (conversation[0] !== undefined) {
                    if (characterInfo[ciName].identityRevealed === true) {
                        //sender = characterInfo[ciName].firstName + "." + characterInfo[ciName].lastName + ";<br >Occupation: " + characterInfo[ciName].occupation + ";";
                        sender = showBackgroundInfo(ciName);
                    } else {
                        sender =
                            "<span class='field-holder conv-userid'>" +
                                "<span class='field-prompt'>" +
                                    "Sender ID" +
                                    "<span class='delim'>:</span> " +
                                "</span>" +
                                "<span class='field-response'>" +
                                    characterInfo[ciName].facebookAccountNumber +
                                    "<span class='delim'>,</span>" +
                                "</span>" +
                            "</span>";
                    }

                    mostRecentDate = conversation[conversation.length - 1].time + " UTC-05:00";

                    buttonID = "conv-button-" + buttonIndex;

                    htmlToAppend =
                        "<li id='" + buttonID + "' class='conversation-button'>" +
                            //"<h5>" + sender + "</h5>" +
                            sender +
                            "<span class='field-holder conv-recip-name'>" +
                                "<span class='field-prompt'>" +
                                    //"X-Received-BY" +
                                    "Recipient" +
                                    "<span class='delim'>:</span> " +
                                "</span>" +
                                "<span class='field-response'>" +
                                    characterInfo[lookedUpCharacter].firstName + " " + characterInfo[lookedUpCharacter].lastName +
                                    "<span class='delim'>,</span>" +
                                "</span>" +
                            "</span>" +
                            "<span class='field-holder conv-recip-id'>" +
                                "<span class='field-prompt'>" +
                                    "Recipient ID" +
                                    "<span class='delim'>:</span> " +
                                "</span>" +
                                "<span class='field-response'>" +
                                    characterInfo[lookedUpCharacter].facebookAccountNumber +
                                    "<span class='delim'>,</span>" +
                                "</span>" +
                            "</span>" +
                            "<span class='field-holder conv-timestamp'>" +
                                "<span class='field-prompt'>" +
                                    "Timestamp" +
                                    "<span class='delim'>:</span> " +
                                "</span>" +
                                "<span class='field-response'>" +
                                    mostRecentDate +
                                "</span>" +
                            "</span>" +
                            "<span id='reveal-holder-" + buttonIndex + "' class='field-holder new-reveal-holder'>" +
                            "</span>" +
                        "</li>";

                    $('#asideul').append(htmlToAppend);
                    // reveal button here
                    newRevealButton(ciName, buttonIndex);
                    
                    $("#" + buttonID).on("click", {id: buttonID, clickedName: ciName}, conversationClicked);

                    buttonIndex += 1;

                }

            }
        }

    }

    function goToWorkButtonIsClicked() {
        console.log("go-to-work");
        changeToState("work-state");
        setupDay();

    }

    function displayDialogueLine(dialogueArray, index) {
        var speakingCharacter = dialogueArray.response[index].character,
            dialogueLine = dialogueArray.response[index].content,
            prompt =
                "<div style='font-weight: bold; text-align: center; '>" +
                    speakingCharacter + ": " +
                "</div>" +
                "<div style='text-align: center;'>" +
                    dialogueLine +
                "</div>",
            response,
            buttonOptions,
            responseButtonOptions = {
                back: {
                    id: "conf-back-button",
                    text: "Back",
                    functionToRun: function () {
                        mainConfrontationView();
                    }
                },
                next: {
                    id: "conf-next-button",
                    text: "Next",
                    functionToRun: function () {
                        var nextIndex = index + 1;
                        displayDialogueLine(dialogueArray, nextIndex);
                    }
                }
            };
        
        if (index === (dialogueArray.response.length - 1)) {
            buttonOptions = responseButtonOptions.back;
        } else {
            buttonOptions = responseButtonOptions.next;
        }
        
        response =
            "<div style='text-align: center; margin: 10px auto;'>" +
                "<button id='" + buttonOptions.id + "' style='text-align: center; margin: 0 auto;'>" +
                    buttonOptions.text +
                "</button>" +
            "</div>";
        $("#confrontation-prompt").html(prompt);
        $("#confrontation-response").html(response);
        $("#" + buttonOptions.id).on("click", buttonOptions.functionToRun);
    }

    function confrontationDialogueLogic(e) {
        var currentCharacter = e.data.character,
            currentConvLevel = e.data.level,
            currenctRelValue = e.data.rel,
            convArray = confrontations[currentCharacter].levels[currentConvLevel],
            dialogueArray = convArray.possibleRelationships[currenctRelValue],
            // old: confrontations[convCharacterIndex].levels[localConfrontationLevel].possibleRelationships
            prompt,
            response,
            speakingCharacter,
            dialogueLine,
            currentDialogueIndex = 0;

        console.log("currentCharacter: " + currentCharacter);
        console.log("currentConvLevel: " + currentConvLevel);
        console.log("currenctRelValue: " + currenctRelValue);
        //Set confronted to false
        convArray.confronted = true;
        
        displayDialogueLine(dialogueArray, currentDialogueIndex);
    }

    function mainConfrontationView() {
        var convCharacterIndex,
            localRelValue,
            canConfront = false,
            localConfrontationLevel,
            prompText = "",
            responseHTML = "",
            responseText = "",
            generatedButtonId = "",
            buttonArray = [],
            buttonArrayContent,
            buttonArrayLength = 0,
            buttonArrayIndex = 0;

        for (convCharacterIndex in confrontations) {
            if (confrontations.hasOwnProperty(convCharacterIndex)) {
                localConfrontationLevel = confrontations[convCharacterIndex].confrontationLevel;
                if (localConfrontationLevel > -1 && confrontations[convCharacterIndex].levels[localConfrontationLevel].confronted === false) {
                    canConfront = true;

                    // Allow for the possibility that confrontation are not customized for different relationships
                        //Should probably make sure array doesn't have length 0 here. But for now fuck it. 
                    if (confrontations[convCharacterIndex].levels[localConfrontationLevel].possibleRelationships.length > 1) {
                        localRelValue = characterInfo.spouse.rel[convCharacterIndex].assignedVal;
                    } else {
                        localRelValue = 0;
                    }

                    responseText = confrontations[convCharacterIndex].levels[localConfrontationLevel].possibleRelationships[localRelValue].prompt;
                    generatedButtonId = "confront-" + convCharacterIndex + "-level-" + localConfrontationLevel;
                    responseHTML +=
                        "<div style='text-align: center; margin: 0 auto;'>" +
                            "<button id='" + generatedButtonId + "'>" + responseText + "</button>" +
                        "</div>";

                    buttonArrayContent = {
                        id: generatedButtonId,
                        character: convCharacterIndex,
                        level: localConfrontationLevel,
                        rel: localRelValue
                    };

                    buttonArray.push(buttonArrayContent);
                    buttonArrayLength += 1;

                }
            }
        }

        if (canConfront === true) {
            prompText =
                "Would you like to confront your " +
                genderedWords.spouse.spouseType +
                " about any of the Facebook Messages you intercepted today?";
        } else {
            prompText =
                "You have nothing to confront your " +
                genderedWords.spouse.spouseType +
                " about";
        }

        $("#confrontation-prompt").text(prompText);
        $("#confrontation-response").html(responseHTML);

        for (buttonArrayIndex; buttonArrayIndex < buttonArrayLength; buttonArrayIndex += 1) {
            $("#" + buttonArray[buttonArrayIndex].id).on("click", {
                character: buttonArray[buttonArrayIndex].character,
                level: buttonArray[buttonArrayIndex].level,
                rel: buttonArray[buttonArrayIndex].rel
            }, confrontationDialogueLogic);
        }
    }

    function initializeHome() {
        $("#go-to-work").on("click", goToWorkButtonIsClicked);
        mainConfrontationView();
    }

    function clockOutButtonIsClicked() {
        //'use strict';
        if (currentDay < 3) {
            currentDay += 1;
            changeToState("home-state");
            initializeHome();
        }
    }
    
    function resetTables() {
        $("#main-view-button-holder").html("");
        $("#results-holder").html("");
        addConversations();
    }

    function setupDay() {
        $("button").off("click");
        $("li").off("click");
        $("#day").text(currentDay);
        remainingpeeks = initialNumberOfpeeks;
        $("#peeks").text(remainingpeeks);
        $("#clock-out").on("click", clockOutButtonIsClicked);
        resetTables();
        setContentHeight();
    }
    
    function optionHTML(value, optionText) {
        var html = "<option value='" + value + "'>" + optionText + "</option>";
        return html;
    }
    
    function loadDatabaseOptions() {
        var char = characterInfo[lookedUpCharacter],
            fullName = char.firstName + " " + char.lastName,
            lookedUpUserHTML = optionHTML(lookedUpCharacter, fullName),
            userIDHTML = optionHTML(lookedUpCharacter, char.facebookAccountNumber),
            anotherCharacter,
            anotherName,
            anotherFBId;
        
        for (anotherCharacter in characterInfo) {
            if (characterInfo.hasOwnProperty(anotherCharacter) && anotherCharacter !== lookedUpCharacter) {
                if (characterInfo[anotherCharacter].identityRevealed === true) {
                    anotherName = characterInfo[anotherCharacter].firstName + " " + characterInfo[anotherCharacter].lastName;
                    anotherFBId = characterInfo[anotherCharacter].facebookAccountNumber;
                    lookedUpUserHTML += optionHTML(anotherCharacter, anotherName);
                    userIDHTML += optionHTML(anotherCharacter, anotherFBId);
                }
            }
        }
        
        $("#lookedUpUserHolder").html(lookedUpUserHTML);
        $("#userIDHolder").html(userIDHTML);

        $("#lookedUpUserHolder").off("change");
        $("#lookedUpUserHolder").on("change", function () {
            var newVal = $("#lookedUpUserHolder").val();
            console.log("change");
            console.log(newVal);
            $("#userIDHolder").val(newVal);
            lookedUpCharacter = newVal;
            resetTables();
            blink("content");
        });
        
        $("#userIDHolder").off("change");
        $("#userIDHolder").on("change", function () {
            var newVal = $("#userIDHolder").val();
            console.log("change");
            console.log(newVal);
            $("#lookedUpUserHolder").val(newVal);
        });
        
    }

    function setContentHeight() {
        var viewportHeight = $(window).height(),
            headerHeightPlus = $("header").height() + 42,
            contentHeight = viewportHeight - headerHeightPlus;
        
        console.log("viewportHeight: " + viewportHeight);
        console.log("headerHeightPlus: " + headerHeightPlus);
        console.log("contentHeight: " + contentHeight);
        
        $("#main-content").css({
            height: contentHeight + "px"
        });
        
        $("#aside-content ").css({
            height: contentHeight + "px"
        });
            
    }
    
    function initializeWork() {
        initializeMessages();
        initializeConfrontations();
        randomizeRelationships();
        loadDatabaseOptions();
        //$("#quirky-dog").trigger("play"); // uncomment to restore sound
        setupDay();
    }
    
    function offFormConfirmEvents() {
        // Disable both events registered by the Confirm Page
        $("#back-to-form").off("click");
        $("#start-work").off("submit");
        
        // Hide the Form
        $("#gender-results").attr("aria-hidden", "true");
    }
    
    function confirmGenderInfo() {
        var spouseInfoHTML = showBackgroundInfo("spouse");
        
        // Load and Display The Confirmation Page
        $("#gender-results-holder").html(spouseInfoHTML);
        $("#gender-results").attr("aria-hidden", "false");
        
        // Set the Back Button
        $("#back-to-form").on("click", function () {
            offFormConfirmEvents();
            loadGenderForm();
        });
        
        // Set the Submit Button
        $("#start-work").on("click", function (event) {
            offFormConfirmEvents();
            changeToState("work-state");
            initializeWork();
        });
    }
    
    function processGenderForm() {
        var yourGender = $("#yourgender select").val(),
            //yourGender = $("#yourgender input[type='radio']:checked").val(),
            spouseGender = $("#spousegender select").val(),
            //spouseGender = $("#spousegender input[type='radio']:checked").val(),
            youIndex,
            SpouseIndex,
            randomIndex = 0,
            genderArray = ["female", "male"];
        
        console.log("yourGender = " + yourGender);
        
        if (yourGender === "random") {
            randomIndex = randomInt(2);
            yourGender = genderArray[randomIndex];
        }
        
        if (spouseGender === "random") {
            randomIndex = randomInt(2);
            spouseGender = genderArray[randomIndex];
        }
        
        characterInfo.spouse.firstName = characterInfo.spouse[spouseGender];
        characterInfo.trainer.firstName = characterInfo.trainer[yourGender];
        characterInfo.dogWalker.firstName = characterInfo.dogWalker[yourGender];

        if (yourGender === "female") {
            characterInfo.friend.firstName = characterInfo.friend.male;
        } else if (yourGender === "male") {
            characterInfo.friend.firstName = characterInfo.friend.female;
        } else {
            characterInfo.friend.firstName = characterInfo.friend.neutral;
        }

        // Loop through gendered word arrays and assign approprite terms/pronouns.
        for (youIndex in genderedWords.you) {
            if (genderedWords.you.hasOwnProperty(youIndex)) {
                genderedWords.you[youIndex] = genderedWords[yourGender][youIndex];
            }
        }

        for (SpouseIndex in genderedWords.spouse) {
            if (genderedWords.spouse.hasOwnProperty(SpouseIndex)) {
                genderedWords.spouse[SpouseIndex] = genderedWords[spouseGender][SpouseIndex];
            }
        }

        confirmGenderInfo();
        /*changeToState("work-state");
        initializeWork();*/
    }
    
    function offGenderFormEvents() {
        // Disable both events registered by the Form
        $("#back-from-form").off("click");
        $("#gender-form").off("submit");
        
        // Hide the Form
        $("#gender-form-holder").attr("aria-hidden", "true");
    }
    
    function loadGenderForm() {
        // Display The Form
        $("#gender-form-holder").attr("aria-hidden", "false");
        
        // Set the Back Button
        $("#back-from-form").on("click", function () {
            offGenderFormEvents();
            textCycler(-1);
        });
        
        // Set the Submit Button
        $("#gender-form").submit(function (event) {
            event.preventDefault();
            offGenderFormEvents();
            processGenderForm();
        });
    }
    
    function randomCharacter() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            pLength = 62,
            randomArray = possible.charAt(Math.floor(Math.random() * pLength));
        
        return randomArray;
    }
    
    function deAnimate(string, index, stringLength, deID) {
        var randomArr = randomCharacter(),
            currentString = string.slice(0, index) + randomArr + "*";
        
        //$("#" + deID).text(string.slice(0, 1) + "*");
        
        if (index <= stringLength) {
            $("#" + deID).text(currentString);
            index += 1;
            
            deEncrypter = setTimeout(function () {
                deAnimate(string, index, stringLength, deID);
            }, 65);
        } else {
            $("#" + deID).parent().text(string);
            
        }
        
    }
    
    function deencrypt(id, string) {
        var deID = "deencrypt",
            open = "<span id='" + deID + "'>",
            close = "</span>",
            stringLength = string.length;
        
        clearTimeout(deEncrypter);
        
        $("#" + id).html(open + "*" + close);
        deAnimate(string, 0, stringLength, deID);

    }
    
    function populateRandomArray(size, maxRandomValue, minRandomValue) {
        var randomArray = [],
            randomArrayIndex = 0,
            randomInt,
            numberOfPossibleRandomInts = (maxRandomValue - minRandomValue) + 1,
            lowestPossibleRandomInt = minRandomValue;
        
        for (randomArrayIndex; randomArrayIndex < size; randomArrayIndex += 1) {
            randomInt = Math.floor(Math.random() * numberOfPossibleRandomInts) + lowestPossibleRandomInt;
            randomArray[randomArrayIndex] = randomInt;
        }
        
        return randomArray;
        
    }
    
    function deencryptFrame(deID, string, stringLength, randomArray, maxRandomValue, dencryptionAttemptIndex) {
        var characterIndex = 0,
            dencryptingText = "";
        
        if (dencryptionAttemptIndex < maxRandomValue) {
            for (characterIndex; characterIndex < stringLength; characterIndex += 1) {
                if (dencryptionAttemptIndex < randomArray[characterIndex]) {
                    dencryptingText = dencryptingText + randomCharacter();
                } else {
                    dencryptingText = dencryptingText  + string.charAt(characterIndex);
                }
            }
            
            $("#" + deID).html(dencryptingText);
            dencryptionAttemptIndex += 1;
            deEncrypter = setTimeout(function () {
               deencryptFrame(deID, string, stringLength, randomArray, maxRandomValue, dencryptionAttemptIndex);
            }, 100);
        } else {
            $("#" + deID).parent().text(string);
        }
    }
    
    function quickDeencrypt(id, string) {
        var deID = "deencrypt",
            open = "<span id='" + deID + "'>",
            close = "</span>",
            stringLength = string.length,
            randomArray = [],
            maxRandomValue = 5,
            minRandomValue = 2,
            dencryptingText = "",
            dencryptionAttemptIndex = 0,
            characterIndex;
        
        // Clear the timeout incase user skipped through the previous deencryption process
        clearTimeout(deEncrypter);
            
        // Populate randomArray
        randomArray = populateRandomArray(stringLength, maxRandomValue, minRandomValue);
        
        
        
        //console.log("randomArray[] = ");
        //console.log(randomArray);
        //console.log("end randomArray[]");
        
        /*for (characterIndex = 0; characterIndex < stringLength; characterIndex += 1) {
            if (dencryptionAttemptIndex < randomArray[characterIndex]) {
                dencryptingText = dencryptingText + randomCharacter();
            } else {
                dencryptingText = dencryptingText  + string.charAt(characterIndex);
            }
        }*/
        $("#" + id).html(open + close);
        deencryptFrame(deID, string, stringLength, randomArray, maxRandomValue, dencryptionAttemptIndex);
        //deAnimate(string, 0, stringLength, deID);

    }
    
    
    function offCyclerEvents() {
        // Remove Any Next or Back Events
        $("#back-text").off("click");
        $("#next-text").off("click");
    }
    
    function textCycler(contentIndex) {
        var contentStem = $("#text-reference").children(),
            highestIndex = contentStem.length,
            htmlToInsert = "",
            prevIndex,
            nextIndex;
        /*
        // Remove Any Next or Back Events
        $("#back-text").off("click");
        $("#next-text").off("click");*/
        
        if (contentIndex <= 0) {
            // When called from an external function, we need to trun the #intro-text holder div on, sinc it is hidden by default
            $("#intro-text").attr("aria-hidden", "false");
            //$("#gender-form-holder").attr("aria-hidden", "true");
            if (contentIndex === 0) {
                $("#back-text").attr("aria-hidden", "true");
            } else {
                contentIndex = highestIndex - 1;
            }
        }
        
        if (contentIndex > 0) {
            prevIndex = contentIndex - 1;
            $("#back-text").attr("aria-hidden", "false");
            
            $("#back-text").on("click", function () {
                offCyclerEvents();
                textCycler(prevIndex);
            });
        }
        
        if (contentIndex < highestIndex) {
            nextIndex = contentIndex + 1;
            $("#next-text").on("click", function () {
                offCyclerEvents();
                textCycler(nextIndex);
            });
        } else if (contentIndex === highestIndex) {
            $("#intro-text").attr("aria-hidden", "true");
            loadGenderForm();
        }
        
        htmlToInsert = contentStem.eq(contentIndex).text();
        
        //$("#cycle-text").html(deencrypt(htmlToInsert));
        quickDeencrypt("cycle-text", htmlToInsert);
        
    }
    
    function initializeGenderState() {
        // Reset Default values of GenderForm
        $("#spousegender select").val("neutral");
        $("#yourgender select").val("neutral");
        
        // Begin Intro Text Sequence
        textCycler(0);
    }

    function newGame() {
        console.log("new game");
        changeToState("intro-state");
        currentDay = 1;
        initializeCharacterInfo();
        $("#begin-game").on("click", function (event) {
            $("#begin-game").off("click");
            
            //Uncomment the next two lines for normal opening
            changeToState("gender-state");
            initializeGenderState();
            
            // Coment out the next line for normal begining
            //processGenderForm();
        });
    }

    $(document).ready(function () {
        newGame();
    });
})(jQuery);