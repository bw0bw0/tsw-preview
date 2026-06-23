import { readdir } from "node:fs/promises";
import path from "node:path";

export async function findDeclarationFiles(
    directory: string,
): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await findDeclarationFiles(entryPath)));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith(".d.mlua")) {
            files.push(entryPath);
        }
    }

    return files.sort((left, right) => left.localeCompare(right));
}
