export interface Job {
  id?: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  desc: string;
}

export const jobs: Job[] = [
  {
    title: "Native developer",
    dept: "Engineering",
    location: "Udaipur",
    type: "Intern",
    desc: "We are looking for a React Native Developer to help scale our product UI. You will work with React, Next.js, and TypeScript on high-impact projects that directly affect millions of users."
  },
  {
    title: "Graphic Designer",
    dept: "Design",
    location: "Udaipur",
    type: "Intern",
    desc: "Join our design team to craft elegant, intuitive experiences. You will own end-to-end product design from wireframes to polished prototypes and work closely with engineering."
  },
  {
    title: "Marketing Manager",
    dept: "Marketing",
    location: "Udaipur",
    type: "Full-time",
    desc: "Lead our backend infrastructure team building high-throughput, resilient systems handling millions of daily transactions."
  },

];
