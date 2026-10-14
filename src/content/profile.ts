// Facts supplied by Aman in AmanSharmaResume.pdf, reviewed 14 October 2026.
// The document is a content source; it is not distributed by the website.
export const profileContent = {
  name: 'Aman Sharma',
  title: 'Software Engineer',
  focus: 'Frontend development',
  location: 'Kolkata, India',
  email: 'amansharmaofficial27@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/aman-sharmaweb/',
    github: 'https://github.com/amanodec',
    codeforces: 'https://codeforces.com/profile/amannn',
    leetcode: 'https://leetcode.com/u/anammm/',
    codechef: 'https://www.codechef.com/users/sharma_00',
    geeksforgeeks: 'https://auth.geeksforgeeks.org/user/as899533'
  },
  skills: {
    frontend: ['TypeScript', 'JavaScript', 'React', 'Redux', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    systems: ['Node.js', 'REST APIs', 'Firebase', 'Supabase', 'MySQL', 'Git'],
    foundations: ['C++', 'Data Structures and Algorithms']
  },
  education: {
    degree: 'Bachelor of Technology',
    institution: 'RCC Institute of Information Technology',
    dateLabel: 'Aug 2019 — Aug 2023',
    location: 'Kolkata, India',
    cgpa: '8.93'
  },
  achievements: [
    'ACM–ICPC Regionalist, 2020',
    'Google Kick Start — Rank 1,096, Round E',
    'Solved 1,000+ algorithmic problems across competitive programming platforms'
  ],
  source: 'AmanSharmaResume.pdf'
} as const;
