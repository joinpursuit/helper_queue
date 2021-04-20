describe("Admin Log In", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    })
    it("Visits the the site localhost 3000", () => {
        cy.contains("Helpful Resources And Links");
    })
    it("Logs in an admin", () => {
        // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
        cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"))
        cy.contains("Login").click();
        
        cy.contains("Student Queue")
        cy.contains("Log Out")
    })
})


describe("Student Log In", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    })
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorageDb");
    })
    it("Visits the the site localhost 3000", () => {
        cy.contains("Helpful Resources And Links");
    })
    it("Logs in a student", () => {
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

describe("Student Makes A Help Request", ()  => {

    
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorage")
    })
    
    it("Logs in a student", () => {
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
        
    it("Logs an admin out", () => { 
        cy.contains("Log Out").click()
    })

})

describe("Student can cancel a help request", () => {
    
    afterEach(() => {
        indexedDB.deleteDatabase("firebaseLocalStorage")
    })

    it("Logs in a student", () => {
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

    it("Logs an admin out", () => { 
        cy.contains("Log Out").click()
    })

    it("Logs in a student", () => {
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

    it("Cancels help request", () => {
        cy.contains("Cancel Request").click()
        cy.contains("Request Help")
    })

    it("Logs a student out", () => { 
        cy.contains("Log Out").click()
    })

    it("Logs in as admin", () => {
        cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
        cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"))
        cy.contains("Login").click();
    })

    it("Has no requests waiting", () => {
        cy.contains("Student Queue").click()
        cy.contains("No Students Waiting")

    })
})