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
    fetchAttempts++;
    if (fetchAttempts > 3) {
        
        return;
    };


    // If the pizzas have already been fetched, return them
    if (globalDbPizzas.length > 0) {
        return globalDbPizzas;
    };

    // Fetches the data from the tables pizzas, ingredients and special-options
    const { data, error } = await supabase.from('Pizzas').select(`
        name, 
        price,
        Ingredients ( name ),
        Special-options ( name )
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
            ingredients: pizza.Ingredients.map(ingredient => ingredient.name),
            price: String(pizza.price + " kr"),
            id: pizza.name.toLowerCase().replace(/\s/g, '-'),
            specialOptions: pizza["Special-options"].map(specialOptions => specialOptions.name),
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