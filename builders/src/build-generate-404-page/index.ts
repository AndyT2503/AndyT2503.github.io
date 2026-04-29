import { createBuilder } from '@angular-devkit/architect';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { isAbsolute, join } from 'path';

export default createBuilder(async (options, ctx) => {
  ctx.logger.info('Builder has been started...');
  try {
    const buildTarget = {
      target: 'build',
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    };
    const buildOptions = await ctx.getTargetOptions(buildTarget);
    const build = await ctx.scheduleTarget(buildTarget);
    const result = await build.result;
    const success = result.success;

    if (success) {
      const outputPath = getOutputPath(result, buildOptions['outputPath'], ctx.workspaceRoot);
      const pathOfIndexPage = `${outputPath}/index.html`;
      if (!existsSync(pathOfIndexPage)) {
        ctx.logger.error(`Cannot find index.html at ${pathOfIndexPage}`);
        return { success: false };
      }

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
    ctx.logger.error(error instanceof Error ? error.message : String(error));
    return {
      success: false,
    };
  }
});

function getOutputPath(
  result: Record<string, unknown>,
  configuredOutputPath: unknown,
  workspaceRoot: string
): string {
  const resultOutputPath =
    (result['browserOutputPath'] as string | undefined) ??
    (result['outputPath'] as string | undefined) ??
    ((result['outputPaths'] as string[] | undefined)?.[0]);

  if (resultOutputPath) {
    return toAbsolutePath(resultOutputPath, workspaceRoot);
  }

  if (typeof configuredOutputPath === 'string') {
    return toAbsolutePath(configuredOutputPath, workspaceRoot);
  }

  const outputPath = configuredOutputPath as
    | { base?: string; browser?: string }
    | undefined;
  const base = outputPath?.base ?? 'dist';
  const browser = outputPath?.browser ?? 'browser';

  return toAbsolutePath(join(base, browser), workspaceRoot);
}

function toAbsolutePath(path: string, workspaceRoot: string): string {
  return isAbsolute(path) ? path : join(workspaceRoot, path);
}
