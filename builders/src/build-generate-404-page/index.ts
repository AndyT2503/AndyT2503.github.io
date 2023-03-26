import { readFileSync, writeFileSync } from 'fs';
import { createBuilder } from '@angular-devkit/architect';
import { getSystemPath, JsonObject, normalize } from '@angular-devkit/core';

interface BuildInfoOptions extends JsonObject {
  outputPath: string;
}

export default createBuilder(async (options: BuildInfoOptions, ctx) => {
  ctx.logger.info('Builder has been started...');
  try {
    const build = await ctx.scheduleTarget({
      target: 'build',
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    });
    const { success } = await build.result;
    if (success) {
      const pathOfIndexPage = `${getSystemPath(normalize(ctx.workspaceRoot))}/${
        options.outputPath
      }/index.html`;
      const contentOfIndexPage = readFileSync(pathOfIndexPage, 'utf-8');
      const pathOfNotFoundPage = `${getSystemPath(
        normalize(ctx.workspaceRoot)
      )}/${options.outputPath}/404.html`;
      writeFileSync(pathOfNotFoundPage, contentOfIndexPage);
      return { success };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
});
