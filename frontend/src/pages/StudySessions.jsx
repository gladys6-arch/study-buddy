import { useEffect, useState } from "react";
import { getStudySessions } from "../api/api";
import StudySessionForm from "../components/StudySessionForm";

export default function StudySessions() {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const data = await getStudySessions();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching study sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Study Sessions</h1>
          <p className="text-gray-600">Schedule and manage your learning sessions</p>
        </div>

        {/* Session Form */}
        <div className="mb-10">
          <StudySessionForm onSuccess={fetchSessions} />
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="bg-orange-100 p-2 rounded-lg mr-3">📝</span>
            Active Sessions
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg">
                No study sessions scheduled yet. Create your first session above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {session.id}
                    </div>
                    <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">Duration:</span>
                      <span>{session.duration_minutes || "N/A"} minutes</span>
                    </div>

                    {session.notes && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span>
                        <p className="mt-1 text-gray-500 italic">{session.notes}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                      <span className="text-xs text-gray-500">Session #{session.id}</span>
                      <div className="flex items-center text-xs text-green-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        In Progress
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
