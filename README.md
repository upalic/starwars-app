## StarWars App

[Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Screenshot

![Planets Page](<src/assets/images/Screen Shot 2023-11-16 at 6.35.03 PM.png>)

## Project Approach
* I started the project by building fundamental components or say low level components utilizing the Kendo UI library.
* I made use of modular approach to organize and structure these components.
* My aim for creating these low level components and using it on a high level component which is the layout was to ensure readibility and maintainability. Although I have just used it in one location for this project but the idea was to follow the best practices and prepare for the demands of UX Engineer role by encouraging flexible and scalable method.

## Basic hacks I did
* Sorting hack: Notmally apis do have a basic ordering apis but i didnt see for this particular api so i just did a simple hack, Sicne its not possible to fetch all the data at once, i created a simple recursive function to get all the data and sort it based on it. That way we could have the correct order. 
* The api had a lot of details, so I mapped only few important details to show in the table.
* Used custom skeleton loader for table.

## Improvements Required
* I did most of the types just to make it work and structure it. Not sure if its scalable right now but it would be better to have a proper file sturcture for it and good types. 
* I did use any in most of the places as well. We can implement better type structure in my opinion.
* Logic mostly sits in component and few in service right now but we could keep component as simple as possible. I feel the low level ui kit components are much better but the layout component holds a lot of logic. Although, the low level card component can be further improved, right now it just serves for one type of design.
* Expandable table: Can make use of to expand each row and show other details of the table. 
* We can make the User experience much better with better layout and visuals.
* The details keeps changing in the card until all data is fetched, so it is bit slow and needs improvment.

## Not implemented 
* I didnt focus on unit test cases right now but the ui kit components can be tested quite well as its quite simple. This is something we can focus later.

## Takeaway
* To be honest, I enjoyed working on the code and spent a little over three to four hours because I always get excited by challenges. Within 4 hours I was able to build the basic workable form but I wanted to make the user experience a little better so I spent a little more time.
* I could structure the project in my terms and properly work on it. 
* I know I can make the UI much better with time but i didnt want to complicate the UI and just keep it simple and sleek. 
* Kendo UI has some great documentation so it was quite a delight to work with it. Its possible to build good components with it.