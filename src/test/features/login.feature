Feature: User Authentication tests

Background:
        Given User navigates to the application
        And User click on the login link

    @test
    Scenario: Login should be success
        And User enter the username as "ortoni"
        And User enter the password as "Pass12345"
        When User click on the login button
        Then Login should be success
    
    Scenario: Login should not be success
        Given User enter the username as "gkds"
        Given User enter the password as "pass999"
        When User click on the login button
        Then Login should Fail
 