"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs_1 = require("fs");
exports.default = (0, architect_1.createBuilder)(async (options, ctx) => {
    ctx.logger.info('Builder has been started...');
    try {
        const build = await ctx.scheduleTarget({
            target: 'build',
            project: ctx.target.project,
            configuration: ctx.target.configuration,
        });
        const result = await build.result;
        const success = result.success;
        const outputPath = result.baseOutputPath;
        if (success) {
            const pathOfIndexPage = `${outputPath}/index.html`;
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
        return {
            success: false,
        };
    }
});
