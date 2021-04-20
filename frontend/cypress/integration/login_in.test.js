require("dotenv").config();

describe("sanity check", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    })
    it("visits the the site localhost 3000", () => {
        cy.contains("Helpful Resources And Links");
    })
    it("logs in an admin", () => {
        // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
        cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"))
        cy.contains("Login").click();
        
        cy.contains("Student Queue")
        cy.contains("Log Out")
    })
})


describe("student Log In", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    })
    it("visits the the site localhost 3000", () => {
        cy.contains("Helpful Resources And Links");
    })
    it("logs in a student", () => {
        // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
        cy.get("input[placeholder='Email']").type(Cypress.env("STUDENT_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("STUDENT_PASSWORD"))
        cy.contains("Login").click();
        
        cy.contains("Job Tracker")
        cy.contains("Coding Practice")
        cy.contains("Documentation")
        cy.contains("Curriculum")
        cy.contains("Log Out")
    })
})

describe("student Makes A Help Request", ()  => {

    
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorage")
    })
    
    it("logs in a student", () => {
        cy.visit("http://localhost:3000/")
        // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
        cy.get("input[placeholder='Email']").type(Cypress.env("STUDENT_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("STUDENT_PASSWORD"))
        cy.contains("Login").click();
        
        cy.contains("Job Tracker")
        cy.contains("Coding Practice")
        cy.contains("Documentation")
        cy.contains("Curriculum")
    })
     
    it("Requests help", () => {
        cy.contains("Request Help").click()
        cy.contains("Cancel Request")
        
    })

    it("Logs a student out", () => { 
        cy.contains("Log Out").click()
    })
    
    it("Logs in as admin", () => {
        cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"))
        cy.contains("Login").click();
    })

    it("Checks the Student Queue for the request made", () => {
        cy.contains("Student Queue").click()

        cy.contains(Cypress.env("STUDENT_EMAIL"));
    })

    it("Marks the request as complete", () => {
        cy.contains("Complete").click()
        cy.contains("No Students Waiting")
    })
        


})
