import attendanceImg from './assets/attendance.svg';
import votingImg from './assets/voting.svg';
import registrationFormImg from './assets/registration-form.svg';
import portfolioDisplayImg from './assets/portfolio-display.svg';
import ecommerceDisplayImg from './assets/ecommerce-display.svg';
import flappyBirdDisplayImg from './assets/flappy-bird-display.svg';
import bankingDisplayImg from './assets/banking-display.svg';

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
    title: 'Smart Attendance System',
    description: 'AI-powered attendance system using real-time face recognition. Built with FastAPI, React, OpenCV, and DeepFace, featuring live multi-camera tracking, anti-spoofing, role-based access, and auto-generated reports.',
    category: 'fullstack',
    tag: 'Full-Stack',
    image: attendanceImg,
    githubUrl: 'https://github.com/zubairasif07/Smart-AI-Attendance-System-',
    liveUrl: '',
    technologies: ['Python', 'FastAPI', 'React', 'OpenCV', 'DeepFace']
  },
  {
    title: 'ShopSphere',
    description: 'Full-stack e-commerce website built with React frontend and Laravel PHP backend, using MySQL for product and order management.',
    category: 'fullstack',
    tag: 'Full-Stack',
    image: ecommerceDisplayImg,
    githubUrl: 'https://github.com/zubairasif07/ecommerce-fullstack-design',
    liveUrl: '',
    technologies: ['React', 'Laravel', 'PHP', 'MySQL']
  },
  {
    title: 'Smart Banking System',
    description: 'Full-stack smart banking system with React frontend and Laravel PHP backend, using MySQL for secure account management, transaction history, authentication, and admin dashboards.',
    category: 'fullstack',
    tag: 'Full-Stack',
    image: bankingDisplayImg,
    githubUrl: 'https://github.com/zubairasif07/smart-banking-system',
    liveUrl: '',
    technologies: ['React', 'Laravel', 'PHP', 'MySQL']
  },
  {
    title: 'Online Voting System',
    description: 'Full-stack online voting system built with React frontend and Laravel PHP backend, using MySQL for voter authentication, ballot management, and secure vote processing.',
    category: 'fullstack',
    tag: 'Full-Stack',
    image: votingImg,
    githubUrl: 'https://github.com/zubairasif07/online_voting_system',
    liveUrl: '',
    technologies: ['React', 'Laravel', 'PHP', 'MySQL']
  },
  {
    title: 'Flappy Bird Game',
    description: 'Classic Flappy Bird clone built using HTML, CSS, and JavaScript for browser gameplay.',
    category: 'frontend',
    tag: 'Game',
    image: flappyBirdDisplayImg,
    githubUrl: 'https://github.com/zubairasif07/flappybird',
    liveUrl: '',
    technologies: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Registration Form UI',
    description: 'Clean registration form UI created using HTML and CSS, designed for responsive user data capture.',
    category: 'frontend',
    tag: 'Frontend',
    image: registrationFormImg,
    githubUrl: 'https://github.com/zubairasif07/REGISTRATION-FORM',
    liveUrl: '',
    technologies: ['HTML', 'CSS']
  },
  {
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio built with TypeScript and Vite, featuring routed sections, project filtering, accessible theme controls, and a contact form.',
    category: 'frontend',
    tag: 'Frontend',
    image: portfolioDisplayImg,
    githubUrl: 'https://github.com/zubairasif07/portfolio',
    liveUrl: '',
    technologies: ['TypeScript', 'Vite', 'CSS']
  }
];
