# The project under development

I used Vite and PNPM to create this project. If you want to launch this project, you should execute 'pnpm i' and after 'pnpm dev', but you can also use 'npm i' and 'npm run dev' if you prefer.

## A little temporary description of this project :

### UML Schema ( UML_diagram/UML diagrammJPG )

- Before starting my backend application, I prepared my entity association schema to ease my work and created a roadmap. 

- Little notice, that schema is not the latest version. In the latest version, I added an additional table between Users and Commentaires to allow the possibility of liking and disliking comments.

- Of course, it's a simple UML schema, but I think it has some interesting details. For example, I have a multiple association between the 'movie' and 'actors' tables.

### Models

- After that, I started my backend application. I used Node.js with Express.js, and additionally, 
I used Sequelize to create my database with JavaScript, instead of using pure SQL. 
However, for some tasks, it's clearly more interesting to use SQL. 
But in this case, I used Sequelize to save time.

- It's working well, but I think the general documentation of Sequelize is good. However, if you want to create 
non-basic associations, it can be pretty complicated to find out how to do it. 
For example, I had to create a multi-association between two tables, and I couldn't really find information 
on how to do it in the documentation. After hours of searching, I used ChatGPT and found a solution. 
Interestingly, when I checked the official documentation later, I didn't find that particular solution 
mentioned there.

- Finally, it's not very complicated. In general, after creating an association, Sequelize assigns a default name to it. 
If you don't change this default name, all associations will have the same name. 
Because of that, you couldn't use these associations, and you would never see an error 
because Sequelize assumes everything is in order.

- But if you specify a specific name for each of them, 
you can use all of your associations simply by referencing the correct name.

- And of course, at this stage, I specified some validations for my tables to create constraints 
and safeguard my database against poorly formatted data. And each model has its proper file to facilitate the maintenance of code.

### Routes

- After that, I created routes for each table to facilitate navigation and improve user experience. Additionally, 
I added different middleware for better protection of my database.

### Middlewares

- First ( middlewares/bodyValidator.js ) , I use Yup to check the data received from the client before executing any requests to my database. 
This way, I ensure that incorrect data won't be processed and stored in the database.

- Secondly ( middlewares/authRoles.js ), for some routes, I created a middleware to check if the user is connected or not. 
Additionally, it verifies if the user has admin privileges to perform actions like 
changing or deleting certain information.

- And the last one ( middlewares/authUser.js ), for particular routes, I verify if the connected user who tries 
to access a profile matches the user who owns that profile. Thanks to this, 
users can't see the personal information of other users, but administrators have the access rights to do so.

- For each route, I have a personal controller and service to facilitate the maintenance of the code.

### Controllers

- In each controller, I receive the information from the frontend, and after that, 
I send a request to the service to execute the necessary actions and communicate with the database 
to create or retrieve specific information. Once I receive the data from the database, 
I clean the data using DTO (Data Transfer Object) to ensure the client receives well-organized data. 
Additionally, I send an appropriate status code along with the response.

### Services 

- Each table had a personalized service to facilitate the maintenance of the code.

- I tried to create a more complete service for each table. I implemented CRUD operations 
and added some complementary services to have the opportunity to receive the data ordered or sorted by the database. 
Of course, it's not totally complete.

- Here, I also used Sequelize for sending requests to the database. 
However, I believe I should consider changing this approach because while it works well for simple tasks, 
it becomes quite complicated for more complex tasks. I think I should use direct SQL language requests 
for those situations.

### Utils 

- I used JWT to create tokens and implement different user roles. This allows me to check if a user is connected or not.

- And Multer for adding the avatars or covers for some of the data.
