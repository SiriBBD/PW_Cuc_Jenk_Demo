Feature: Products tests

    Background:
        Given User navigates to the application
        And User click on the login link

    Scenario Outline: Add to cart
        And User enter the username as "<username>"
        And User enter the password as "<password>"
        And User click on the login button
        When user search for a "<book>"
        When user add the book to the cart
        Then the cart badge should get updated
       


    
    Examples: 
        | username | password  | book             |
        | ortoni   | pass1234$ | HP6          |
        | ortoni  | pass1234$  | The Simple Wild |

