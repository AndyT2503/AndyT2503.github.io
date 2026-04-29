"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs_1 = require("fs");
const path_1 = require("path");
exports.default = (0, architect_1.createBuilder)(async (options, ctx) => {
    ctx.logger.info('Builder has been started...');
    try {
        const buildTarget = {
            target: 'build',
            project: ctx.target.project,
            configuration: ctx.target.configuration,
        };
        const buildOptions = await ctx.getTargetOptions(buildTarget);
        const build = await ctx.scheduleTarget(buildTarget);
        const result = await build.result;
        const success = result.success;
        if (success) {
            const outputPath = getOutputPath(result, buildOptions['outputPath'], ctx.workspaceRoot);
            const pathOfIndexPage = `${outputPath}/index.html`;
            if (!(0, fs_1.existsSync)(pathOfIndexPage)) {
                ctx.logger.error(`Cannot find index.html at ${pathOfIndexPage}`);
                return { success: false };
            }
            const contentOfIndexPage = (0, fs_1.readFileSync)(pathOfIndexPage, 'utf-8');
            const pathOfNotFoundPage = `${outputPath}/404.html`;
            (0, fs_1.writeFileSync)(pathOfNotFoundPage, contentOfIndexPage);
            ctx.logger.info('Builder has been completed!!!');
            return { success };
        }
        else {
            return {
                success: false,
            };
        }
    }
    catch (error) {
        ctx.logger.error(error instanceof Error ? error.message : String(error));
        return {
            success: false,
        };
    }
});
function getOutputPath(result, configuredOutputPath, workspaceRoot) {
    const resultOutputPath = result['browserOutputPath'] ??
        result['outputPath'] ??
        result['outputPaths']?.[0];
    if (resultOutputPath) {
        return toAbsolutePath(resultOutputPath, workspaceRoot);
    }
    if (typeof configuredOutputPath === 'string') {
        return toAbsolutePath(configuredOutputPath, workspaceRoot);
    }
    const outputPath = configuredOutputPath;
    const base = outputPath?.base ?? 'dist';
    const browser = outputPath?.browser ?? 'browser';
    return toAbsolutePath((0, path_1.join)(base, browser), workspaceRoot);
}
function toAbsolutePath(path, workspaceRoot) {
    return (0, path_1.isAbsolute)(path) ? path : (0, path_1.join)(workspaceRoot, path);
}
