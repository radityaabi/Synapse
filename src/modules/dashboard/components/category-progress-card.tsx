import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateCategoryStats,
  getCategoryColors,
} from "@/modules/dashboard/utils/task-stats";
import type { CategoryProgressCardProps } from "@/modules/dashboard/types/dashboard";

export function CategoryProgressCard({ tasks }: CategoryProgressCardProps) {
  const categoryStats = calculateCategoryStats(tasks);

  if (Object.keys(categoryStats).length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No tasks available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryStats).map(
            ([category, { completed, total }]) => {
              const completionRate = Math.round((completed / total) * 100);
              const { bg, progress } = getCategoryColors(category);

              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {completed}/{total}
                    </span>
                  </div>

                  <div className={`h-2 w-full rounded-sm ${bg}`}>
                    <div
                      className={`${progress} h-2 rounded-sm transition-all duration-300`}
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </CardContent>
    </Card>
  );
}
