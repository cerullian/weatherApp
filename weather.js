const weather = async (local) => {

    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=66bfe3d468d14c57abe115503221405&q='+local+'&days=3&aqi=no&alerts=no');
    // const response = await fetch('./capitais.json); para ir buscar a um ficheiro json local

    if (response.status != 200) {
        throw new Error('Não é possível ler os dados.'); // com esta condição, ele é forçado a entrar no catch (apesar de retornar informação em json), caso a condição se verifique
    }

    const data = await response.json(); // quando recebe a informação, converte para o nosso formato

    return data;
};

export default weather