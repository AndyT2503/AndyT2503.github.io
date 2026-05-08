import { createInjectionToken } from '../utils';

export interface IEnvironment {
  repoName: string;
  sourceControlApi: string;
  sourceControlUrl: string;
  domainUrl: string;
  isOpenToWork: boolean;
}

export const [injectEnvironment, provideEnvironment] =
  createInjectionToken<IEnvironment>('Application environment');
