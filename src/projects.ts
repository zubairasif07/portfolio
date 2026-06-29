import project1Img from './assets/project1.png';
import project2Img from './assets/project2.png';

export interface Project {
  title: string;
  description: string;
  category: string; // 'fullstack' | 'frontend' for filtering
  tag: string;       // visible display tag, e.g. 'Full-Stack'
  image: string;     // resolved asset url
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    title: 'DevAnalytics Dashboard',
    description: 'A real-time data analytical suite displaying server loads, user distributions, and request patterns in real time.',
    category: 'fullstack',
    tag: 'Full-Stack',
    image: project1Img,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL']
  },
  {
    title: 'Aura Tech Store',
    description: 'A gorgeous custom e-commerce product storefront UI with premium animated transitions and state management.',
    category: 'frontend',
    tag: 'Frontend',
    image: project2Img,
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    technologies: ['HTML5', 'CSS Grid', 'TypeScript', 'Vite']
  }
];
