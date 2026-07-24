interface ProfileData {
  socialScore: number;
  technicalScore: number;
  keyInterests: string[];
}

interface CareerReportProps {
  profile: ProfileData | null;
}

export default function CareerReport({ profile }: CareerReportProps) {
  if (!profile) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 my-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Career Analysis Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-semibold">Technical Score</p>
          <p className="text-2xl font-bold text-blue-900">{profile.technicalScore}%</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-semibold">Social Score</p>
          <p className="text-2xl font-bold text-green-900">{profile.socialScore}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Key Interests</h3>
        <div className="flex flex-wrap gap-2">
          {profile.keyInterests?.map((interest, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}