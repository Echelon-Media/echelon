This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Echelon.lk- Developers Guide


The website is developed with Headless Wordpress architecture.
Frontend is done with next.js (react js framework).
REST API is used for the data retrieved from the backend.



Github repository link - https://github.com/Echelon-Media/echelon.git
Main documentation for other information - Echelon Documentation
	

About the Backend
	Live backend URL - https://backend.echelon.lk/wp-admin/

Wp-backend consists of different post types - users can add posts through those post types.
There are some custom fields created with ACF , those fields are;

## Post Types
Custom Post Type
Manual code changes(wp-backend)
Video
youtube_video_Id 

You can find relevant codes on functions.php

File location - wp-content/themes/sidewalks/functions.php


There is a custom plugin for creating post views database table. It should be activated. Php code for the custom plugin is in the my-custom-db-tables.php file in my-custom-db-tables folder.
Folder path - wp-content-/plugins/my-custom-db-tables.
functions.php(wp-content/themes/sidewalks/functions.php).
 
(Post view count is calculated when a frontend user navigates into a post and waits at the post for more than 10 sec. Database actions regarding this scenario is in the functions.php)

All other new rest api end points functions are in the functions.php
Rest api end point data protected by JWT token.




### Running on a server

Backend is hosted in siteground.
Frontend is hosted in AWS lightsail by plesk,


## Frontend Deployment

Deployment is automated by CI/CD and linked the repository to the plesk.
That is the direct repository to a production server.
Only finalised working commits push into this repository.
After push into the repo, you should go to plesk prod admin panel > websites & domains>echelon.lk> git ;


Then pull the repository and wait until the process then close the side notification and close the popup.
Deployment is automatically done when you click the pull now.






## IF Deployment is not properly worked automatically,
Navigate into the websites & domains> echelon.lk.  Then  navigate to the Node.js.


Next npm install , then go to scripts and type ‘build’  then run the command. If it successfully runs, close it.
	

After successful build you should click restart the application button.
You can see your updates on the live website.

/// HAPPY CODING////






