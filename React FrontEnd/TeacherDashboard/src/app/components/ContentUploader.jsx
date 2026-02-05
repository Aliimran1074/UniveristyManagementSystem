import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Upload, File, Video, FileText, Image, Link, Trash2, Download, Eye, X } from 'lucide-react';

export default function ContentUploader() {
  // 1. Initial Dummy Data
  const [uploadedContent, setUploadedContent] = useState([
    { id: 1, title: 'Cell Structure & Function', type: 'pdf', class: '9', subject: 'Biology', size: '2.4 MB', views: 124, uploadDate: '2026-02-01' },
    { id: 2, title: 'Introduction to Organic Chem', type: 'video', class: '10', subject: 'Chemistry', size: '45.8 MB', views: 89, uploadDate: '2026-01-28' },
    { id: 3, title: 'Mitosis vs Meiosis Diagram', type: 'image', class: '9', subject: 'Biology', size: '1.2 MB', views: 210, uploadDate: '2026-02-03' },
    { id: 4, title: 'Periodic Table Trends', type: 'pdf', class: '10', subject: 'Chemistry', size: '850 KB', views: 56, uploadDate: '2026-02-04' }
  ]);

  const [selectedClass, setSelectedClass] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'pdf',
    class: '9',
    subject: 'Biology'
  });

  // 2. Helper Logic for Icons & Colors
  const getIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-6 h-6" />;
      case 'pdf': return <FileText className="w-6 h-6" />;
      case 'image': return <Image className="w-6 h-6" />;
      case 'link': return <Link className="w-6 h-6" />;
      default: return <File className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-600';
      case 'pdf': return 'bg-red-100 text-red-600';
      case 'image': return 'bg-blue-100 text-blue-600';
      case 'link': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // 3. Filtering Logic
  const filteredContent = useMemo(() => {
    if (selectedClass === 'all') return uploadedContent;
    // Simple filter: checks if class match (e.g., '9' in '9-bio')
    const classNum = selectedClass.split('-')[0];
    return uploadedContent.filter(item => item.class === classNum);
  }, [uploadedContent, selectedClass]);

  // 4. Action Handlers
  const handleDelete = (id) => {
    setUploadedContent(prev => prev.filter(item => item.id !== id));
  };

  const handleUpload = () => {
    const newItem = {
      ...newContent,
      id: Date.now(),
      size: '0 KB',
      views: 0,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setUploadedContent([newItem, ...uploadedContent]);
    setShowUploadModal(false);
    setNewContent({ title: '', type: 'pdf', class: '9', subject: 'Biology' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header & Filter Section */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black text-gray-900">Content Library</CardTitle>
              <CardDescription>Manage your study materials and student resources</CardDescription>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              <Upload className="w-5 h-5" />
              Upload Content
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
            {[
              { id: 'all', label: 'All Content' },
              { id: '9-bio', label: 'Class 9 - Biology' },
              { id: '10-chem', label: 'Class 10 - Chemistry' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedClass(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedClass === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Files', value: uploadedContent.length, icon: File, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Videos', value: uploadedContent.filter(c => c.type === 'video').length, icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Docs', value: uploadedContent.filter(c => c.type === 'pdf').length, icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Views', value: uploadedContent.reduce((acc, c) => acc + c.views, 0), icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-lg sm:text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responsive Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredContent.length > 0 ? (
          filteredContent.map(content => (
            <Card key={content.id} className="group hover:ring-2 hover:ring-blue-100 transition-all border-none shadow-sm flex flex-col h-full rounded-3xl">
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${getTypeColor(content.type)} shadow-sm`}>
                    {getIcon(content.type)}
                  </div>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {content.title}
                  </h3>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge className="bg-blue-50 text-blue-700 border-none font-bold text-[10px]">C{content.class}</Badge>
                    <Badge className="bg-gray-100 text-gray-600 border-none font-bold text-[10px] uppercase">{content.subject}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50 text-[11px] font-bold text-gray-400 uppercase">
                    <div className="text-center">
                      <p className="mb-0.5">Size</p>
                      <p className="text-gray-900">{content.size}</p>
                    </div>
                    <div className="text-center border-x border-gray-50">
                      <p className="mb-0.5">Views</p>
                      <p className="text-gray-900">{content.views}</p>
                    </div>
                    <div className="text-center">
                      <p className="mb-0.5">Date</p>
                      <p className="text-gray-900">{content.uploadDate?.split('-').slice(1).join('/')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button className="flex-1 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all text-xs font-bold flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-bold">No materials found for this class.</p>
          </div>
        )}
      </div>

      {/* Responsive Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4">
          <Card className="w-full max-w-lg h-full sm:h-auto overflow-y-auto rounded-none sm:rounded-3xl border-none shadow-2xl">
            <CardHeader className="sticky top-0 bg-white z-10 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">New Material</CardTitle>
                <CardDescription>Add resources to your library</CardDescription>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 px-1">Material Title</label>
                <input
                  type="text"
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Photosynthesis Slides"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 px-1">Type</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl outline-none"
                    value={newContent.type}
                    onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                  >
                    <option value="pdf">📄 PDF</option>
                    <option value="video">🎥 Video</option>
                    <option value="image">🖼️ Image</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 px-1">Class</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl outline-none"
                    value={newContent.class}
                    onChange={(e) => setNewContent({ ...newContent, class: e.target.value })}
                  >
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <p className="font-bold text-gray-900">Select files</p>
                <p className="text-xs text-gray-400 mt-1">Files up to 50MB</p>
              </div>

              <button
                onClick={handleUpload}
                disabled={!newContent.title}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 disabled:bg-gray-200 disabled:shadow-none transition-all active:scale-[0.98]"
              >
                Confirm Upload
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}