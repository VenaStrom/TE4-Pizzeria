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


## Deploy to production

Connect to the server and run the following command:
```
/usr/local/bin/deploy.sh <tagVersion>
```
\<tagVersion> corresponds to the desired [release tag](https://github.com/NTIG-Uppsala/TE4-JITS-Pizzeria/releases) e.g. `v1.0.0`.



If any problems occur, please check if nginx and git are installed correctly.

```
apt install nginx git
```

If there is nothing in the folder you will have to clone the repository first.
```
git clone https://github.com/NTIG-Uppsala/TE4-JITS-Pizzeria.git /var/www/html
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

## Accessing the schemas and tables
### Using the Table Editor
1. In the dashboard on the leftside click Table Editor.
2. In the upper left corner click "schema" and select either Dev or Porduction.
### Using SQL
1. In the dashboard on the leftside click SQL Editor.
2. To view all the the tables in a specific schema run the following command (schema_name is should be either Dev or Production).
```
SELECT table_name FROM information_schema.tables WHERE table_schema = 'schema_name';
```
3. To view the contents of a specific table run the following command.
```
SELECT * FROM "schema_name"."table_name";
```

## Creating a new public schema or table
If you want to create a new schema or table that should be retrievable from the client side, you'll need to create policies.

### Schema
1. In the SQL Editor, run the following command to create a new schema:
    ```sql
    CREATE SCHEMA "schema_name";
    ```
2. Grant usage and select permissions to the `anon` role:
    ```sql
    GRANT USAGE ON SCHEMA "schema_name" TO anon;
    ```

### Table
1. In the Table Editor, click "New table" and enable Row Level Security (RLS), then apply your desired configurations.
2. After the table has been created, click in the upper right corner on "Add RLS policy".
3. Click "Create policy".
4. A number of options will show on the right side of the screen. Select the desired policy and click save (Alternatively, you can write your own SQL if your desired policy is not present).
5. If the connection is still denied by the client side, you'll have to run some SQL commands. In the SQL Editor, run the following commands:
    ```sql
    GRANT USAGE ON SCHEMA "schema_name" TO anon;
    GRANT SELECT ON ALL TABLES IN SCHEMA "schema_name" TO anon;
    -- Note that this will grant select access on all the tables in "schema_name". To grant access to a single table instead, run:
    GRANT SELECT ON "schema_name"."table_name" TO anon;
    ```

## Creating a New Private Schema or Table
Follow the steps outlined in "Creating a New Public Schema or Table" but use the "service_role" key instead of the "anon" key. This ensures that the data can only be retrieved using the secret key, not the public key.

## Fetching Data from the Database
To fetch data from the database, you will need a `supabaseUrl` and a `publicKey`. These credentials should be placed in a JavaScript file. You can use `envExample.js` as a reference for the structure. The credentials can be found in the following document: [Locked](https://docs.google.com/document/d/1MWLQmjovcKNbXPJKwjeO6dcWuTHolFhyG45ixu8kwDk/edit?usp=sharing).
