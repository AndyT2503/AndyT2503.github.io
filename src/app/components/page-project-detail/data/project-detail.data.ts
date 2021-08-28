import { ProjectDetail } from './project-detail.model';

export const ProjectDetails: ProjectDetail[] = [
  {
    title: 'Gifphy Clone',
    description: `Giphy Clone App is Giphy's Trending clone page. You can search, watch trending Gif on Giphy.`,
    technologies: ['Akita State Management', 'Angular', 'Ng Zorro Ant Design'],
    link: 'https://github.com/AndyT2503/giphy-clone',
    brief: `This is my personal project. Back-end used API provide by Gifphy Developers.
            This app will show Trending GIFs, GIF's detail. Because I can not find api search trending GIF when researching on Giphy Developers Document,
            search function will search all GIF in Giphy, not only Trending GIF, if you pass null value to searching input, I will return Trending Page.`,
    image: 'assets/projects/Gifphy.PNG',
    slug: 'gifphy-clone'
  },
  {
    title: 'Container Optimization Solution',
    description: `This is company's project which is platform connecting logistics providers and shipping lines and aiming at
                  changing the way we use a shipping container.`,
    technologies: ['Angular', '.Net Core (ASP.NET Zero)', 'PostgresSQL'],
    link: 'https://cma-cgm.gosmartlog.com/',
    brief: `This project provide container optimization solution for logistics providers. They can choose where to return the container,
            COS is aiming to let shippers choose the return location with its MT-MOVE product. Besides, import containers could be reused for export
            if unloading and loading locations are close. COS allows logistics providers to reuse import container for export with its MT-REUSE product.`,
    image: 'assets/projects/COS.PNG',
    slug: 'cos',
    achievements: ['Sao Khue Award 2020', '1 Billion Income in 2020']
  }
];
