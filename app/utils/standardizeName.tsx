const standardizeName = (name: string) => {
    return name
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(word => word[0]?.toUpperCase() + word.slice(1))
        .join(' ');
};

export default standardizeName ;