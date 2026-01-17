import { BookOpen, FileText, Video, Download } from 'lucide-react';

export default function ContentView() {
  const courses = [
    {
      id: 1,
      title: 'Mathematics',
      modules: [
        { id: 1, name: 'Calculus Fundamentals', type: 'video', duration: '45 min' },
        { id: 2, name: 'Linear Algebra', type: 'pdf', pages: 24 },
        { id: 3, name: 'Practice Problems', type: 'pdf', pages: 12 },
      ],
    },
    {
      id: 2,
      title: 'Physics',
      modules: [
        { id: 1, name: 'Newton\'s Laws of Motion', type: 'video', duration: '32 min' },
        { id: 2, name: 'Thermodynamics Basics', type: 'pdf', pages: 18 },
        { id: 3, name: 'Lab Experiments Guide', type: 'pdf', pages: 8 },
      ],
    },
    {
      id: 3,
      title: 'Chemistry',
      modules: [
        { id: 1, name: 'Chemical Bonding', type: 'video', duration: '38 min' },
        { id: 2, name: 'Periodic Table Study', type: 'pdf', pages: 15 },
        { id: 3, name: 'Reaction Mechanisms', type: 'pdf', pages: 20 },
      ],
    },
    {
      id: 4,
      title: 'English',
      modules: [
        { id: 1, name: 'Literature Analysis', type: 'video', duration: '28 min' },
        { id: 2, name: 'Essay Writing Guide', type: 'pdf', pages: 10 },
        { id: 3, name: 'Grammar Rules', type: 'pdf', pages: 16 },
      ],
    },
    {
      id: 5,
      title: 'Computer Science',
      modules: [
        { id: 1, name: 'Data Structures Introduction', type: 'video', duration: '52 min' },
        { id: 2, name: 'Algorithms & Complexity', type: 'pdf', pages: 30 },
        { id: 3, name: 'Coding Practice', type: 'pdf', pages: 14 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Course Content</h2>
        <p className="text-gray-600 mt-1">Access all your course materials and resources</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-white" />
                <h3 className="text-white">{course.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {module.type === 'video' ? (
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-purple-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-gray-900">{module.name}</p>
                        <p className="text-gray-600">
                          {module.type === 'video' ? module.duration : `${module.pages} pages`}
                        </p>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {module.type === 'video' ? 'Watch' : 'View'}
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
