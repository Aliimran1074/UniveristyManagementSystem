import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ClipboardCheck, Clock, CheckCircle, Eye, BarChart3, ArrowLeft, Send } from 'lucide-react';

export default function QuizChecker() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // 1. Sample Data State
  const [quizzes, setQuizzes] = useState([
    { id: 1, studentName: 'Alex Johnson', class: '9', subject: 'Biology', quizTitle: 'Cell Structure Quiz', totalQuestions: 10, timeSpent: '12 mins', submittedDate: '2026-02-04', status: 'pending', score: null, feedback: '' },
    { id: 2, studentName: 'Maria Garcia', class: '9', subject: 'Biology', quizTitle: 'Genetics Basics', totalQuestions: 15, timeSpent: '22 mins', submittedDate: '2026-02-03', status: 'auto-graded', score: 80, feedback: 'Good understanding of Mendelian laws.' },
    { id: 3, studentName: 'Sam Lee', class: '10', subject: 'Chemistry', quizTitle: 'Organic Compounds', totalQuestions: 20, timeSpent: '18 mins', submittedDate: '2026-02-01', status: 'graded', score: 95, feedback: 'Excellent work on carbon bonding.' }
  ]);

  // 2. Filtered Arrays
  const pendingQuizzes = useMemo(() => quizzes.filter(q => q.status === 'pending'), [quizzes]);
  const autoGradedQuizzes = useMemo(() => quizzes.filter(q => q.status === 'auto-graded'), [quizzes]);
  const gradedQuizzes = useMemo(() => quizzes.filter(q => q.status === 'graded'), [quizzes]);

  // 3. Action Handlers
  const handleManualGrade = (id, score, feedback) => {
    setQuizzes(prev => prev.map(q => 
      q.id === id ? { ...q, status: 'graded', score, feedback } : q
    ));
    setSelectedQuiz(null);
  };

  const handleAutoGrade = (id) => {
    setQuizzes(prev => prev.map(q => 
      q.id === id ? { ...q, status: 'auto-graded', score: 70 } : q
    ));
  };

  // --- Modal Component ---
  const QuizDetailModal = ({ quiz, onClose }) => {
    const [score, setScore] = useState(quiz.score || '');
    const [feedback, setFeedback] = useState(quiz.feedback || '');

    // Simulated Questions
    const questions = Array.from({ length: quiz.totalQuestions }, (_, i) => ({
      id: i + 1,
      question: `Question ${i + 1}: Which organelle is known as the powerhouse of the cell?`,
      studentAnswer: i % 3 === 0 ? 'Mitochondria' : 'Ribosome',
      correctAnswer: 'Mitochondria',
      isCorrect: i % 3 === 0
    }));

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4">
        <Card className="w-full max-w-3xl h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-3xl border-none shadow-2xl flex flex-col">
          <CardHeader className="sticky top-0 bg-white z-20 border-b flex flex-row items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="sm:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <CardTitle className="text-lg sm:text-xl font-black">Grade Quiz</CardTitle>
                <CardDescription className="font-medium">{quiz.studentName} • {quiz.quizTitle}</CardDescription>
              </div>
            </div>
            <button onClick={onClose} className="hidden sm:flex p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6 flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest">Questions</p>
                <p className="text-xl font-black text-blue-900">{quiz.totalQuestions}</p>
              </div>
              <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                <p className="text-[10px] text-purple-600 uppercase font-black tracking-widest">Time Spent</p>
                <p className="text-xl font-black text-purple-900">{quiz.timeSpent}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 col-span-2 sm:col-span-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Date</p>
                <p className="text-lg font-black text-gray-900">{quiz.submittedDate}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-gray-900 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" /> Response Log
              </h4>
              <div className="space-y-3">
                {questions.map((q) => (
                  <div key={q.id} className={`p-4 rounded-2xl border-2 transition-all ${q.isCorrect ? 'bg-green-50/30 border-green-100' : 'bg-red-50/30 border-red-100'}`}>
                    <p className="text-sm font-bold mb-3 text-gray-800">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-400 font-black uppercase">Student Answer</p>
                        <p className={q.isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>{q.studentAnswer}</p>
                      </div>
                      {!q.isCorrect && (
                        <div className="bg-green-50 p-2 rounded-lg">
                          <p className="text-[10px] text-green-600 font-black uppercase">Correct Key</p>
                          <p className="text-green-700 font-bold">{q.correctAnswer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t sticky bottom-0 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-xs font-black text-gray-500 uppercase mb-1 block">Score %</label>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-black text-lg outline-none transition-all"
                    placeholder="0"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-xs font-black text-gray-500 uppercase mb-1 block">Teacher Feedback</label>
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all"
                    placeholder="Excellent improvement..."
                  />
                </div>
              </div>
              <button 
                onClick={() => handleManualGrade(quiz.id, parseInt(score), feedback)} 
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Save Results
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 bg-gray-50/30 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quiz Checker</h1>
          <p className="text-gray-500 font-medium">Evaluate and finalize student performance</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Awaiting', value: pendingQuizzes.length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Auto Check', value: autoGradedQuizzes.length, icon: ClipboardCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg Class', value: '84%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Finished', value: gradedQuizzes.length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl w-full sm:w-auto">
        {['pending', 'auto-graded', 'graded'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-black rounded-xl capitalize transition-all ${
              selectedTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* List Container */}
      <div className="grid grid-cols-1 gap-4">
        {(selectedTab === 'pending' ? pendingQuizzes : 
          selectedTab === 'auto-graded' ? autoGradedQuizzes : 
          gradedQuizzes).map(quiz => (
          <Card key={quiz.id} className="group border-none shadow-sm rounded-3xl hover:shadow-md transition-all active:scale-[0.99] cursor-pointer" onClick={() => setSelectedQuiz(quiz)}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${
                    selectedTab === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <ClipboardCheck className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-gray-900 text-lg leading-tight">{quiz.quizTitle}</h3>
                    <p className="text-sm font-bold text-gray-400 mt-1">
                      {quiz.studentName} <span className="mx-1 text-gray-200">•</span> Class {quiz.class}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <div className="flex gap-2">
                    <Badge className="bg-gray-100 text-gray-600 border-none font-black text-[10px] px-3">
                      {quiz.totalQuestions} ITEMS
                    </Badge>
                    {quiz.score && (
                      <Badge className="bg-green-100 text-green-700 border-none font-black text-[10px] px-3">
                        {quiz.score}% SCORE
                      </Badge>
                    )}
                  </div>
                  <button className="p-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-100 group-hover:bg-blue-700 transition-colors">
                    {selectedTab === 'graded' ? 'REVIEW' : 'GRADE'}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Empty State */}
        {(selectedTab === 'pending' ? pendingQuizzes : 
          selectedTab === 'auto-graded' ? autoGradedQuizzes : 
          gradedQuizzes).length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
             <p className="text-gray-400 font-black">All caught up! No {selectedTab} quizzes.</p>
          </div>
        )}
      </div>

      {selectedQuiz && <QuizDetailModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />}
    </div>
  );
}

const X = ({ className }) => <XIcon className={className} />;
import { X as XIcon } from 'lucide-react';