import path from "node:path";
import { findDeclarationFiles } from "./files";
import { parseDeclarationFile } from "./parser";
import { writeTsConfig } from "./tsconfig";
import { writeDeclarations } from "./writer";

export interface GenerateDeclarationOptions {
    workingDirectory: string;
}

export interface GenerateDeclarationResult {
    declarationCount: number;
    outputDirectory: string;
}

const nativeScriptsPath = path.join("Environment", "NativeScripts");

export async function generateDeclarations({
    workingDirectory,
}: GenerateDeclarationOptions): Promise<GenerateDeclarationResult> {
    const resolvedWorkingDirectory = path.resolve(workingDirectory);
    const sourceDirectory = path.join(
        resolvedWorkingDirectory,
        nativeScriptsPath,
    );
    const outputDirectory = path.join(resolvedWorkingDirectory, "Type");

    const sourceFiles = await findDeclarationFiles(sourceDirectory);
    if (sourceFiles.length === 0) {
        throw new Error(`No .d.mlua files found in ${sourceDirectory}`);
    }

    const declarations = await Promise.all(
        sourceFiles.map(parseDeclarationFile),
    );

    await writeDeclarations(outputDirectory, declarations, sourceDirectory);
    await writeTsConfig(resolvedWorkingDirectory);

    return {
        declarationCount: declarations.length,
        outputDirectory,
    };
}
