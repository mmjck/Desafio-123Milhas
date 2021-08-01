const months = [
    { id: 1, value: "Janeiro" },
    { id: 2, value: "Fevereiro" },
    { id: 3, value: "Março" },
    { id: 4, value: "Abril" },
    { id: 5, value: "Maio" },
    { id: 6, value: "Junho" },
    { id: 7, value: "Julho" },
    { id: 8, value: "Agosto" },
    { id: 9, value: "Setembro" },
    { id: 10, value: "Outubro" },
    { id: 11, value: "Novembro" },
    { id: 12, value: "Dezembro" },
];



const generateArrayOfYears = () => {
    const y = new Date().getFullYear()
    let max = y + 9
    let idx = 0;
    let years = []

    for (let i = y; i <= max; i++) {
        years.push({ value: i, id: idx });
        idx += 1
    }
    return years;
}

const years = generateArrayOfYears();


const DEFAULT_MESSAGES = {
    INITIAL_RENDER: "Procure por pacote de viagens mais em conta!",
    IS_EMPTY: "Desculpe, mas não encontramos nenhum pacote!",
    FATAL_ERROR: "Alguma coisa deu errada. Por favor, tente novamente!"
}


export { years, months, DEFAULT_MESSAGES}
