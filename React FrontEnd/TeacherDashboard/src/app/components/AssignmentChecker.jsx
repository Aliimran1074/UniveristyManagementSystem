import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, Clock, CheckCircle, Eye, Download, GraduationCap, X, Sparkles, FileDown } from 'lucide-react';

export default function AssignmentChecker() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Photosynthesis Lab Report', studentName: 'Sarah Jenkins', class: '9-A', submittedDate: '2 hours ago', status: 'unchecked', aiChecked: false },
    { id: 2, title: 'Atomic Theory Essay', studentName: 'James Wilson', class: '10-C', submittedDate: '5 hours ago', status: 'ai-checked', aiChecked: true, aiGrade: 88, aiComments: 'Strong arguments, but needs more citations in the conclusion.' },
    { id: 3, title: 'Cell Membrane Model', studentName: 'Emma Thompson', class: '9-B', submittedDate: 'Yesterday', status: 'checked', grade: 92, comments: 'Excellent visual representation!' },
    { id: 4, title: 'Periodic Table Trends', studentName: 'Leo Garcia', class: '10-A', submittedDate: '3 days ago', status: 'unchecked', aiChecked: false }
  ]);

  const [selectedTab, setSelectedTab] = useState('unchecked');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const uncheckedAssignments = useMemo(() => assignments.filter(a => a.status === 'unchecked'), [assignments]);
  const aiCheckedAssignments = useMemo(() => assignments.filter(a => a.status === 'ai-checked'), [assignments]);
  const checkedAssignments = useMemo(() => assignments.filter(a => a.status === 'checked'), [assignments]);

  const handleGradeSubmit = (id, grade, comments) => {
    setAssignments(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'checked', grade, comments } : a
    ));
    setSelectedAssignment(null);
  };

  const GradeModal = ({ assignment, onClose }) => {
    const [grade, setGrade] = useState(assignment.grade || assignment.aiGrade || '');
    const [comments, setComments] = useState(assignment.comments || assignment.aiComments || '');

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
        <Card className="w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-none shadow-2xl">
          <CardHeader className="sticky top-0 bg-white z-10 border-b flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-xl font-black">Review Submission</CardTitle>
              <CardDescription className="line-clamp-1 font-medium">
                {assignment.studentName} • {assignment.title}
              </CardDescription>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Download and Preview Section */}
            <div className="flex gap-3">
               <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-blue-50 hover:text-blue-600 transition-all border-2 border-dashed border-gray-200">
                  <Download className="w-5 h-5" /> Download File
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-blue-50 hover:text-blue-600 transition-all border-2 border-dashed border-gray-200">
                  <Eye className="w-5 h-5" /> Quick Preview
               </button>
            </div>

            {assignment.aiChecked && (
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl relative overflow-hidden">
                <Sparkles className="absolute top-2 right-2 w-12 h-12 text-blue-200/50" />
                <p className="font-bold text-blue-900 text-sm flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5" /> AI Evaluation Insight
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-black text-blue-700">{assignment.aiGrade}</span>
                  <span className="text-sm font-bold text-blue-400">/ 100 Suggested</span>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed font-medium">"{assignment.aiComments}"</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Final Score</label>
                <input
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-black text-xl"
                  placeholder="Enter grade..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Teacher Feedback</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-medium"
                  placeholder="Provide constructive feedback..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-8 sm:pb-2">
              <button
                onClick={() => handleGradeSubmit(assignment.id, grade, comments)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all order-1 sm:order-2"
              >
                Confirm & Post Grade
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all order-2 sm:order-1"
              >
                Cancel
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Assignment Checker</h1>
        <p className="text-gray-500 font-medium">Download and review student submissions</p>
      </div>

      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 gap-8">
        {['unchecked', 'ai-checked', 'checked'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-4 text-sm font-black transition-all border-b-4 capitalize ${
              selectedTab === tab ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5">
        {(selectedTab === 'unchecked' ? uncheckedAssignments : 
          selectedTab === 'ai-checked' ? aiCheckedAssignments : 
          checkedAssignments).map(assignment => (
          <Card key={assignment.id} className="group border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-5 flex-1">
                  <div className={`p-4 rounded-2xl shrink-0 ${
                    selectedTab === 'unchecked' ? 'bg-orange-100 text-orange-600' :
                    selectedTab === 'ai-checked' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-gray-900 text-lg leading-tight">{assignment.title}</h3>
                    <p className="text-sm font-bold text-gray-400 mt-1">{assignment.studentName} • Class {assignment.class}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0">
                   <button 
                    title="Download for Checking"
                    className="p-3.5 text-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                   >
                      <Download className="w-5 h-5" />
                   </button>
                   <button 
                    onClick={() => setSelectedAssignment(assignment)}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 active:scale-95"
                   >
                      {selectedTab === 'checked' ? 'RE-CHECK' : 'GRADE NOW'}
                   </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAssignment && <GradeModal assignment={selectedAssignment} onClose={() => setSelectedAssignment(null)} />}
    </div>
  );
}