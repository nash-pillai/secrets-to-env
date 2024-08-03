import * as core from "@actions/core";

try {
	const secretsJson = core.getInput("secrets", { required: true });

	let secrets: Record<string, string>;
	try {
		secrets = JSON.parse(secretsJson);
	} catch (e) {
		throw new Error(`Cannot parse JSON secrets`);
	}

	for (const [key, value] of Object.entries(secrets)) {
		core.exportVariable(key, value);
		core.info(`Exported ${key}`);
	}
} catch (error) {
	if (error instanceof Error) core.setFailed(error.message);
}
