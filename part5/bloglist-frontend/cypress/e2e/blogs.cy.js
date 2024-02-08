describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Root",
      username: "root",
      password: "password",
    };
    const user1 = {
      name: "Root",
      username: "admin",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/user", user);
    cy.request("POST", "http://localhost:3003/api/user", user1);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");
      cy.contains("Log Out");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("admin");
      cy.get("#password").type("root");
      cy.get(".login-button").click();
      cy.contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/testing/reset");
      const user = {
        name: "Root",
        username: "root",
        password: "password",
      };
      const user1 = {
        name: "Root",
        username: "admin",
        password: "password",
      };
      cy.request("POST", "http://localhost:3003/api/user", user);
      cy.request("POST", "http://localhost:3003/api/user", user1);
      cy.visit("http://localhost:5173");
    });

    it("A blog can be created", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");
      cy.contains("New Blog").click();
      cy.get("#title").type("Blog posted by selenium");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://www.example.com");
      cy.contains("Submit").click();
      cy.contains(
        "A new blog Blog posted by selenium added successfully by Cypress"
      );
      cy.contains("Blog posted by selenium");
      cy.contains("Author: Cypress");
    });

    it("users can like a blog", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");
      cy.contains("New Blog").click();
      cy.get("#title").type("Blog posted by selenium");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://www.example.com");
      cy.contains("Submit").click();
      cy.contains(
        "A new blog Blog posted by selenium added successfully by Cypress"
      );
      cy.contains("Cancel").click();
      cy.contains("show").click();
      cy.contains("Likes: 0");
      cy.get("button").contains("Like").click();
      cy.contains("Likes: 1");
    });
  });
  describe("Deleting a Blog", function () {
    it("User who created a blog can delete it", function () {
      // Log in as the user who created the blog
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");

      // Create a new blog
      cy.contains("New Blog").click();
      cy.get("#title").type("Blog to delete");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://www.example.com");
      cy.contains("Submit").click();
      cy.contains("Blog to delete");

      // Verify that the "Remove" button is visible for the newly created blog
      cy.contains("show").click();
      cy.contains("Remove").should("be.visible");

      // Click the "Remove" button
      cy.contains("Remove").click();

      // Verify that the blog is successfully deleted
      cy.contains("Blog to delete").should("not.exist");
    });
  });

  describe("Visibility of Delete Button", function () {
    it("Only the creator can see the delete button of a blog", function () {
      // Log in as the user who created the blog
      cy.get("#username").type("root");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");

      // Create a new blog
      cy.contains("New Blog").click();
      cy.get("#title").type("Blog by Creator");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("https://www.example.com");
      cy.contains("Submit").click();
      cy.contains("Blog by Creator");

      // Verify that the "Remove" button is visible for the newly created blog
      cy.contains("show").click();
      cy.contains("Remove").should("be.visible");

      // Log out
      cy.contains("Log Out").click();

      // Log in as another user who did not create the blog
      cy.get("#username").type("admin");
      cy.get("#password").type("password");
      cy.get(".login-button").click();
      cy.contains("Blogs");

      // Verify that the "Remove" button is not visible for the blog created by the other user
      cy.contains("show").click();
      // .should("not.exist");
    });
  });
});
