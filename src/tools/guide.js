import React from "react";

const Guide = () => {
  const categories = [
    {
      title: "Programming Languages",
      items: ["JavaScript", "Python", "C++", "Java", "Go", "Rust", "Swift", "PHP", "Ruby", "TypeScript", "Kotlin", "Dart", "Scala", "Perl", "Haskell", "Lua", "Shell Scripting", "R", "Objective-C", "COBOL", "Fortran", "F#", "Ada"]
    },
    {
      title: "Technologies & Tools",
      items: ["React.js", "Node.js", "Docker", "Kubernetes", "GraphQL", "MongoDB", "Firebase", "AWS", "Git", "PostgreSQL", "TensorFlow", "Blockchain", "Flutter", "Express.js", "Spring Boot", "Redux", "Vue.js", "Svelte", "Django", "Flask", "Kafka", "Hadoop", "ElasticSearch", "Redis"]
    },
    {
      title: "Aptitude & Reasoning",
      items: ["Logical Reasoning", "Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Puzzle Solving", "Critical Thinking", "Decision Making", "Analytical Reasoning", "Syllogism", "Number Series", "Blood Relations", "Coding-Decoding", "Seating Arrangement", "Direction Sense", "Permutation & Combination", "Probability", "Game Theory"]
    },
    {
      title: "Civil & General Knowledge",
      items: ["Indian Polity", "Geography", "History", "Economy", "Current Affairs", "Environmental Studies", "World Affairs", "Indian Constitution", "Science & Technology", "Governance Policies", "UN Organizations", "International Relations", "Defense System", "Space Research", "Legal Studies", "International Law"]
    },
    {
      title: "Medical Sciences",
      items: ["Anatomy", "Physiology", "Pharmacology", "Pathology", "Microbiology", "Immunology", "Forensic Medicine", "Medical Ethics", "Epidemiology", "Public Health", "Surgery", "Pediatrics", "Radiology", "Neurology", "Cardiology", "Oncology", "Psychiatry", "Dermatology", "Ophthalmology", "Anesthesiology"]
    },
    {
      title: "Biological Sciences",
      items: ["Genetics", "Biotechnology", "Cell Biology", "Biochemistry", "Molecular Biology", "Botany", "Zoology", "Ecology", "Evolutionary Biology", "Bioinformatics", "Marine Biology", "Environmental Biology", "Agricultural Science", "Microbial Genetics", "Neuroscience"]
    },
    {
      title: "Chemical Sciences",
      items: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry", "Environmental Chemistry", "Polymer Chemistry", "Chemical Engineering", "Industrial Chemistry", "Medicinal Chemistry", "Supramolecular Chemistry"]
    },
    {
      title: "Engineering Disciplines",
      items: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Aerospace Engineering", "Automobile Engineering", "Robotics", "Structural Engineering", "Environmental Engineering", "Mining Engineering", "Mechatronics", "Nuclear Engineering", "Biomedical Engineering", "Software Engineering", "Petroleum Engineering", "Telecommunication Engineering"]
    },
    {
      title: "Career Development",
      items: ["Resume Writing", "Interview Preparation", "Soft Skills", "Public Speaking", "Time Management", "Networking Skills", "Leadership Development", "Entrepreneurship", "Workplace Ethics", "Personal Branding", "Freelancing", "Career Switching", "Workplace Communication", "Emotional Intelligence", "Conflict Resolution", "Stress Management", "Negotiation Skills", "Goal Setting", "Adaptability"]
    },
    {
      title: "Emerging Technologies",
      items: ["Artificial Intelligence", "Machine Learning", "Cybersecurity", "Cloud Computing", "Edge Computing", "Quantum Computing", "IoT", "Big Data", "5G Technology", "Augmented Reality", "Virtual Reality", "Autonomous Vehicles", "Nanotechnology", "Genetic Engineering", "Blockchain Applications", "Wearable Technology", "Space Technology", "Bioprinting", "Smart Cities"]
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Career Development Guide</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-blue-500 cursor-pointer transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
