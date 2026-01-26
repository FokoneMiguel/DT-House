
import React from 'react';
import { 
  Users, 
  Home, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight,
  UserCheck,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const data = [
  { name: 'Lun', users: 400, ads: 240 },
  { name: 'Mar', users: 300, ads: 139 },
  { name: 'Mer', users: 200, ads: 980 },
  { name: 'Jeu', users: 278, ads: 390 },
  { name: 'Ven', users: 189, ads: 480 },
  { name: 'Sam', users: 239, ads: 380 },
  { name: 'Dim', users: 349, ads: 430 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="px-6 py-8">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Console</h1>
          <p className="text-xs text-gray-400 font-bold">VUE D'ENSEMBLE</p>
        </div>
        <div className="bg-green-100 text-green-600 p-2 rounded-xl flex items-center gap-1">
          <TrendingUp size={16} />
          <span className="text-[10px] font-black">+12%</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <Users className="text-indigo-600 mb-3" size={24} />
          <p className="text-2xl font-black">2,450</p>
          <p className="text-[10px] font-bold text-gray-400">UTILISATEURS ACTIFS</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <Home className="text-orange-500 mb-3" size={24} />
          <p className="text-2xl font-black">482</p>
          <p className="text-[10px] font-bold text-gray-400">ANNONCES PUBLIÉES</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-sm font-bold mb-6 flex items-center justify-between">
          Activité hebdomadaire
          <span className="text-[10px] text-gray-400 font-medium">7 derniers jours</span>
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <AlertCircle size={16} className="text-orange-500" />
          Annonces en attente (4)
        </h3>
        {[
          { title: "Studio Paris 15", user: "Marc K.", time: "10m ago" },
          { title: "Appartement Lyon", user: "Sophie T.", time: "25m ago" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-sm">{item.title}</p>
              <p className="text-[10px] text-gray-400">Par {item.user} • {item.time}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={20} /></button>
              <button className="p-2 bg-red-50 text-red-600 rounded-xl"><XCircle size={20} /></button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
