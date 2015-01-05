# Server Admin
[![Build Status](https://travis-ci.org/Qt-dev/server-admin.svg?branch=master)](https://travis-ci.org/Qt-dev/server-admin)

## Screenshot
![Imgur](http://imgur.com/Zv0b6Sw.jpg)

## Mobile screenshot
![Imgur](http://i.imgur.com/o09AI1S.jpg)

## About The app
### What is it?
It is a server interface. This interface gives you useful tools and commands in one central location for servers using apps like [Sickbeard](http://sickbeard.com/) or [Sabnzbd](http://sabnzbd.org/).

### What app does it connects to?
#### Use it
Download it with ```git clone https://github.com/cookie-monster-inc/server-admin.git```.
Then install dependencies with ```npm install```,.
Launch the app with ```grunt```.

The site is now available on ```http://localhost:3000```.

#### Downloaders
* [Sabnzbd](http://sabnzbd.org/): An app that downloads data from newsgroups.  
The interface gives you a list of ongoing and completed downloads, status, speed and time left, and a "pause" toggle and a "clear history" button.
* [Transmission](http://www.transmissionbt.com/): An app that downloads data from bitorrent.  
The interface gives you a list of ongoing and stopped downloads, as well as a pause, clear finished, and clear all buttons

#### Content Managers
* [Sickbeard](http://sickbeard.com/): An app that manages the TV Shows you follow, and downlaods them by sending orders to downloaders.  
The interface gives you a list of show episodes that are coming out today, or soon, as well as a button to put the snatched episodes as Wanted if you see that the launched download failed.
* [Couchpotato](https://couchpota.to): An app that manages the Movies you want to download and downloads them by sending orders to downloaders.  
The interface gives you a list of active downloads (Downloads that are waiting for sources), and inactive one (except the one that are downloaded yet), as well as info about how many active researches you have and the total number of movies in your database.

## About the code
### What technologies does it use?
The backend is a [node](http://nodejs.org) app.  
The frontent uses:  
  * Vanilla Javascript
  * [BackboneJS](http://backbonejs.org) for the models/collections logic
  * [ReactJS](http://facebook.github.io/react/) for the view

### File issues / Ask for features
You can use https://github.com/cookie-monster-inc/server-admin/issues.
I'll do my best to follow up on them.

### How to contribute
Feel free to add a plugin (I can explain how if you ask nicely ;) )
Just submit a pull request. It will be reviewed and probably merged later.

## About the author
Hi! My name is Quentin Devauchelle. I graduated from [Dev Bootcamp](http://devbootcamp.com/) in San Francisco in March 2014. 
Here are my [linkedin](http://linkedin.com/in/quentindevauchelle/) and [github](https://github.com/Qt-dev/). 

I created this organization for the projects I am working on, for the people interested, no matter where they are in the world.

You can contact me at [quentin@devauchelle.eu](quentin@devauchelle.eu)
