export const standardizeName = (name: string) => {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
};

export const capitalizeName = (name: string) => {
    return name
        .trim()
        .toLowerCase()
        .replace(/^(\w)(\w*)/, (_, first, rest) => first.toUpperCase() + rest);
}
