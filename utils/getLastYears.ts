export const getLast20Years = (): number[] => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const years: number[] = [];

    for (let i = startYear; i <= currentYear; i++) {
        years.push(i);
    }

    return years;
}