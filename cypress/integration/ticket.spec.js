describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))


    /* cy.visit = Comando para visitar o site
       cy.get = seleciona a ID onde o teste será realizado 

       .type = insere valor que será inserido na ID selecionada pelo GET
       .select = seleciona qual select button irá reagir no teste.
       .check = seleciona qual radio button irá reagir
       
       
       it.only = Realizará somente esse teste */
       


    /* Teste para implementar os campos de texto */
    it("fills all the text input fields", () => {

        const firstName = "Gabriel";
        const lastName = "Sousa";
        
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("gabriel.alves20x@gmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    }
    )
    
    /* Teste para interagir com os select buttons
       (OBS: números entre aspas são consideradas strings, enquanto sem aspas é considerado pela ordem lógica da fila de opçãoes */
    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    })


    /* Teste para interagir com Radio Buttons*/

    it("Select 'VIP Ticket Type'", () => {
        cy.get("#vip").check();
    })

    /* Testes com checkboxes*/

    it("Select 'Friend' Checkbox", () => {
        cy.get('#friend') .check();
    })

    it("Select 'friend', and 'publication', then uncheck 'friend'", () =>{
        cy.get('#friend') .check();
        cy.get('#publication').check();
        cy.get('#friend') .uncheck();
    })

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    })

    it("alerts on invalid email",() => {
        cy.get("#email")
        /* Criando um Alias para reaproveitar o seletor CSS do "#email"*/
        .as("email")
        .type("gabriel.alves20xgmail.com")

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            /* Limpando o campo do Email para receber o próximo email.*/ 
            .clear()
            .type("gabriel.alves20x@gmail.com")
         
            cy.get("#email.invalid").should("not.exist");
    })

    it("fills and reset the form",() => {

        const firstName = "Gabriel";
        const lastName = "Sousa";
        const fullName= (`${firstName} ${lastName}`);

        
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("gabriel.alves20x@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get('#friend') .check();
        cy.get("#requests").type("Vegetarian");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets`  
        );

        cy.get("#agree").check();
        cy.get("#signature").type(`${firstName} ${lastName}`)

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled")

        
    })

    it("fills mandatory fields using support command", () => {

        const costumer = {
            firstName: "John",
            lastName: "Silva",
            email:"joaosilvaexemple@gmail.com"
        };
        
        cy.fillMandatoryFields(costumer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled")

    })

})