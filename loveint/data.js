var characterInfo = {},
    messages = {},
    confrontations = {};

/*
lookedUpPerson.conversationCodeWord.day1.message[0];
.day1.message[0];
trainer.spouse.
*/

/*
The Relationhsip System uses a character ranking hierachy 
This system simplifies reflexive relationships
The highest ranking character is the spouse, followed by the trainer, then the dogwalker, then the friend
For purposes of array logic, characters only store relationships for characters with a lower rank.



*/
function initializeCharacterInfo() {
    "use strict";
    characterInfo = {
        spouse: {
            firstName: "",
            lastName: "Jones",
            female: "Felicity",
            male: "Felix",
            neutral: "Charlie",
            facebookAccountNumber: "FB44271",
            occupation: "Real Estate Broker",
            employer: "Glass Houses Realty",
            criminalRecord: "N/A",
            identityRevealed: true,
            rel: {
                trainer: {
                    key: "spouseToTrainer",
                    assignedVal: null,
                    possibilities: [
                        "Your spouse cheats with the trainer",
                        "Your spouse has unrequited feelings for the trainer",
                        "The trainer has unrequited feelings for your spouse",
                        "Your spouse has no special relationship with the trainer"
                    ]
                },
                dogWalker: {
                    key: "spouseToDogWalker",
                    assignedVal: null,
                    possibilities: [
                        "Your spouse cheats with the dog walker",
                        "The dog walker has unrequited feelings for your spouse",
                        "Your spouse buys weed from the dog walker",
                        "Your spouse has no special relationship with the dog walker"
                    ]
                },
                friend: {
                    key: "spouseToFriend",
                    assignedVal: null,
                    possibilities: [
                        "Your spouse complains about you to the friend",
                        "Your spouse talks about erotic novels with the friend"
                    ]
                }
            }
        },
        trainer: {
            firstName: "",
            lastName: "Beckham",
            female: "Aaliyah",
            male: "Arnold",
            neutral: "Adrian",
            facebookAccountNumber: "FB96233",
            occupation: "Personal Fitness Trainer",
            employer: "Ab-Solute Fitness",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
                dogWalker: {
                    key: "trainerToDogWalker",
                    assignedVal: 0,
                    possibilities: [
                        "The trainer buys weed from the dog walker",
                        "The trainer gossips about your spouse with the dog walker"
                    ]
                },
                spouseOfFriend: {
                    key: "trainerToSpouseOfFriend",
                    assignedVal: 0,
                    possibilities: [
                        "the Trainer has an affair with the friend's spouse"
                    ]
                },
                syndicateEmployee: {
                    key: "trainerToSyndicateEmployee",
                    assignedVal: 0,
                    possibilities: [
                        "Trainer mentions spouses to Syndicate Solutions Worker"
                    ]
                },
                bankVP: {
                    key: "trainerToBankVP",
                    assignedVal: 0,
                    possibilities: [
                        "Trainer asks BankVP for loan"
                    ]
                }
            }
        },
        dogWalker: {
            firstName: "",
            lastName: "Slaks",
            male: "Ralph",
            female: "Riya",
            neutral: "Riley",
            facebookAccountNumber: "FB26934",
            occupation: "Dog Walker",
            employer: "Neighborhood WatchDogs",
            criminalRecord: "Misdemeanor, Marijuana Possesion, 2013",
            identityRevealed: false,
            rel: {
                friend: {
                    key: "dogWalkerToFriend",
                    assignedVal: null,
                    possibilities: [
                        "The dog walker sells weed to the Friend",
                        "The dog walker sleeps with the friend"
                    ]
                },
                spouseOfFriend: {
                    key: "dogWalkerToSpouseOfFriend",
                    assignedVal: 0,
                    possibilities: [
                        "The friend's spouse owes the dog walker money"
                    ]
                },
                drugLord: {
                    key: "dogWalkerToDrugLord",
                    assignedVal: 0,
                    possibilities: [
                        "The Dog Walker wants to join the Drug Lord's crew"
                    ]
                }
            }
        },
        friend: {
            firstName: "",
            lastName: "Reynolds",
            female: "Samantha",
            male: "Samuel",
            neutral: "Sam",
            facebookAccountNumber: "FB59077",
            occupation: "First Grade Teacher",
            employer: "Big Brother, Big Sister Elementary",
            criminalRecord: "N/A",
            identityRevealed: false/*,
            rel: {
            }*/
        },
        spouseOfFriend: {
            firstName: "Jessie",
            lastName: "Reynolds",
            female: "Jessie",
            male: "Jessie",
            facebookAccountNumber: "FB83848",
            occupation: "Hotel Manager",
            employer: "XKey Suites",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
            
            }
        },
        drugLord: {
            firstName: "Rowan",
            lastName: "Nales",
            female: "Rowan",
            male: "Rowan",
            facebookAccountNumber: "FB61023",
            occupation: "unknown",
            employer: "unknown",
            criminalRecord: "Felony, Coccaine Possesion with Intent to Sell, 1997 <br >Suspected Kingpin of Fort Meade Drug Ring",
            identityRevealed: false,
            rel: {
                    
            }
            
        },
        syndicateEmployee: {
            firstName: "Quinn",
            lastName: "Zareth",
            female: "Quinn",
            male: "Quinn",
            facebookAccountNumber: "FB10302",
            occupation: "Security Consutlant",
            employer: "Syndicate Solutions",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
                nsaBoss: {
                    key: "syndicateEmployeeToNSABoss",
                    assignedVal: 0,
                    possibilities: [
                        "The Syndicate Solutions Employee discusses Operation Alexander with your NSA Boss"
                    ]
                },
                hacker: {
                    key: "syndicateEmployeeToHacker",
                    assignedVal: 0,
                    possibilities: [
                        "The hacker sends the Drug Lord's client list to the Syndicate Employee"
                    ]
                }
            }
        },
        nsaBoss: {
            firstName: "Harper",
            lastName: "Keithson",
            female: "Harper",
            male: "Harper",
            facebookAccountNumber: "FB35739",
            occupation: "Fort Meade Unit Manager",
            employer: "National Security Administration",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
            }
        },
        hacker: {
            firstName: "Trix",
            lastName: "Bit",
            female: "Trix",
            male: "Trix",
            facebookAccountNumber: "FB94127",
            occupation: "Computer Specialist and Hacker.",
            employer: "Freelance contractor at Syndicate Solutions",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
            }
            
        },
        bankVP: {
            firstName: "Morgan",
            lastName: "Hallsworth",
            female: "Morgan",
            male: "Morgan",
            facebookAccountNumber: "FB335570",
            occupation: "Vice President",
            employer: "PatriotBank",
            criminalRecord: "N/A",
            identityRevealed: false,
            rel: {
            }
        }
    };
}

var genderedWords = {
    you: {
        spouseType: "",
        pronoun: "",
        pronounCap: "",
        possesive: "",
        objective: "",
        genderPerson: "",
        genderPersonPlural: ""
    },
    spouse: {
        spouseType: "",
        pronoun: "",
        pronounCap: "",
        possesive: "",
        objective: "",
        genderPerson: "",
        genderPersonPlural: ""
    },
    female: { //reference
        spouseType: "wife",
        pronoun: "she",
        pronounCap: "She",
        possesive: "her",
        objective: "her",
        genderPerson: "woman",
        genderPersonPlural: "women"
    },
    male: { //reference
        spouseType: "husband",
        pronoun: "he",
        pronounCap: "He",
        possesive: "his",
        objective: "him",
        genderPerson: "man",
        genderPersonPlural: "men"
    },
    neutral: { //reference
        spouseType: "partner",
        pronoun: "they",
        pronounCap: "They",
        possesive: "their",
        objective: "them",
        genderPerson: "person",
        genderPersonPlural: "people"
    }
    
};

function initializeMessages() {
    "use strict";
    messages = {
        day1: {
            spouseToTrainer: [
            //trainer: [
                //Day 1; Relationship 0: Cheats With
                [
                    //Message 0 
                    {
                        sender: "spouse",
                        time: "14:06:22",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Wow! You really did it to me yesterday. I was sweating buckets by the time we were done."
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "14:07:31",
                        showBody: false,
                        messageBody: "Haha. I am impressed with how much you can handle."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "14:08:14",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Thanks " + characterInfo.trainer.firstName + "! I’m sure you have " + genderedWords.spouse.genderPersonPlural + " like me all the time though."
                    },
                    //Message 3
                    {
                        sender: "trainer",
                        time: "14:08:38",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I wouldn’t say that. You’re definitely one of my top clients."
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "14:09:52",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I can’t wait to see you tomorrow!"
                    },
                    //Message 5
                    {
                        sender: "trainer",
                        time: "14:10:37",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: ";-)"
                    }
                ],
                //Relationship 1: Has Unrequited feelings for
                [
                     //Message 0 
                    {
                        sender: "spouse",
                        time: "14:06:22",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Wow! You really did it to me yesterday. I was sweating buckets by the time we were done."
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "14:07:31",
                        showBody: false,
                        messageBody: "Haha. I am impressed with how much you can handle."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "14:08:14",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Thanks " + characterInfo.trainer.firstName + "! I’m sure you have " + genderedWords.spouse.genderPersonPlural + " like me all the time though."
                    },
                    //Message 3
                    {
                        sender: "trainer",
                        time: "14:08:38",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I wouldn’t say that. You’re definitely one of my top clients."
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "14:09:52",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I can’t wait to see you tomorrow!"
                    },
                    //Message 5
                    {
                        sender: "trainer",
                        time: "14:10:37",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: ":)"
                    }
                ],
                //Relationship 2: Is Object of unrequieted feelings
                [
                    //Message 0 
                    {
                        sender: "spouse",
                        time: "14:06:22",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Wow! You really did it to me yesterday. I was sweating buckets by the time we were done."
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "14:07:31",
                        showBody: false,
                        messageBody: "Haha. I am impressed with how much you can handle."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "14:08:14",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Thanks " + characterInfo.trainer.firstName + "! I’m sure you have " + genderedWords.spouse.genderPersonPlural + " like me all the time though."
                    },
                    //Message 3
                    {
                        sender: "trainer",
                        time: "14:08:38",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I wouldn’t say that. You’re definitely one of my top clients."
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "14:09:52",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I can’t wait to see you tomorrow!"
                    },
                    //Message 5
                    {
                        sender: "trainer",
                        time: "14:10:37",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "E>---<3 (barbell made of hearts)"
                    }
                ],
                //Day 1; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse",
                        time: "14:06:22",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Wow! You really did it to me yesterday. I was sweating buckets by the time we were done."
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "14:07:31",
                        showBody: false,
                        messageBody: "Haha. I am impressed with how much you can handle."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "14:08:14",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Thanks " + characterInfo.trainer.firstName + "! I’m sure you have " + genderedWords.spouse.genderPersonPlural + " like me all the time though."
                    },
                    //Message 3
                    {
                        sender: "trainer",
                        time: "14:08:38",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I wouldn’t say that. You’re definitely one of my top clients."
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "14:09:52",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I can’t wait to see you tomorrow!"
                    },
                    //Message 5
                    {
                        sender: "trainer",
                        time: "14:10:37",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: ":-p"
                    }
                ]
            ],
            spouseToDogWalker: [
            //dogWalker: [
                //Day 1; Relationship 0: Cheats With
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "12:32:12", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "Thanks again for taking the pups today! I didn’t realize I wouldn't be able to get back in time to pick them up. Let me know how much I owe you and I'll write you a check for the past two weeks. I am so lucky to have you! :-)" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "12:48:51",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "No worries! I was happy to do it, plus I was in the hood. $250 for the past 2 weeks. Now if only my other clients were so accessible… ;)"
                    } // Last Message in a sequence doesn't have a comma.                
                ],
                //Day 1; Relationship 1: Is Object of Unrequieted Feelings
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "12:32:12", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "Thanks again for taking the pups today! I didn’t realize I wouldn't be able to get back in time to pick them up. Let me know how much I owe you and I'll write you a check for the past two weeks. I am so lucky to have you! :-)" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "12:48:51",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "No worries! I was happy to do it, plus I was in the hood. $250 for the past 2 weeks. Now if only my other clients were so accessible… ;)"
                    } // Last Message in a sequence doesn't have a comma. 
                ],
                //Day 1; Relationship 2: Buys Weed From
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "12:32:12", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "Thanks again for taking the pups today! I didn’t realize I wouldn't be able to get back in time to pick them up. Let me know how much I owe you and I'll write you a check for the past two weeks. I am so lucky to have you! :-)" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "12:48:51",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "No worries! I was happy to do it, plus I was in the hood. $250 for the past 2 weeks. Now if only my other clients were so accessible… ;)"
                    } // Last Message in a sequence doesn't have a comma. 
                ],
                //Day 1; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "12:32:12", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "Thanks again for taking the pups today! I didn’t realize I wouldn't be able to get back in time to pick them up. Let me know how much I owe you and I'll write you a check for the past two weeks. I am so lucky to have you! :-)" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "12:48:51",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "No worries! I was happy to do it, plus I was in the hood. $250 for the past 2 weeks. Now if only my other clients were so accessible… ;)"
                    } // Last Message in a sequence doesn't have a comma.
                ]
            ],
            spouseToFriend: [
            //friend: [
                //Day 1; Relationship 0: Complains about Spouse
                [
                    //Message 0 
                    {
                        sender: "friend", // Sender Name Here
                        time: "11:02:29", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "Hey, " + characterInfo.spouse.firstName + ", are you busy?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:17:02",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Oh, hi Sam. What’s up?"
                    },
                    //Message 2
                    {
                        sender: "friend",
                        time: "11:17:02",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I don’t know - oh, there's my " + genderedWords.you.spouseType + ", just coming in, let me call you back."
                    } // Last Message in a sequence doesn't have a comma.   
                ],
                //Day 1; Relationship 1: Ralks about Erotic Novels to
                [
                    //Message 0 
                    {
                        sender: "friend", // Sender Name Here
                        time: "11:02:29", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        confrontationLevel: 0,
                        messageBody: "So, I finally got around to reading the book..." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:17:02",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "And..."
                    },
                    //Message 2
                    {
                        sender: "friend",
                        time: "11:17:02",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Wow. I needed to go for a run afterward."
                    },
                    //Message 3
                    {
                        sender: "spouse",
                        time: "11:18:08",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Haha exactly... That part with the melted chocolate and blindfold. ;-P"
                    },
                    //Message 4
                    {
                        sender: "friend",
                        time: "11:18:42",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "I can't wait to try that myself."
                    },
                    //Message 5
                    {
                        sender: "spouse",
                        time: "11:19:23",
                        showBody: false,
                        confrontationLevel: 0,
                        messageBody: "Tell me how it goes."
                    }// Last Message in a sequence doesn't have a comma.
                ]
            ],
            trainerToDogWalker: [
                //Day 1; Relationship 0: The trainer buys weed from the dog walker
                [
                ],
                //Day 1; Relationship 1: "The trainer gossips about your spouse with the dog walker"
                [
                    
                ]
            
            ],
            trainerToSpouseOfFriend: [
                //Day 1; Relationship 0: the Trainer has an affair with the friend's spouse
                [
                ]
            ],
            dogWalkerToFriend: [
                //Day 1; Relationship 0: The dog walker sells weed to the Friend
                [
                ],
                //Day 1; Relationship 1: The dog walker sleeps with the friend
                [
                ]
            ],
            dogWalkerToSpouseOfFriend: [
                //Day 1; Relationship 0: The friend's spouse owes the dog walker money
                [
                ]
            ],
            dogWalkerToDrugLord: [
                //Day 1; Relationship 0: The Dog Walker wants to join the Drug Lord's crew
                [
                ]
            ],
            trainerToSyndicateEmployee: [
                //Day 1; Relationship 0: Trainer mentions spouses to Syndicate Solutions Worker
                [
                ]
            ],
            syndicateEmployeeToNSABoss: [
                //Day 1; Relationship 0: The Syndicate Solutions Employee discusses Operation Alexander with your NSA Boss
                [
                ]
            ],
            syndicateEmployeeToHacker: [
                //Day 1; Relatiobship 0: The hacker sends the Drug Lord's client list to the Syndicate Employee
                [
                ]
            ],
            trainerToBankVP: [
                //Day 1; Relationship 0: Trainer asks BankVP for loan
                [
                ]
            ]
        },
        day2: {
            spouseToTrainer: [
            //trainer: [
                //Day 2; Relationship 0: Cheats With
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:22:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Heyy! I’m on my way to the gym now. Sorry to be running a little late. " // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:23:18",
                        showBody: false,
                        messageBody: "No worries. I’ll just use the time to take my weights off the rack."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:24:35",
                        showBody: false,
                        messageBody: "Oooh. I’m excited. I'm still stiff from yesterday. Let’s concentrate on the upper body today, understand?"
                    } // Last Message in a sequence doesn't have a comma.                
                ],
                //Day 2; Relationship 1: Is Object of unrequieted feelings
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:22:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Heyy! I’m on my way to the gym now. Sorry to be running a little late. " // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:23:18",
                        showBody: false,
                        messageBody: "No worries. I’ll just use the time to take my weights off the rack."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:24:35",
                        showBody: false,
                        messageBody: "You're such a hunk!"
                    } // Last Message in a sequence doesn't have a comma.          
                ],
                //Day 2; Relationship 2: Is Object of unrequieted feelings
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:22:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey! I’m on my way over to the gym now. Sorry to be running a litttle late. Really looking forward to to our session. My " + genderedWords.you.spouseType + "'s been a total jerk lately, and I have a lot of anger and pent up agression I need to get out." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:23:18",
                        showBody: false,
                        messageBody: "No worries. I’ll just use the time get set up. How about we go for smoothies and kale after your workout?"
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:24:35",
                        showBody: false,
                        messageBody: "Yes! Yes! Yes! Kale is my favorite food ever."
                    } // Last Message in a sequence doesn't have a comma.    
                ],
                //Day 2; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:22:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey! I’m on my way over to the gym now. Sorry to be running a litttle late. Really looking forward to to our session. My " + genderedWords.you.spouseType + "'s been a total jerk lately, and I have a lot of anger and pent up agression I need to get out." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:23:18",
                        showBody: false,
                        messageBody: "No worries. I’ll just use the time to take my weights off the rack. Say, you want to go out after our workout for organic smoothies and kale shots?"
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:24:35",
                        showBody: false,
                        messageBody: "You know me sooooo well!"
                    } // Last Message in a sequence doesn't have a comma.
                ]
            ],
            spouseToDogWalker: [
            //dogWalker: [
                //Day 2; Relationship 0: Cheats With
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "11:02:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Am I coming over there or are you coming here? I have something in Fort Meade at 2:00, so we can either meet before then or anytime after 4:30." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:05:13",
                        showBody: false,
                        messageBody: "Why don't you come here? I'm home alone all day, since the housekeeper is off."
                    },
                    //Message 2
                    {
                        sender: "dogWalker",
                        time: "11:05:42",
                        showBody: false,
                        messageBody: "What time works for you?"
                    },
                    //Message 3
                    {
                        sender: "spouse",
                        time: "11:06:37",
                        showBody: false,
                        messageBody: "How about noon?"
                    },
                    //Message 4
                    {
                        sender: "dogWalker",
                        time: "11:06:37",
                        showBody: false,
                        messageBody: "Perfect! See you then."
                    }// Last Message in a sequence doesn't have a comma.                    
                ],
                //Day 2; Relationship 1: Is Object of Unrequieted Feelings
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:31:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "What are you up to? I'll be in the neighborhood, and I'm wondering if you want to grab coffee after we walk." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "11:05:13",
                        showBody: false,
                        messageBody: "Hey, not sure if you got my message, but I'm around if you want to walk!"
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:06:42",
                        showBody: false,
                        messageBody: "Sorry!!! I was running errands. you can pick up the dogs tomorrow!?"
                    },
                    //Message 3
                    {
                        sender: "dogWalker",
                        time: "11:06:37",
                        showBody: false,
                        messageBody: "cool"
                    }// Last Message in a sequence doesn't have a comma.                
                ],
                //Day 2; Relationship 2: Buys Weed From
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "11:02:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey, I just had a visit from my guy, and I have some things for you to pick up. Are you around for a quick exchange?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:05:13",
                        showBody: false,
                        messageBody: "Yes! Thank goodness. I wasn't sure how much longer I would be able to go without the delivery… it’s been an INSANE week."
                    },
                    //Message 2
                    {
                        sender: "dogWalker",
                        time: "11:06:42",
                        showBody: false,
                        messageBody: "Haha! I have had those weeks! I will come by at 2:00. I have a bit, $40 worth or so."
                    }// Last Message in a sequence doesn't have a comma.                
                ],
                //Day 2; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:02:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I am ready for you! Come over when youre free!" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "11:05:13",
                        showBody: false,
                        messageBody: "On my way!"
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:05:42",
                        showBody: false,
                        messageBody: "The door is unlocked so just come on in."
                    },
                    //Message 3
                    {
                        sender: "dogWalker",
                        time: "11:06:37",
                        showBody: false,
                        messageBody: "Can’t wait to see my two favorite puppies…"
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "11:06:37",
                        showBody: false,
                        messageBody: "They are excited to see you too. I could tell as soon as I got up this morning!"
                    },
                    //Message 5
                    {
                        sender: "dogWalker",
                        time: "11:08:04",
                        showBody: false,
                        messageBody: "Awesome! If today gets too hot, I might have to give them a bath as well. ;)"
                    },
                    //Message 6
                    {
                        sender: "spouse",
                        time: "11:09:32",
                        showBody: false,
                        messageBody: "Wow! It’s been so long since they’ve really been washed by someone who knows what they're doing."
                    },
                    //Message 6
                    {
                        sender: "dogWalker",
                        time: "11:10:11",
                        showBody: false,
                        messageBody: "It will be my pleasure!"
                    }// Last Message in a sequence doesn't have a comma.             
                ]
            ],
            spouseToFriend: [
            //friend: [
                //Day 2; Relationship 0: Complains about Spouse
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "10:02:38", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hi Sam. I didn't hear back from you yesterday and have been so worried." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "friend",
                        time: "10:04:19",
                        showBody: false,
                        messageBody: "Oh, " + characterInfo.spouse.firstName + ", thanks for checking in.  We had a terrible fight, then a colossal make up and now I am just trying to figure out what I really want."
                    },
                    //Message 2
                    // Gender Words problem
                    {
                        sender: "spouse",
                        time: "10:06:45",
                        showBody: false,
                        messageBody: "I understand completely. I also need to do some personal reflection. I do love my " + genderedWords.you.spouseType + ". It's just that lately we've been so distant. How can I have a relationship with someone that never asks how I'm doing or bothers checking in with me during the day to see what I'm up to? I feel so neglected, much less cared for or understood than anyone my " + genderedWords.you.spouseType + " knows, follows or analyzes at work!"
                    },
                    //Message 3
                    {
                        sender: "friend",
                        time: "10:07:39",
                        showBody: false,
                        messageBody: "Well, " + characterInfo.spouse.firstName + ", I guess we both have some evaluating to do.  Why don’t we meet tomorrow and discuss this all further."
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "10:08:16",
                        showBody: false,
                        messageBody: "Sounds like a plan. See you then."
                    }// Last Message in a sequence doesn't have a comma.                 
                ],
                //Day 2; Relationship 1: Ralks about Erotic Novels to
                [
                    //Message 0 
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:02:38", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Don't you want to try as well?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "10:04:19",
                        showBody: false,
                        messageBody: "I wish, but not with my " + genderedWords.you.spouseType + "."
                    },
                    //Message 2
                    {
                        sender: "friend",
                        time: "10:06:45",
                        showBody: false,
                        messageBody: "Are things still weird?"
                    },
                    //Message 3
                    {
                        sender: "spouse",
                        time: "10:07:39",
                        showBody: false,
                        messageBody: "I just need someone to pay attention to me. I don't know. I guess that's why I read these books..."
                    }// Last Message in a sequence doesn't have a comma.         
                ]
            ],
            trainerToDogWalker: [
                //Day 2; Relationship 0: The trainer buys weed from the dog walker
                [
                    //Message 0
                    {
                        sender: "trainer",
                        time: "16:05:51",
                        showBody: false,
                        messageBody: " Hey.  When are you coming by?  I want to make a purchase."
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "16:06:02",
                        showBody: false,
                        messageBody: "I can stop by after I return the dogs to their parents."
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "16:07:13",
                        showBody: false,
                        messageBody: "Ok, don’t forget."
                    },
                    //Message 3
                    {
                        sender: "dogWalker",
                        time: "16:09:12",
                        showBody: false,
                        messageBody: "I never forget my business."
                    }
                ],
                //Day 2; Relationship 1: "The trainer gossips about your spouse with the dog walker"
                [
                    
                ]
            
            ],
            trainerToSpouseOfFriend: [
                //Day 2; Relationship 0: the Trainer has an affair with the friend's spouse
                [
                    //Message 0 
                    {
                        sender: "trainer", // Sender Name Here
                        time: "15:03:02", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "When can we meet?  I’ve been thinking about you all morning, remembering last night and want a rematch!" // Insert the text between the quotes
                    },
                    //Message 1 
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "15:03:48", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "You have no idea how much I want to see you too, but I don’t want " + characterInfo.friend.firstName + " to be suspicious." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "trainer", // Sender Name Here
                        time: "15:04:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "When are you going to leave that blowheart once and for all?" // Insert the text between the quotes
                    },
                    //Message 3 
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "15:05:32", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I cannot discuss this with you now.  Let’s connect tomorrow." // Insert the text between the quotes
                    }
                ]
            ],
            dogWalkerToFriend: [
                //Day 2; Relationship 0: The dog walker sells weed to the Friend
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:11:42", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Would you like anything I can offer you today?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "friend", // Sender Name Here
                        time: "12:13:03", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I would, as a matter of fact.  I need to do something special for myself - my husband is never home anymore." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:14:17", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Anything I can do to help?  I wouldn’t want you to have to be alone." // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "friend", // Sender Name Here
                        time: "12:14:58", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Really?  I’m fine, but thanks anyway." // Insert the text between the quotes
                    }
                ],
                //Day 2; Relationship 1: The dog walker sleeps with the friend
                [
                    //Message 0
                    {
                        sender: "friend", // Sender Name Here
                        time: "20:08:28", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Can you come by for my dog on Wednesday?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "20:09:14", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Is that all you want me to come by for?" // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "friend", // Sender Name Here
                        time: "20:09:54", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "What else do you have in mind?" // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "20:10:24", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Well, I was thinking about last week and wouldn’t mind some more of that." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "friend", // Sender Name Here
                        time: "20:11:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Come Wednesday and we’ll see if you get lucky again." // Insert the text between the quotes
                    }
                ]
            ],
            dogWalkerToSpouseOfFriend: [
                //Day 2; Relationship 0: The friend's spouse owes the dog walker money
                [
                    //Message 0
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "07:02:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey, Guy, you need to start catching yourself up with me.  I am not a bank and this is not a loan situation." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "07:24:04", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Just hold tight - I am working on something and will have the money to you very soon." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "07:27:45", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Right.  As if I believe that.  I am telling you clearly.  You have until Monday to pay me!" // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "07:29:21", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Or What?" // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "07:31:11", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Don’t think you won’t be held accountable..." // Insert the text between the quotes
                    }
                ]
            ],
            dogWalkerToDrugLord: [
                //Day 2; Relationship 0: The Dog Walker wants to join the Drug Lord's crew
                [
                    //Message 0
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:03:32", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey. I’m making consistent money for you and want my due." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "drugLord", // Sender Name Here
                        time: "18:05:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "What are you talking about? You are a street corner bum, bringing me chump change." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "drugLord", // Sender Name Here
                        time: "18:06:16", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "What are you talking about? You are a street corner bum, bringing me chump change." // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:06:56", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "BS.  Between the Mary Jane and the betting business, I have to be one of your top earners." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "drugLord", // Sender Name Here
                        time: "18:08:15", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "In your dreams." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:10:15", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I’m ready to move up - this is my time. I will be by tomorrow with my envelope to discuss this further." // Insert the text between the quotes
                    }
                ]
            ],
            trainerToSyndicateEmployee: [
               //Day 2; Relationship 0: Trainer mentions spouses to Syndicate Solutions Worker
                [
                    //Message 0
                    {
                        sender: "syndicateEmployee", // Sender Name Here
                        time: "08:14:12", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey, thanks for the work out.  I feel great today." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer", // Sender Name Here
                        time: "08:15:08", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "My pleasure - we will continue to build and strengthen...In the meanwhile, can you tell me a little more about your job?  I have a client, " + characterInfo.spouse.firstName + " "  + characterInfo.spouse.lastName + ", whose " + genderedWords.you.spouseType + " works in the government too.  I happened to mention you to her, that you used to work for the NSA and are now with a private firm, and my client was very curious, so I promised to ask you about your new gig." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "syndicateEmployee", // Sender Name Here
                        time: "08:16:57", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Well, I have probably dropped too much information about my job as is.  Suffice to say that I work for a private Security Company and we market high-end security consulting services to the private sector." // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "trainer", // Sender Name Here
                        time: "08:18:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Wow.  Sounds interesting." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "syndicateEmployee", // Sender Name Here
                        time: "08:18:56", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Very.  You have no idea…" // Insert the text between the quotes
                    }
                ]
            ],
            syndicateEmployeeToNSABoss: [
                //Day 2; Relationship 0: The Syndicate Solutions Employee discusses Operation Alexander with your NSA Boss
                [
                    //Message 0
                    {
                        sender: "syndicateEmployee",
                        time: "10:33:26",
                        showBody: false,
                        messageBody: "Hey, thanks for the intel on our guy. This is going to be a big help to us with Operation Alexander."
                    },
                    //Message 1
                    {
                        sender: "nsaBoss",
                        time: "10:35:06",
                        showBody: false,
                        messageBody: "Well, please let your employer know where the information came from."
                    },
                    //Message 2
                    {
                        sender: "syndicateEmployee",
                        time: "10:35:51",
                        showBody: false,
                        messageBody: "That goes without saying. I hope you are finding the hotel suite to your liking…"
                    },
                    //Message 3
                    {
                        sender: "nsaBoss",
                        time: "10:36:08",
                        showBody: false,
                        messageBody: "Yes, Great. Fine."
                    },
                    //Message 4
                    {
                        sender: "syndicateEmployee",
                        time: "10:36:43",
                        showBody: false,
                        messageBody: "Enjoy your weekend and let me know if you need anything more from us."
                    }
                ]
            ],
            syndicateEmployeeToHacker: [
                //Day 2; Relatiobship 0: The hacker sends the Drug Lord's client list to the Syndicate Employee
                [
                    //Message 0
                    {
                        sender: "syndicateEmployee",
                        time: "13:18:03",
                        showBody: false,
                        messageBody: "Hey, any progress with our Operation Alexander probe?"
                    },
                    //Message 1
                    {
                        sender: "hacker",
                        time: "13:19:45",
                        showBody: false,
                        messageBody: "Yes! I was just going to call you. I am into the " + characterInfo.drugLord.firstName + " " + characterInfo.drugLord.lastName + "’s drug crime database and am extracting his contact list right now. Interesting stuff here. The most promising target looks like the VP for PartriotBank, but the Lord also has several key clients in the general Fort Meade area."
                    },
                    //Message 2
                    {
                        sender: "syndicateEmployee",
                        time: "13:20:23",
                        showBody: false,
                        messageBody: "Anyone else in particular I should know about?"
                    },
                    //Message 3
                    {
                        sender: "hacker",
                        time: "13:21:32",
                        showBody: false,
                        messageBody: "I would say so, how about the NSA Russia Chief, for example?"
                    },
                    //Message 4
                    {
                        sender: "syndicateEmployee",
                        time: "13:22:13",
                        showBody: false,
                        messageBody: "Great Job! This is excellent. Let’s go forward asap with Phase 2."
                    }
                ]
            ],
            trainerToBankVP: [
                //Day 2; Relationship 0: Trainer asks BankVP for loan
                [
                    //Message 0 
                    {
                        sender: "trainer",
                        time: "17:04:16",
                        showBody: false,
                        messageBody: "Hi " + characterInfo.bankVP.firstName + ".  Long time. How are you doing?"
                    },
                    //Message 1
                    {
                        sender: "bankVp",
                        time: "17:07:37",
                        showBody: false,
                        messageBody: "Doing great, actually. I am now a VP with PatriotBank, the largest private bank in Maryland.  Climbing the ladder.  How about you?"
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "17:07:56",
                        showBody: false,
                        messageBody: "Congrats! I had heard, which is actually why I am reaching out. I really need a loan, but was turned down at the local branch and am hoping you can help."
                    },
                    //Message 3
                    {
                        sender: "bankVp",
                        time: "17:10:58",
                        showBody: false,
                        messageBody: "Absolutely.  I will pull the file and put in a good word for you today.  Let’s stay in touch."
                    }
                    
                ]
            ]
        },
        day3: {
            spouseToTrainer: [
            //trainer: [
                //Day 3; Relationship 0: Cheats With
                [
                    //Message 0 
                    {
                        sender: "trainer", // Sender Name Here
                        time: "11:18:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I can’t stop thinking about you. You make me a little crazy." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:19:36",
                        showBody: false,
                        messageBody: "You’ve become my new obsession. What do you say we skip the workout today and find something more creative to do with our time?"
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "11:21:57",
                        showBody: false,
                        messageBody: "Sounds like a plan. I’m sure we’ll still manage to get in your cardio load for the day. Your foolish " + genderedWords.you.spouseType + " is sure missing out."
                    } // Last Message in a sequence doesn't have a comma.             
                ],
                //Day 3; Relationship 1: Is Object of unrequieted feelings
                [
                    //Message 0 
                    {
                        sender: "trainer", // Sender Name Here
                        time: "11:18:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Sorry yesterday was awkward. I hope you understand that I think it's best that you find another personal trainer." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "11:19:36",
                        showBody: false,
                        messageBody: "I'm so embarrased. I feel like such an idiot."
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "11:21:57",
                        showBody: false,
                        messageBody: characterInfo.spouse.firstName + ", you are a strong, vibrant " + genderedWords.spouse.genderPerson + ", and you should never forget that. My training business is really important to me and I have to keep my relationships professional. I hope you figure things out with your " + genderedWords.you.spouseType + " and make the choice that's best for you."
                    },
                    //Message 3
                    {
                        sender: "spouse",
                        time: "11:23:29",
                        showBody: false,
                        messageBody: "Thanks for your advice. I need to do some personal reflection. I do love my " + genderedWords.you.spouseType + ". It's just that lately " + genderedWords.you.pronoun + "'s been so distant. " + genderedWords.you.pronounCap + " never asks how I'm doing or bothers checking in with me during the day to see what I'm up to. I feel completely unattached. Sometimes I think " + genderedWords.you.pronoun + " knows the people " + genderedWords.you.pronoun + " analyses at work better than " + genderedWords.you.pronoun + " knows me."
                    }// Last Message in a sequence doesn't have a comma.             
                ],
                //Day 3; Relationship 2: Is Object of unrequieted feelings
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:18:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I hate to do this, but after yesterday, I think it's best I cancel our future appointments." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:19:36",
                        showBody: false,
                        messageBody: "Probably for the best. I wish I had never said anything. It's just that you inspire these feelings in me. And the way you talked about your " + genderedWords.you.spouseType + "...I thought you felt something too."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:21:57",
                        showBody: false,
                        messageBody: "I'm sorry if I seem to have led you on. Although my " + genderedWords.you.spouseType + " can certainly be a pain at times, I am still in love and committed to our relationship. At least I feel that my personal space and time are respected, and I would never betray our trust or abandon our relationship. I wish you the best. I know there's a fantastic " + genderedWords.spouse.genderPerson + " out there for you. Take good care, as this is really good bye."
                    }// Last Message in a sequence doesn't have a comma.             
                ],
                //Day 3; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "11:18:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Thanks for the lunch yesterday. It really helped me work things out." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "11:19:36",
                        showBody: false,
                        messageBody: "Good luck talking to your " + genderedWords.you.spouseType + ". Just remember what we discussed."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "11:21:57",
                        showBody: false,
                        messageBody: "Will do. It's my life and I need to take control. If we're going to keep this relationship working, I need more independence and greater emphasis on my private life. Surely my " + genderedWords.you.spouseType + ", of all people can understand that!"
                    }// Last Message in a sequence doesn't have a comma.             
                ]
            ],
            spouseToDogWalker: [
            //dogWalker: [
                //Day 3; Relationship 0: Cheats with
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "10:43:10", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Yesterday was amazing. I can't stop thinking about it." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "10:46:31",
                        showBody: false,
                        messageBody: "I can't get you out of my head. I have no idea where you learned to do that…"
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "10:48:14",
                        showBody: false,
                        messageBody: "Let’s just say I don't have much opportunity to practice these days…"
                    },
                    //Message 3
                    {
                        sender: "dogWalker",
                        time: "10:48:48",
                        showBody: false,
                        messageBody: "Same time? Same place?"
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "10:49:30",
                        showBody: false,
                        messageBody: "Hmm... The housekeeper will be here tomorrow… Or I can just give her the day off and we can take a tour of the kitchen…"
                    }// Last Message in a sequence doesn't have a comma.                 
                ],
                //Day 3; Relationship 1: Is Object of Unrequieted Feelings
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:43:10", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Hey! I hope this doesn’t come off super weird, but I'm wondering if you want to grab a bite later. i think you are an amazing " + genderedWords.spouse.genderPerson + ", and I'd like to take you out and see what develops. Let me know what you think." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "10:46:31",
                        showBody: false,
                        messageBody: "I think you must have misread something. I am committed to my " + genderedWords.you.spouseType + " and not interesetd in a relationship with anyone else. You are a great guy, but, under the circumstances, I can't having you work for our family. I will mail you the $250 I owe you. Best of luck."
                    }// Last Message in a sequence doesn't have a comma.             
                ],
                //Day 3; Relationship 2: Buys Weed From
                [
                    //Message 0 
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:43:10", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "How did it go?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "10:46:31",
                        showBody: false,
                        messageBody: "By far the best I've ever had. I feel like I'm in college again!"
                    },
                    //Message 2
                    {
                        sender: "dogWalker",
                        time: "10:48:14",
                        showBody: false,
                        messageBody: "That strain is the BOMB."
                    },
                    //Message 3
                    {
                        sender: "spouse",
                        time: "10:48:48",
                        showBody: false,
                        messageBody: "brb going to pack another…!"
                    }// Last Message in a sequence doesn't have a comma.             
                ],
                //Day 3; Relationship 3: Nothing
                [
                    //Message 0 
                    {
                        sender: "spouse", // Sender Name Here
                        time: "10:43:10", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Thank you again for taking the dogs out yesterday! Not to mention washing them when you brought them back! I haven't had time to take them to the groomer, so it was a HUGE help. I was just so tired of pawprints on the carpet! Let me know what I owe you." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "10:46:31",
                        showBody: false,
                        messageBody: "Of course, no sweat. Just $250 for the past 2 weeks."
                    },
                    //Message 2
                    {
                        sender: "spouse",
                        time: "10:48:14",
                        showBody: false,
                        messageBody: "Absolutely. I will give you the check next time you come by."
                    },
                    //Message 3
                    {
                        sender: "dogWalker",
                        time: "10:48:48",
                        showBody: false,
                        messageBody: "Sounds good, no rush! :)"
                    },
                    //Message 4
                    {
                        sender: "spouse",
                        time: "10:49:30",
                        showBody: false,
                        messageBody: "Thanks!"
                    }// Last Message in a sequence doesn't have a comma.           
                ]
            ],
            spouseToFriend: [
            //friend: [
                //Day 3; Relationship 0: Complains about Spouse
                [
                    //The friend doesn't talk on day 3 on relationship 0. So Nothing else goes here!  
                ],
                //Day 3; Relationship 1: Ralks about Erotic Novels to
                [
                    //Message 0 
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:02:18", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Well, They really spiced things up for us. I can get you some, I think they would absolutely do the trick." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "spouse",
                        time: "10:07:57",
                        showBody: false,
                        messageBody: "Hmm ok, I'll think about it. I doubt " + genderedWords.you.spouseType + " will be willing, but I'll try."
                    } // Last Message in a sequence doesn't have a comma.               
                ]
            ],
            trainerToDogWalker: [
                //Day 3; Relationship 0: The trainer buys weed from the dog walker
                [
                    //Message 0
                    {
                        sender: "trainer",
                        time: "17:02:08",
                        showBody: false,
                        messageBody: "Thanks for coming by yesterday.  My little purchase made my evening…"
                    },
                    //Message 1
                    {
                        sender: "dogWalker",
                        time: "17:03:25",
                        showBody: false,
                        messageBody: "Let me know when I can make it for you again!"
                    }
                ],
                //Day 3; Relationship 1: "The trainer gossips about your spouse with the dog walker"
                [
                    
                ]
            
            ],
            trainerToSpouseOfFriend: [
                //Day 3; Relationship 0: the Trainer has an affair with the friend's spouse
                [
                    //Message 0
                    {
                        sender: "trainer",
                        time: "15:33:12",
                        showBody: false,
                        messageBody: "Where are you?  This is getting old - I’m tired of waiting around for you to have time for me."
                    },
                    //Message 1
                    {
                        sender: "spouseOfFriend",
                        time: "15:33:57",
                        showBody: false,
                        messageBody: "Let me make it up to you tonight.  Dinner at The Chalet, then that rematch you asked for yesterday."
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "15:35:07",
                        showBody: false,
                        messageBody: "OK, but you better not disappoint me or no show again, or this is it!"
                    },
                    //Message 3
                    {
                        sender: "spouseOfFriend",
                        time: "15:35:31",
                        showBody: false,
                        messageBody: "I promise, I will be there. Wear something sexy.  I will see you at 7:00."
                    },
                    //Message 4
                    {
                        sender: "trainer",
                        time: "15:36:22",
                        showBody: false,
                        messageBody: "I can’t wait."
                    }
                ]
            ],
            dogWalkerToFriend: [
                //Day 3; Relationship 0: The dog walker sells weed to the Friend
                [
                    //Message 0 
                    {
                        sender: "friend", // Sender Name Here
                        time: "18:19:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "You know, I thought about what you said and I might like to take you up on your offer…" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:20:38", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Tonight?  I can stop by for a visit and we can see what comes up.  :)" // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "friend", // Sender Name Here
                        time: "18:21:57", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Sounds good to me.  Can you bring your stuff with you as well?" // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:23:15", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I never leave home without it." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "friend", // Sender Name Here
                        time: "18:24:46", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "My husband is going to be out again tonight, so…." // Insert the text between the quotes
                    },
                    //Message 5
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "18:25:36", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "See you then." // Insert the text between the quotes
                    }
                ],
                //Day 3; Relationship 1: The dog walker sleeps with the friend
                [
                    //Message 0
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:14:24", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "When would you like me to walk your dog again?" // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:15:48", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I need to be careful. I don’t want my husband to suspect anything." // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:17:48", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Why do you care? You are moving in separate directions these days and he is certainly not worried about you." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:18:03", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "What do you know that you are not telling me?" // Insert the text between the quotes
                    },
                    //Message 5
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:18:27", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Nothing you don’t already suspect or know yourself." // Insert the text between the quotes
                    },
                    //Message 5
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:19:24", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Well, I would appreciate details." // Insert the text between the quotes
                    },
                    //Message 6
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:19:49", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Why don’t we discuss it when I come over?" // Insert the text between the quotes
                    },
                    //Message 7
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:21:06", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Alright. What time will you be here?" // Insert the text between the quotes
                    },
                    //Message 8
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "10:21:25", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "About 5:00pm. See you then." // Insert the text between the quotes
                    },
                    //Message 9
                    {
                        sender: "friend", // Sender Name Here
                        time: "10:22:28", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "xo" // Insert the text between the quotes
                    }
                ]
            ],
            dogWalkerToSpouseOfFriend: [
                //Day 3; Relationship 0: The friend's spouse owes the dog walker money
                [
                    //Message 0
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "12:14:08", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I need to place a bet." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:15:18", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "You have to be kidding. With what money? No more credit, Guy." // Insert the text between the quotes
                    },
                    //Message 2
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "12:16:28", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "I have a can’t lose tip, which, when it pays off, will clear my debt to you and more." // Insert the text between the quotes
                    },
                    //Message 3
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:17:28", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Right!  Like the last time?" // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "12:18:38", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "This is different." // Insert the text between the quotes
                    },
                    //Message 4
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:19:23", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Oh Sure.  No more bets on credit and time is running out on what you owe." // Insert the text between the quotes
                    },
                    //Message 5
                    {
                        sender: "spouseOfFriend", // Sender Name Here
                        time: "12:20:43", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Thanks for nothing. You’re causing me to miss out on a big payoff." // Insert the text between the quotes
                    },
                    //Message 6
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "12:21:02", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Yeah, Right!" // Insert the text between the quotes
                    }
                ]
            ],
            dogWalkerToDrugLord: [
                //Day 3; Relationship 0: The Dog Walker wants to join the Drug Lord's crew
                [
                    //Message 0
                    {
                        sender: "dogWalker", // Sender Name Here
                        time: "16:01:03", // Make up a timestamp. Time should increase as you move down
                        showBody: false, // This line always looks like this
                        messageBody: "Take a look at this and tell me again how unimportant I am to your operation." // Insert the text between the quotes
                    },
                    //Message 1
                    {
                        sender: "drugLord",
                        time: "16:19:53",
                        showBody: false,
                        messageBody: "This is adequate, nothing more, and I’m not adding personnel to the payroll."
                    },
                    //Message 2
                    {
                        sender: "dogWalker",
                        time: "16:21:45",
                        showBody: false,
                        messageBody: "Why the hell not?  I’ve worked like a dog to prove myself to you and this should be my moment to move up the organization."
                    },
                    //Message 3
                    {
                        sender: "drugLord",
                        time: "16:23:28",
                        showBody: false,
                        messageBody: "Careful Shithead.  You do not call the shots here.  More importantly, there is just too much scrutiny from the outside right now and I’m not making any changes or moves in the moment.  Now, GET OUT, and go make us some money!"
                    }
                ]
            ],
            trainerToSyndicateEmployee: [
               //Day 3; Relationship 0: Trainer mentions spouses to Syndicate Solutions Worker
                [
                    //Message 0
                    {
                        sender: "syndicateEmployee",
                        time: "09:37:58",
                        showBody: false,
                        messageBody: "Hey, I think I may have been out of line  yesterday.  My job is very hush hush, the founder of our company used to be a top guy with the NSA and would not be pleased to know that I am talking about our operations."
                    },
                    //Message 1
                    {
                        sender: "trainer",
                        time: "10:14:18",
                        showBody: false,
                        messageBody: "No worries. You can count on my discretion. Trainer/Client Privilege and all that."
                    },
                    //Message 2
                    {
                        sender: "syndicateEmployee",
                        time: "10:15:46",
                        showBody: false,
                        messageBody: "Thanks, Man.  I would not want to have to kill you or your client Felicity."
                    },
                    //Message 3
                    {
                        sender: "trainer",
                        time: "10:16:11",
                        showBody: false,
                        messageBody: "That was a joke, right?"
                    },
                    //Message 4
                    {
                        sender: "syndicateEmployee",
                        time: "10:16:54",
                        showBody: false,
                        messageBody: "That is all I am saying."
                    }
                ]
            ],
            syndicateEmployeeToNSABoss: [
                //Day 3;  Relationship 0: The Syndicate Solutions Employee discusses Operation Alexander with your NSA Boss
                [
                    //Message 0
                    {
                        sender: "nsaBoss",
                        time: "11:09:57",
                        showBody: false,
                        messageBody: 'Thanks for the hotel and the "amenities." I had a great weekend and will be in touch when I think I can help again.'
                    },
                    //Message 1
                    {
                        sender: "syndicateEmployee",
                        time: "11:10:42",
                        showBody: false,
                        messageBody: "So glad it worked out.  Listen, I heard from a contact that someone in your Fort Meade office might also be interested in Syndicate Solutions. Do you have anyone married to a " + characterInfo.spouse.firstName + " " + characterInfo.spouse.lastName + " working for you?"
                    },
                    //Message 2
                    {
                        sender: "nsaBoss",
                        time: "11:11:38",
                        showBody: false,
                        messageBody: "Are you kidding me? NO way. That agent is not a good match for this business, easily one of my least committed analysts. You wouldn't believe the infractions I've discovered during some recent auditing. I’ve been planning to give " + genderedWords.you.objective + " the boot when I return to work next week, so set your sights higher."
                    },
                    //Message 3
                    {
                        sender: "syndicateEmployee",
                        time: "11:12:04",
                        showBody: false,
                        messageBody: "Got it.  Thanks for the heads up."
                    }
                ]
            ],
            syndicateEmployeeToHacker: [
                //Day 3; Relatiobship 0: The hacker sends the Drug Lord's client list to the Syndicate Employee
                [
                    //Message 0
                    {
                        sender: "syndicateEmployee",
                        time: "13:39:19",
                        showBody: false,
                        messageBody: "Just checking back in to see about further progress."
                    },
                    //Message 1
                    {
                        sender: "hacker",
                        time: "13:40:05",
                        showBody: false,
                        messageBody: "Finishing with the account list now. Yesterday’s info was the best, but there is also a city council woman and a prominent plastic surgeon on the list, if this is of any interest. I've executed some leverage on our friend at the bank. You should be please with the results."
                    },
                    //Message 3
                    {
                        sender: "syndicateEmployee",
                        time: "13:41:27",
                        showBody: false,
                        messageBody: "Excellent work. Syndicate Solutions thanks you for your service. Operation Alexander Phase 2 is a success."
                    }
                ]
            ],
            trainerToBankVP: [
                //Day 3; Relationship 0: Trainer asks BankVP for loan
                [
                    //Message 0 
                    {
                        sender: "trainer",
                        time: "17:04:16",
                        showBody: false,
                        messageBody: "Hi. Just following up to see how everything is going with my loan."
                    },
                    //Message 1
                    {
                        sender: "bankVp",
                        time: "17:08:37",
                        showBody: false,
                        messageBody: "Hey. I was going to contact you - I am really sorry, but we are dealing with a security crisis here and need to bring in some new consultants. With all the added expense and the new internal scrutiny, I am just not going to be able to override the branch decision and help you right now. I would if it were even remotely possible, but cannot put myself under the spotlight just now."
                    },
                    //Message 2
                    {
                        sender: "trainer",
                        time: "17:09:03 ",
                        showBody: false,
                        messageBody: "Well, thanks for nothing. I am disappointed.. I was really counting on you and our history together, expecting your help and support. This is not the last of this."
                    }
                ]
            ]
        }
    };
}

function initializeConfrontations() {
    'use strict';
    confrontations = {
        trainer: {
            confrontationLevel: -1,
            levels: [
                //confrontationLevel 0
                {
                    confronted: false,
                    possibleRelationships: [
                        //Relationship 0: Cheats With
                        {
                            prompt: "Yes, I want to know what’s going on between my spouse and that personal trainer.",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                },
                                {
                                    options: false,
                                    character: "spouse",
                                    content: "Yes, Arnold’s great. He’s been a real pleasure to work with."
                                },
                                {
                                    options: true,
                                    character: "you",
                                    content: [
                                        "Is that why the two of you traded six Facebook Messages today?",
                                        "I’m not comfortable with the way you act around him.",
                                        "Well, I’m just glad that you two are happy."
                                    ]
                                }
                            ]
                        }

                    ]
                },
                //confrontationLevel 1
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                },
                //confrontationLevel 2
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                }
            ]
        },
        dogWalker: {
            confrontationLevel: -1,
            levels: [
                //confrontationLevel 0
                {
                    confronted: false,
                    possibleRelationships: [
                        //Relationship 0: Cheats With
                        {
                            prompt: "Yes, I want to know more about my spouse's relationship with the dog walker",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                },
                                {
                                    options: false,
                                    character: "spouse",
                                    content: "Yes, Arnold’s great. He’s been a real pleasure to work with."
                                },
                                {
                                    options: true,
                                    character: "you",
                                    content: [
                                        "Is that why the two of you traded six Facebook Messages today?",
                                        "I’m not comfortable with the way you act around him.",
                                        "Well, I’m just glad that you two are happy."
                                    ]
                                }
                            ]


                        },
                        //Relationship 1: has unrequited feelings for
                        {
                            prompt: "Yes, I want to know more about my spouse's relationship with the dog walker",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                }
                            ]
                        },
                        //Relationship 2: is the object of unrequited feelings of
                        {
                            prompt: "Yes, I want to know more about my spouse's relationship with the dog walker",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                }
                            ]
                        },
                        //Relationship 3: nothing
                        {
                            prompt: "Yes, I want to know more about my spouse's relationship with the dog walker",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                }
                            ]
                        }

                    ]
                },
                //confrontationLevel 1
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                },
                //confrontationLevel 2
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                }
            ]
        },
        friend: {
            confrontationLevel: -1,
            levels: [
                //confrontationLevel 0
                {
                    confronted: false,
                    possibleRelationships: [
                        //Relationship 0: Cheats With
                        {
                            prompt: "Yes, I want to know more about the messages from my spouse's friend",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                }
                            ]
                        },
                        //Relationship 1: has unrequited feelings for
                        {
                            prompt: "Yes, I want to discuss the erotic novels my spouse has been reading.",
                            response: [
                                {
                                    options: false,
                                    character: "you",
                                    content: "You seem awfully close to your personal trainer lately."
                                }
                            ]
                        }
                    ]
                },
                //confrontationLevel 1
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                },
                //confrontationLevel 2
                {
                    confronted: false,
                    possibleRelationships: [

                    ]
                }
            ]
        }
    };
}