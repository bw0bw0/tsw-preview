export function splitTopLevel(value: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let partStart = 0;

    for (let index = 0; index < value.length; index++) {
        const char = value[index];
        if (char === "<" || char === "(") depth++;
        if ((char === ">" && value[index - 1] !== "-") || char === ")") depth--;
        if (char === "," && depth === 0) {
            parts.push(value.slice(partStart, index).trim());
            partStart = index + 1;
        }
    }

    const lastPart = value.slice(partStart).trim();
    if (lastPart.length > 0) {
        parts.push(lastPart);
    }

    return parts;
}

export function must<T>(value: T | undefined, description: string): T {
    if (value === undefined) {
        throw new Error(`Missing ${description}`);
    }

    return value;
}
