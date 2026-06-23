import { Command, Option } from "commander";
import { generateDeclarations } from "./declarations";

interface CliOptions {
    workingDirectory: string;
}

async function main() {
    const options = parseCliOptions();
    const result = await generateDeclarations(options);

    console.log(
        `Generated ${result.declarationCount} TypeScript declaration files in ${result.outputDirectory}`,
    );
}

function parseCliOptions(): CliOptions {
    const program = new Command()
        .name("tsw")
        .description(
            "Generate TypeScript declarations from Maplestory Worlds .d.mlua native scripts.",
        )
        .addOption(
            new Option(
                "-C, --cwd <world-directory>",
                "World/project directory.",
            ).default(process.cwd(), "current working directory"),
        )
        .addOption(
            new Option(
                "--working-directory <world-directory>",
                "Alias for --cwd.",
            ),
        )
        .showHelpAfterError();

    program.parse();

    const options = program.opts<{
        cwd: string;
        workingDirectory?: string;
    }>();

    return { workingDirectory: options.workingDirectory ?? options.cwd };
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
