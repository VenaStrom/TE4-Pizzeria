## About
A website for a pizza restaurant named [*Il Forno Magico*](https://ntig-uppsala.github.io/TE4-JITS-Pizzeria/).

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
2. Click on `Configure Python Tests`.
3. Click on `unittest`.
4. Click on `tests`.
5. Click on `test_*.py`.
6. Restart VS Code.
   * This is done since VS Code can be very flakey when it comes to recognizing the test files.

7. If you run the tests now, most of them will fail. This is because the tests are written to test the `Testing` database. To test with that database, you will need to set up `env.js` (See [How to setup env.js](#how-to-setup-envjs)). After that is set up you need to change the key to the secret key and set the schema to `Testing`.


## Connect to web server
Ip address, port and password can be found in this document, [Locked](https://docs.google.com/document/d/1MWLQmjovcKNbXPJKwjeO6dcWuTHolFhyG45ixu8kwDk/edit?usp=sharing).
* `ssh root@<ip address> -p <port>`
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
4. Click on the project `il-forno-magico`.
5. On the nav-bar to the left you will see tab labeled `Database`.
6. There you will see all the tables.

## How to setup env.js
The reason to set up `env.js` is to access the development database that is used during development. To do this you will need: 
* The url of the database e.g. `https://<your-projects-id>.supabase.co` that you get on the supabase website under `project settings -> API`. 
* A `private key` that you get from the same page on supabase's site.
* And the name of the `schema` you want to access.

When you have those, it's time to copy the `envTemplate.js` file and rename it to `env.js`. Then you will need to fill in the `url`, `private key` and `schema` in the `env.js` file where it directs you to do so. Keep in mind that the `env.js` file is in the `.gitignore` file so it won't be and shouldn't be pushed to the repository.

## Accessing the schemas and tables
### Using the Table Editor
1. In the dashboard on the left side click `Table Editor`.
2. In the upper left corner click `schema` and select either `Dev`, `Production` or `Testing`.
### Using SQL
1. In the dashboard on the left side click `SQL Editor`.
2. To view all the the tables in a specific schema, run the following command but replace`[schema_name]` with the actual name of your schema.
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = "[schema_name]";
```
3. To view the contents of a specific table run the following command.
```sql
SELECT * FROM "[schema_name]"."table_name";
```

## Make public schema
If you want to create a new schema that should be retrievable from the client side, you'll need to create policies.

1. In the SQL Editor, run the following command to create a new schema but replace `[schema_name]` with the actual name of your schema:
    ```sql
    CREATE SCHEMA "[schema_name]";
    ```
2. Grant usage and select permissions to the `anon` role:
    ```sql
    GRANT USAGE ON SCHEMA "[schema_name]" TO anon;
    ```
3. Populate the schema with tables. See [database structure](#create-tables-in-schema).

4. To make a table public navigate to the `table editor` and for each table, click in the upper right corner on `Add RLS policy`.
5. Click `Create policy`.

6. A number of options will show on the right side of the screen. Select the desired policy, e.g select access, and click `save` (Alternatively, you can write your own SQL if your desired policy is not present).

7. In the dashboard on the left side click `Project settings` -> `API`, scroll down to `Data API Settings` and add your schema to the exposed schemas.

8. If the connection is still denied by the client side, you'll have to run some SQL commands. In the SQL Editor, run the following commands and replace `[schema_name]` with the actual name of your schema:
    ```sql
    GRANT USAGE ON SCHEMA "[schema_name]" TO anon;
    GRANT SELECT ON ALL TABLES IN SCHEMA "[schema_name]" TO anon;
    -- Note that this will grant select access on all the tables in "[schema_name]". To grant access to a single table instead, run:
    GRANT SELECT ON "[schema_name]"."table_name" TO anon;
    ```

## Make schema or table private
If you want to create a new schema that should only be retrievable using the secret key, you'll need to create policies.

1. In the SQL Editor, run the following command to create a new schema but replace `[schema_name]` with the actual name of your schema:
    ```sql
    CREATE SCHEMA "[schema_name]";
    ```
2. Grant usage and select permissions to the `service_role` role:
    ```sql
    GRANT USAGE ON SCHEMA "[schema_name]" TO service_role;
    ```
3. Populate the schema with tables. See [database structure](#create-tables-in-schema).

4. To make a table private navigate to the `table editor` and for each table, click in the upper right corner on `Add RLS policy`.
5. Click `Create policy`.

6. A number of options will show on the right side of the screen. Select the desired policy, e.g select access, and click `save` (Alternatively, you can write your own SQL if your desired policy is not present).

7. In the dashboard on the left side click `Project settings` -> `API`, scroll down to `Data API Settings` and add your schema to the `exposed schemas`.

8. If the connection is still denied by the client side, you'll have to run some SQL commands. In the SQL Editor, run the following commands and replace `[schema_name]` with the actual name of your schema:
    ```sql
    GRANT USAGE ON SCHEMA "[schema_name]" TO service_role;
    GRANT SELECT ON ALL TABLES IN SCHEMA "[schema_name]" TO service_role;
    -- Note that this will grant select access on all the tables in "[schema_name]". To grant access to a single table instead, run:
    GRANT SELECT ON "[schema_name]"."table_name" TO service_role;
    ```

## Create tables in schema
To get an overview of the structure of the database, see this image: [Database Structure](https://github.com/user-attachments/assets/caaa49e9-4b96-4cda-853a-207e645035f4). We have three schemas: Dev, Production and Testing. Each schema shares the same structure but contains different data.

To create all the tables with the correct structures in Supabase, copy and paste the SQL code below into the SQL editor within an empty schema. Replace `[schema_name]` with the actual name of your schema. Note that the tables will be created empty.
```sql
CREATE TABLE "[schema_name]"."Pizza-special-options" (
    "pizzaID" SERIAL NOT NULL, 
    "specialID" SERIAL NOT NULL,
    PRIMARY KEY ("pizzaID", "specialID")
);

CREATE TABLE "[schema_name]"."Special-options" (
    "specialID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    PRIMARY KEY ("specialID")
);

CREATE TABLE "[schema_name]"."Pizzas-ingredients" (
    "pizzaID" SERIAL NOT NULL,
    "ingredientsID" SERIAL NOT NULL, 
    PRIMARY KEY ("pizzaID", "ingredientsID")
);

CREATE TABLE "[schema_name]"."Pizzas" (
    "pizzaID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" SMALLINT NOT NULL,
    PRIMARY KEY ("pizzaID")
);

CREATE TABLE "[schema_name]"."Ingredients" (
    "ingredientsID" SERIAL NOT NULL, 
    "name" TEXT NOT NULL,
    PRIMARY KEY ("ingredientsID")
);

ALTER TABLE "[schema_name]"."Pizzas-ingredients" 
    ADD CONSTRAINT "pizzas_ingredients_ingredientsid_foreign" FOREIGN KEY ("ingredientsID") REFERENCES "[schema_name]"."Ingredients" ("ingredientsID");

ALTER TABLE "[schema_name]"."Pizzas-ingredients" 
    ADD CONSTRAINT "pizzas_ingredients_pizzaid_foreign" FOREIGN KEY ("pizzaID") REFERENCES "[schema_name]"."Pizzas" ("pizzaID");

ALTER TABLE "[schema_name]"."Pizza-special-options" 
    ADD CONSTRAINT "pizza_special_options_specialid_foreign" FOREIGN KEY ("specialID") REFERENCES "[schema_name]"."Special-options" ("specialID");

ALTER TABLE "[schema_name]"."Pizza-special-options" 
    ADD CONSTRAINT "pizza_special_options_pizzaid_foreign" FOREIGN KEY ("pizzaID") REFERENCES "[schema_name]"."Pizzas" ("pizzaID");
```

