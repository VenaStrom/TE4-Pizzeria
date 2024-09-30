const { createClient } = window.supabase;
const supabase = createClient(dbConnectInfo.url, dbConnectInfo.key, {
    db: { schema: dbConnectInfo.schema }
});

// Don't directly interact with this array outside of this file
let globalDbPizzas = [];
let fetchAttempts = 0;

// Call this function and wait for the array
const fetchTableData = async () => {
    // If the fetch has been attempted 3 times, through an error

    if (fetchAttempts > 3) {
        console.error('Error fetching data: Too many attempts');
        return ;
    };

    // If the pizzas have already been fetched, return them
    if (globalDbPizzas.length > 0) {
        return globalDbPizzas;
    };

    // Fetches the data from the tables pizzas, ingredients and special-options
    fetchAttempts++;
    const { data, error } = await supabase.from('Pizzas').select(`
        name, 
        price,
        Ingredients:Ingredients(*),
        Special-options:Special-options(*)
        `);

    if (error) {
        console.error('Error fetching data:', error);
        return fetchTableData(); // recall in hopes of getting data

    } else if (data.length === 0) {
        console.warn('No data found in the table.');
        return fetchTableData(); // recall in hopes of getting data
    };

    // Save the data in the global variable
    globalDbPizzas = data;
    // And then immediately return it
    return globalDbPizzas;
}

const formatPizzaData = (dbPizzas) => {
    // dbPizzas refer to the array of pizzas with the structure directly from the database
    // This function massages the data slightly to make presentation easier
    return dbPizzas.map(pizza => {
        return {
            name: pizza.name,
            ingredients: pizza.Ingredients.map(ingredient => { return { name: ingredient.name, id: "ingredient" + ingredient.ingredientsID } }), // Get the ingredient object but clean up the names
            price: String(pizza.price + " kr"),
            id: pizza.name.toLowerCase().replace(/\s/g, '-'),
            specialOptions: pizza["Special-options"].map(specialOptions => { return { name: specialOptions.name, id: "special-option" + specialOptions.specialID } }), // Get the special options object but clean up the names
        };
    });
};


// Only call this function to get the pizzas
const getPizzas = async () => {
    return formatPizzaData(await fetchTableData());
};

// This function is used at the end of the quiz
const getRandomPizza = async () => {
    const pizzas = await getPizzas();
    return pizzas[Math.floor(Math.random() * pizzas.length)];
};