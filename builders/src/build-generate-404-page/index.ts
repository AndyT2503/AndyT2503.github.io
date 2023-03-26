import { createBuilder } from '@angular-devkit/architect';
import { readFileSync, writeFileSync } from 'fs';

export default createBuilder(async (options, ctx) => {
  ctx.logger.info('Builder has been started...');
  try {
    const build = await ctx.scheduleTarget({
      target: 'build',
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    });
    const result = await build.result;
    const success = result.success;
    const outputPath = result.outputPath as string;
    if (success) {
      const pathOfIndexPage = `${outputPath}/index.html`;
      const contentOfIndexPage = readFileSync(pathOfIndexPage, 'utf-8');
      const pathOfNotFoundPage = `${outputPath}/404.html`;
      writeFileSync(pathOfNotFoundPage, contentOfIndexPage);
      ctx.logger.info('Builder has been completed!!!');
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
