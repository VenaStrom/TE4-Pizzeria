## About
A website for a pizza restaurant named "Il Forno Magico".

## Development environment
* **OS:** Windows 11
* **Browser:** Chrome v.127.0.6533.120
* **Code editor:** Visual Studio Code (VS Code) v.1.92.2
* Python v.3.12.5

    * Selenium v.4.23.1 (needed for the [testing system](#installation-of-testing-system))
* Bootstrap v5.3.3


## Installation of testing system
To get started with our testing system, follow these instructions:

1. Open the python file located at **tests/testMain.py** in VS Code. 
2. In the VS Code menu bar, navigate to **View -> Testing**.
3. Click on “Configure Python Tests”.
4. Click on “unittest”.
5. Click on “tests”.
6. Click on “test*.py”.
7. Restart VS Code.

## Generating screenshots of the website in different resolutions

1. Run "screenshots.py"
2. The screenshots will be saved in "/generatedScreenshots/"

## Deploy GitHub Page

1. Open a browser
2. Open github.com and log in
3. Open the repository "TE4-JITS-Pizzeria"
4. In the repo, navigate to “Settings”
5. Under “Code and automation”, navigate to “Pages”
6. Under “Build and deployment”, set “Source” to “Deploy from a branch”
7. Under “Branch” select “Main” on the left and “/ (root)” on the right. Press “Save”.

## Font system

All used fonts are defined in "/styles/fonts.css". Fontfiles should be placed in "/styles/"

## How to access hosting system
Ip adress, port and password can be found in this document [Click me!](https://docs.google.com/document/d/1MWLQmjovcKNbXPJKwjeO6dcWuTHolFhyG45ixu8kwDk/edit?usp=sharing)
* `ssh root@<ip adress> -p <port>`
* `yes` when prompted about connecting
* `<root password>`
* `cd /var/www/html`

If there is nothing in the folder:
* `git clone https://github.com/NTIG-Uppsala/TE4-JITS-Pizzeria.git .`
* `git checkout <tag>` *tag is the name of the latest release in the git repository

If there is a problem, check that nginx and git are installed:
* `apt install nginx git`

## Publish a new version of the website:

Access the hosting system

In the hosting system's var/www/html directory, type:
* `git fetch`
* `git checkout <tag>` *tag is the name of the new version that you have named in your git repository (to be named according to semantic versioning)
