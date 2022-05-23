const capitals = async () => {

    const response = await fetch('https://restcountries.com/v3.1/region/europe');

    if (response.status != 200) {
        throw new Error('Não é possível ler os dados.');
    }

    const data = await response.json();

    return data;
};

export default capitals