import { Star, User } from "lucide-react";

export function RatingVisualization() {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-orange-50 to-white rounded-xl overflow-hidden border border-orange-100 flex items-center justify-center">
      <div className="space-y-6">
        {/* Star rating */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 ${
                star <= 4
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* User avatars */}
        <div className="flex items-center justify-center -space-x-3">
          {[1, 2, 3, 4, 5].map((user) => (
            <div
              key={user}
              className="w-10 h-10 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center"
              style={{
                opacity: 1 - user * 0.15,
              }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>

        {/* Rating count */}
        <div className="text-center">
          <div className="text-gray-900">
            4.2
          </div>
          <p className="text-gray-500">
            +2,500 evaluaciones
          </p>
        </div>
      </div>
    </div>
  );
}
