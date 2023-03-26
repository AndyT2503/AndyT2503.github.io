"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
exports.default = (0, architect_1.createBuilder)(async (options, ctx) => {
    ctx.logger.info('Builder has been started...');
    try {
        const build = await ctx.scheduleTarget({
            target: 'build',
            project: ctx.target.project,
            configuration: ctx.target.configuration,
        });
        const { success } = await build.result;
        if (success) {
            const pathOfIndexPage = `${(0, core_1.getSystemPath)((0, core_1.normalize)(ctx.workspaceRoot))}/${options.outputPath}/index.html`;
            const contentOfIndexPage = (0, fs_1.readFileSync)(pathOfIndexPage, 'utf-8');
            const pathOfNotFoundPage = `${(0, core_1.getSystemPath)((0, core_1.normalize)(ctx.workspaceRoot))}/${options.outputPath}/404.html`;
            (0, fs_1.writeFileSync)(pathOfNotFoundPage, contentOfIndexPage);
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
