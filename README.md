## About
A website for a pizza restaurant named [*Il Forno Magico*](https://ilfornomagico.ntig.dev/).

Link to [nightly build](https://ntig-uppsala.github.io/TE4-JITS-Pizzeria/).

## Development environment
* **OS:** Windows 11
* **Browser:** Chrome v.127.0.6533.120
* **Code editor:** Visual Studio Code (VS Code) v.1.93.0
  * Extensions
    * HTML CSS Support
        * Id: ecmel.vscode-html-css
        * Version: 2.0.10
        * Publisher: ecmel
        * VS Marketplace [Link](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)

### Languages
* HTML5
* CSS 3
* JavaScript (V8 engine)
* Python v.3.12.5
    * playwright 1.46.0
* Bootstrap v5.3.3


## Configure tests
To get started with our testing system, follow these instructions:

1. In the VS Code menu bar, navigate to **View -> Testing**.
2. Click on “Configure Python Tests”.
3. Click on “unittest”.
4. Click on “tests”.
5. Click on “test*.py”.
6. Restart VS Code.
   * This is done since VS Code can be very flakey when it comes to recognizing the test files.


## Connect to server
Ip address, port and password can be found in this document, [Locked](https://docs.google.com/document/d/1MWLQmjovcKNbXPJKwjeO6dcWuTHolFhyG45ixu8kwDk/edit?usp=sharing).
* `ssh root@<ip adress> -p <port>`
* `yes` when prompted about connecting
* `<root password>`
* `cd /var/www/html`


## Publish to production

Connect to the server and navigate to `/var/www/html` and run the following commands:
* `git fetch --all`
* `git checkout tags/<tag>` \<tag>: the [desired releases](https://github.com/NTIG-Uppsala/TE4-JITS-Pizzeria/releases) tag e.g. `v1.0.0`.
* `systemctl restart nginx` to make sure the changes take effect.



If any problems occur, please check if nginx and git are installed correctly.

```
apt install nginx git
```

If there is nothing in the folder you will have to clone the repository.
```
git clone https://github.com/NTIG-Uppsala/TE4-JITS-Pizzeria.git .
```

## Accessing the database 
We use [SupaBase](https://supabase.com/) as our database. To access the database, follow these steps:
1. Go to [SupaBase](https://supabase.com/).
2. Log in.
3. Open the invite-link sent to your email.
   * make sure the email is the same as the one you used to log in. Supabase will complain otherwise.
4. Click on the project *il-forno-magico*.
5. On the nav-bar to the left you will see tab labeled *Database*.
6. There you will see all the tables.