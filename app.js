now = new Date().toLocaleString()
console.log(now)
/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            displayPerson(person[0]);
            break;
        case "family":
            let personFamily = findPersonFamily(person[0], people);
            document.getElementById("displayResults").innerHTML = personFamily;
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    if(people.length > 0){
        let resultsText = people
                .map(function (person, index) {
                    return `${index + 1}. ${person.firstName} ${person.lastName}`;
                })
                .join("<br>")
        document.getElementById("displayResults").innerHTML = resultsText;
    }
    else {
        document.getElementById("displayResults").innerHTML = "None";
    }
    
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}` + "<br>";
    personInfo += `Last Name: ${person.lastName}` + "<br>";
    personInfo += `Gender: ${person.gender}` + "<br>";
    personInfo += `DOB: ${person.dob}` + "<br>";
    personInfo += `Height:${person.height}` + "<br>";
    personInfo += `Weight: ${person.weight}` + "<br>";
    personInfo += `Eye Color: ${person.eyeColor}` + "<br>";
    personInfo += `Occupation: ${person.occupation}` + "<br>";
    personInfo += `Parents: ${returnDataOrDisplayDefault(person.parents[0])}, ${returnDataOrDisplayDefault(person.parents[1])}` + "<br>"; //id
    personInfo += `Current Spouse: ${returnDataOrDisplayDefault(person.currentSpouse)}` + "<br>"; //id
    document.getElementById("displayResults").innerHTML = personInfo;
}
// End of displayPerson()

function returnDataOrDisplayDefault(input) {
    if(input){
        return input;
    }
    else {
        return "None";
    }
}

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function checks to see if the value passed into input is a "one" or "many."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function oneMany(input) {
    return input.toLowerCase() === "one" || input.toLowerCase() === "many";
}
// End of oneMany()

/**
 * This helper function checks to see if the value passed into input is a number between 1 and 6.
 * @param {String} input        A string.
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function isNumericUnderSix(input) {
    return /^[1-5]$/.test(input);
}
// End of isNumericUnderSix()

/**
 * This helper function checks to see if the value passed into input is a number.
 * @param {String} input        A string.
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function isNumeric(input) {
    return /^\d+$/.test(input);
}
// End of isNumeric()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * This function finds the immediate family of a single person
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of family names and relationships
 */
function findPersonFamily(person, people){
    let immediateFamily = "";
    if(person.parents.length > 0){
        immediateFamily += findParents(person, people)  + "<br>";
    }
    else {
        immediateFamily += "Parent: None"  + "<br>";
    }
    
    if(person.parents.length > 0){
            immediateFamily += findSiblings(person, people)  + "<br>";
    }
    else {
        immediateFamily += "Sibling: None"  + "<br>";
    }

    if(person.currentSpouse){
        immediateFamily += findSpouse(person, people)  + "<br>";
    }
    else {
        immediateFamily += "Spouse: None";
    }
    
    return immediateFamily
}
// End of findPersonFamily()

/**
 * This function finds the spouse of a single person
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of the spouse name
 */
function findSpouse(person, people){
    let theirSpouse = people.filter(function(el){
        if(el.id === person.currentSpouse) {return true}
    })
    let spouseText = theirSpouse.map(function (spouse) {
            return `Spouse: ${spouse.firstName} ${spouse.lastName}`;
    })
    .join("<br>")
    return spouseText;
}
// End of findSpouse()

/**
 * This function finds the siblings of a single person
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of sibling names
 */
function findSiblings(person, people) {
    let siblingText = "";
    for(let i = 0; i < person.parents.length; i++){
        let siblings = people.filter(function(el){
            if(el.parents.includes(person.parents[i]) && el.id !== person.id) {return true}
        })
        siblingText += siblings.map(function (sibling) {
            return `Sibling: ${sibling.firstName} ${sibling.lastName}`;
        })
        .join("<br>")
    }
    if (siblingText === ""){
        siblingText = "Sibling: None";
    }
    return siblingText;
}
// End of findSiblings()

/**
 * This function finds the parents of a single person
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            A string of parent names
 */
function findParents(person, people) {
    let theirParents = people.filter(function (el) {
        if (person.parents.includes(el.id)) { return true; }
    });
    let theirParentsText = theirParents.map(function (parent) {
            return `Parent: ${parent.firstName} ${parent.lastName}`;
    })
    .join("<br>");
    if (theirParentsText === "") {
        theirParentsText = "Parent: None";
    }
    return theirParentsText;
}
// End of findParents()

/**
 * This function finds all descendants of a single person
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             A collection of person objects.
 */
function findPersonDescendants(person, people){
    let children = people.filter(function(el){
        if(el.parents.includes(person.id)){return true}
    })

    if (children.length > 0){
        for(let child of children){
            children = children.concat(findPersonDescendants(child, people));
        }
        return children;
    }
    else {
        return [];
    }
}
// End of findPersonDescendants
    
/**
 * This function finds person objects based on their attributes
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             A collection of person objects.
 */
function searchByTraits(people){
    let choice = promptFor("Search by one trait or many traits", oneMany);
    let searchResults;
    switch (choice.toLowerCase()){
        case 'one':
            searchResults = searchTheAtrributes(people);
            if(searchResults.length > 1){
                let promptText = searchResults.map(function (person, index) {
                    return `${index + 1}. ${person.firstName} ${person.lastName}`;
                })
                .join("\n")

                let selectedPerson = promptFor(`Please enter the number of a person below to view: \n ${promptText}`, isNumeric);
                let selectedPersonNumber = parseInt(selectedPerson);
                searchResults = [searchResults[selectedPersonNumber - 1]];

            }
            break;

        case "many":
            let option = promptFor("How many traits do you want to look up? (number 1 - 5)", isNumericUnderSix)
            searchResults = people;
            for(let i = 0; i < option; i ++){
                searchResults = searchTheAtrributes(searchResults);
            }
            if(searchResults.length > 1){
                let promptText = searchResults.map(function (person, index) {
                    return `${index + 1}. ${person.firstName} ${person.lastName}`;
                })
                .join("\n")

                let selectedPerson = promptFor(`Please enter the number of a person below to view: \n ${promptText}`, isNumeric);
                let selectedPersonNumber = parseInt(selectedPerson);
                searchResults = [searchResults[selectedPersonNumber - 1]];

            }
            break;
    }

    return searchResults;
}
// End of searchByTraits()

/**
 * This function searches for person objects matching a single attribute
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             A collection of person objects.
 */
function searchTheAtrributes(people){
    let promptText = "Choose an attribute below:\nFirst Name\nLast Name\nGender\nDate of Birth\nHeight\nWeight\nEye Color\nOccupation\nParent\nCurrent Spouse";
    let choice = promptFor(promptText, chars)
    let matchingPeople;
    switch(choice){
        case "First Name":
            let firstName = promptFor("Name to search for", chars)
            matchingPeople = people.filter(function(el){
                if(el.firstName.toLowerCase() === firstName.toLowerCase()){
                    return true
                }
            })
            break;
        case "Last Name":
            let lastName = promptFor("Last name to search for", chars)
            matchingPeople = people.filter(function(el){
                if(el.lastName.toLowerCase() === lastName.toLowerCase()){
                    return true
                }
            })
            break;
        case "Gender":
            let gender = promptFor("Gender to search for", chars)
            matchingPeople = people.filter(function(el){
                if(el.gender.toLowerCase() === gender.toLowerCase()){
                    return true
                }
            })
            break;
        case "Date of Birth":
            let dob = promptFor("Search a date of birth", chars)
            matchingPeople = people.filter(function(el){
                if(el.dob === dob){
                    return true
                }
            })
            break;
        case "Height":
            let height = promptFor("Search for a height (in inches)", isNumeric)
            matchingPeople = people.filter(function(el){
                if(el.height === height){
                    return true
                }
            })
            break;
        case "Weight":
            let weight = promptFor("Search for a weight", isNumeric)
            matchingPeople = people.filter(function(el){
                if(el.weight === weight){
                    return true
                }
            })
            break;
        case "Eye Color":
            let eyeColor = promptFor("Search for an eye color", chars)
            matchingPeople = people.filter(function(el){
                if(el.eyeColor.toLowerCase() === eyeColor.toLowerCase()){
                    return true
                }
            })
            break;
        case "Occupation":
            let occupation = promptFor("Search for the occupation", chars)
            matchingPeople = people.filter(function(el){
                if(el.occupation.toLowerCase() === occupation.toLowerCase()){
                    return true
                }
            })
            break;
        case "Parent":
            let parent = promptFor("Search by their parent", chars)
            matchingPeople = people.filter(function(el){
                if(el.parent === parent){
                    return true
                }
            })
            break;
        case "Current Spouse":
            let spouse = promptFor("Search by their spouse", chars)
            matchingPeople = people.filter(function(el){
                if(el.currentSpouse === spouse){
                    return true
                }
            })
            break;
        default:
            return searchTheAtrributes(people);
        
    }

    return matchingPeople;
}
// End of searchTheAttributes()