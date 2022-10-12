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
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
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
        if (person.firstName === firstName && person.lastName === lastName) {
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
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height:${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents[0]}, ${person.parents[1]}\n`; //id
    personInfo += `Current Spouse: ${person.currentSpouse}\n`; //id
    alert(personInfo);
}
// End of displayPerson()



function findPersonFamily(person, people){
    let immediateFamily = "";
    if(person.parents.length > 0){
        let theirParents = people.filter(function(el){
            if(person.parents.includes(el.id)) {return true}
        })
        immediateFamily += theirParents.map(function (parent) {
            return `Parent: ${parent.firstName} ${parent.lastName}  \n`;
        })
        .join("\n")
    }
    
    if(person.parents.length > 0){
        for(let i = 0; i < person.parents.length; i++){
            let siblings = people.filter(function(el){
                if(el.parents.includes(person.parents[i]) && el.id !== person.id) {return true}
            })
            immediateFamily += siblings.map(function (sibling) {
                return `Sibling: ${sibling.firstName} ${sibling.lastName}  \n`;
            })
            .join("\n")
        }}
    if(person.currentSpouse){
        let theirSpouse = people.filter(function(el){
            if(el.id === person.currentSpouse) {return true}
        })
            immediateFamily += theirSpouse.map(function (spouse) {
                return `Spouse: ${spouse.firstName} ${spouse.lastName}  \n`;
            })
            .join("\n")
        }
    
    return immediateFamily
}

//{(people.parents.includes(pesron.id)

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
    

function searchByTraits(people){
    let choice = promptFor("Search by one trait or many traits", chars)
    switch (choice){
        case 'Search single trait':
            searchTheAtrributes(people)

        case "Search multiple traits":
            let option = promptFor("How many traits do you want to look up? (number)", chars)
                for(i = 0; i < option; i ++){
                    searchTheAtrributes(people)
                }

    }

}

function searchTheAtrributes(people){
    let choice = promptFor("Which attribute?", chars)
    switch(choice){
        case "First Name":
            let firstName = promptFor("Name to search for", chars)
            people.filter(function(el){
                if(el.firstName === firstName){
                    return true
                }
            })
        case "Last Name":
            let lastName = promptFor("Last name to search for", chars)
            people.filter(function(el){
                if(el.lastName === lastName){
                    return true
                }
            })
        case "Gender":
            let gender = promptFor("Gender to search for", chars)
            people.filter(function(el){
                if(el.gender === gender){
                    return true
                }
            })
        case "Date of Birth":
            let dob = promptFor("Search a date of birth", chars)
            people.filter(function(el){
                if(el.dob === dob){
                    return true
                }
            })
        case "Height":
            let height = promptFor("Search for a height", chars)
            people.filter(function(el){
                if(el.height === height){
                    return true
                }
            })
        case "Weight":
            let weight = promptFor("Search for a weight", chars)
            people.filter(function(el){
                if(el.weight === weight){
                    return true
                }
            })
        case "Eye Color":
            let eyeColor = promptFor("Search for an eye color", chars)
            people.filter(function(el){
                if(el.eyeColor === eyeColor){
                    return true
                }
            })
        case "Occupation":
            let occupation = promptFor("Search for the occupation", chars)
            people.filter(function(el){
                if(el.occupation === occupation){
                    return true
                }
            })
        case "Parent":
            let parent = promptFor("Search by their parent", chars)
            people.filter(function(el){
                if(el.parent === parent){
                    return true
                }
            })
        case "Current Spouse":
            let spouse = promptFor("Search by their spouse", chars)
            people.filter(function(el){
                if(el.currentSpouse === spouse){
                    return true
                }
            })
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
